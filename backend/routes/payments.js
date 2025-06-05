const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const User = require("../models/User"); // 🆕 Kullanıcı modelini ekledik

router.post("/", async (req, res) => {
  const { products, user, cargoFee, couponDiscount } = req.body;

  let discountedTotal = 0;

  // 🧮 İndirimli ürün fiyatlarını hesapla
  const discountedPrices = products.map((item) => {
    let priceValue = 0;
    if (typeof item.price === "object" && item.price.current) {
      priceValue = item.price.current;
      const discount = item.price.discount || 0;
      priceValue = priceValue - (priceValue * discount) / 100;
    } else if (typeof item.price === "number") {
      priceValue = item.price;
    }
    discountedTotal += priceValue * item.quantity;
    return priceValue;
  });

  // 🧾 Stripe için lineItems oluştur
  const lineItems = products.map((item, idx) => {
    let priceValue = discountedPrices[idx];
    if (couponDiscount && discountedTotal > 0) {
      const oran = (priceValue * item.quantity) / discountedTotal;
      priceValue = priceValue - (couponDiscount * oran) / item.quantity;
    }
    if (!priceValue || isNaN(priceValue) || priceValue < 0.01) {
      priceValue = 1;
    }
    return {
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(priceValue * 100),
      },
      quantity: item.quantity,
    };
  });

  if (cargoFee !== 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Hızlı Kargo",
        },
        unit_amount: cargoFee * 100,
      },
      quantity: 1,
    });
  }

  try {
    // ✅ Kullanıcıyı email ile MongoDB'den bul
    const fullUser = await User.findOne({ email: user.email });
    if (!fullUser) {
      return res.status(400).json({ error: "Kullanıcı bulunamadı." });
    }

    // 💳 Stripe ödeme oturumu
    const session = await stripe.checkout.sessions.create({
      customer_email: fullUser.email,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success`,
    });

    // 💾 Order kaydı
    const totalPrice = discountedTotal - (couponDiscount || 0) + cargoFee;

    await Order.create({
      user: fullUser._id, // ✅ Doğrudan veritabanından alınan kullanıcı ID
      products: products.map((p, i) => ({
        name: p.name,
        quantity: p.quantity,
        price: discountedPrices[i],
      })),
      total: totalPrice,
      cargoFee: cargoFee,
      isPaid: true,
      paidAt: new Date(),
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log("Ödeme hatası:", error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
