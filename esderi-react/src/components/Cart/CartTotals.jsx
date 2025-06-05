import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";

const CartTotals = () => {
    const { cartItems, couponDiscount } = useContext(CartContext);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartOriginalTotal, setCartOriginalTotal] = useState(0);
    const [cartDiscount, setCartDiscount] = useState(0);
    const shipping = 15;
    const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    useEffect(() => {
      let originalTotal = 0;
      let subtotal = 0;
      cartItems.forEach((item) => {
        const priceObj = item.price;
        let discounted = 0;
        let original = 0;
        if (typeof priceObj === "number") {
          discounted = priceObj;
          original = priceObj;
        } else if (priceObj && typeof priceObj.current === "number") {
          const discount = priceObj.discount || 0;
          original = priceObj.current;
          discounted = priceObj.current - (priceObj.current * discount) / 100;
        }
        subtotal += discounted * item.quantity;
        originalTotal += original * item.quantity;
      });
      setCartSubtotal(subtotal);
      setCartOriginalTotal(originalTotal);
      setCartDiscount(originalTotal - subtotal);
    }, [cartItems]);

    const handlePayment = async () => {
      if (!user) {
        return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
      }

      const body = {
        products: cartItems,
        user: user,
        cargoFee: shipping,
      };

      try {
        const stripe = await loadStripe(stripePublicKey);

        const res = await fetch(`${apiUrl}/api/payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          return message.error("Ödeme işlemi başarısız oldu.");
        }

        const session = await res.json();

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          throw new Error(result.error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <table>
          <tbody>
            <tr className="cart-subtotal">
              <th>Subtotal</th>
              <td>
                <span id="subtotal">${cartSubtotal.toFixed(2)}</span>
              </td>
            </tr>
            <tr className="cart-original">
              <th>Original Total</th>
              <td>
                <span id="original-total">${cartOriginalTotal.toFixed(2)}</span>
              </td>
            </tr>
            {cartDiscount > 0 && (
              <tr className="cart-discount">
                <th>Discount</th>
                <td>
                  <span id="discount">-${cartDiscount.toFixed(2)}</span>
                </td>
              </tr>
            )}
            {couponDiscount > 0 && (
              <tr className="cart-coupon">
                <th>Coupon</th>
                <td>
                  <span id="coupon">-${couponDiscount.toFixed(2)}</span>
                </td>
              </tr>
            )}
            <tr>
              <th>Shipping</th>
              <td>
                <ul>
                  <li>
                    <label>
                      ${shipping.toFixed(2)}
                    </label>
                  </li>     
                </ul>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>
                <strong id="cart-total">
                  ${(cartSubtotal - couponDiscount + shipping).toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="checkout">
         <button className="btn btn-lg" onClick={handlePayment}>
           Proceed to checkout
         </button>
        </div>
      </div>
    );
  };
  
  export default CartTotals;