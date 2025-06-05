import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const CartItem = ({ cartItem }) => {
    const { removeFromCart } = useContext(CartContext);
    const priceObj = cartItem.price;
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

    return (
      <tr className="cart-item">
        <td></td>
        <td className="cart-image">
        <img src={cartItem.img && cartItem.img[0] ? cartItem.img[0] : "/img/default.jpg"} alt="" />
          <i 
            className="bi bi-x delete-cart" 
            onClick={() => removeFromCart(cartItem._id || cartItem.id)}
          ></i>
        </td>
        <td>{cartItem.name}</td>
        <td>${original.toFixed(2)}</td>
        <td className="product-quantity">{cartItem.quantity}</td>
        <td className="product-subtotal">
        ${(discounted * cartItem.quantity).toFixed(2)}
          </td>
      </tr>
    );
  };
  
  export default CartItem;

  CartItem.propTypes = {
    cartItem: PropTypes.object
  };