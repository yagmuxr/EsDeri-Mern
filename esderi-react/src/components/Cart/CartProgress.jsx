import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const FREE_SHIPPING_LIMIT = 200;

const CartProgress = () => {
  const { cartItems } = useContext(CartContext);

  // Sepet toplamını hesapla
  const subtotal = cartItems.reduce((total, item) => {
    const priceObj = item.price;
    let discounted = 0;
    if (typeof priceObj === "number") {
      discounted = priceObj;
    } else if (priceObj && typeof priceObj.current === "number") {
      const discount = priceObj.discount || 0;
      discounted = priceObj.current - (priceObj.current * discount) / 100;
    }
    return total + discounted * item.quantity;
  }, 0);

  const remaining = FREE_SHIPPING_LIMIT - subtotal;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);

  return (
    <div className="free-progress-bar">
      <p className="progress-bar-title">
        {subtotal >= FREE_SHIPPING_LIMIT ? (
          <span style={{ color: 'green' }}>Congratulations! You have free shipping! 🎉</span>
        ) : (
          <>
            Add <strong>${remaining.toFixed(2)}</strong> to cart and get free shipping!
          </>
        )}
      </p>
      <div className="progress-bar">
        <span className="progress" style={{ width: `${progressPercent}%` }}></span>
      </div>
    </div>
  );
};

export default CartProgress;