const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Model dosyanı buraya göre ayarla
// Sadece giriş yapan kullanıcının kendi siparişleri
router.get("/user/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
      res.status(200).json(orders);
    } catch (error) {
      console.error("Order fetch error:", error);
      res.status(500).json({ error: "Server error." });
    }
  });
// Admin: tüm siparişleri getir
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email username") // User bilgilerini getir
      .sort({ createdAt: -1 }); // Yeni siparişler en üstte

    res.status(200).json(orders);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});




module.exports = router;
