import { message } from "antd";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const { cartItems, couponDiscount, setCouponDiscount } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilimez.");
    }
    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.warning("Girdiğiniz kupon kodu yanlış!");
      }

      const data = await res.json();
      const discountPercent = data.discountPercent;

      // Kupon indirimi orijinal toplam üzerinden hesaplanacak
      let originalTotal = 0;
      cartItems.forEach((item) => {
        const priceObj = item.price;
        let original = 0;
        if (typeof priceObj === 'number') {
          original = priceObj;
        } else if (priceObj && typeof priceObj.current === 'number') {
          original = priceObj.current;
        }
        originalTotal += original * item.quantity;
      });
      const couponValue = originalTotal * (discountPercent / 100);
      setCouponDiscount(couponValue);

      message.success(`${couponCode} kupon kodu başarıyla uygulandı.`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
      <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
        </div>
      </div>
    );
  };
  
  export default CartCoupon;