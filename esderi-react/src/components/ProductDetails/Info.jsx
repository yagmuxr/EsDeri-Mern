import "./ProductDetails.css";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { CartContext } from "../../context/CartProvider";

const Info = ({ singleProduct }) => {
  const quantityRef = useRef();
  const { addToCart, cartItems } = useContext(CartContext);

  const originalPrice = singleProduct.price?.current || 0;
  const discountPercentage = singleProduct.price?.discount || 0;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const filteredCard = cartItems.find(
    (cartItem) => cartItem._id === singleProduct._id
  );

  // Yorum sayısı ve ortalama puan hesaplama
  const reviews = singleProduct.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviewCount 
    : 0;

  // Yıldızları render etme fonksiyonu
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Dolu yıldızlar
    for (let i = 0; i < fullStars; i++) {
      stars.push(<li key={`full-${i}`}><i className="bi bi-star-fill"></i></li>);
    }

    // Yarım yıldız
    if (hasHalfStar) {
      stars.push(<li key="half"><i className="bi bi-star-half"></i></li>);
    }

    // Boş yıldızlar
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<li key={`empty-${i}`}><i className="bi bi-star"></i></li>);
    }

    return stars;
  };

  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>

      <div className="product-review">
        <ul className="product-star">
          {renderStars(averageRating)}
        </ul>
        <span>
          {reviewCount === 0 
            ? "No reviews yet " 
            : reviewCount === 1 
              ? "1 reviews" 
              : `${reviewCount} reviews`
          }
        </span>
      </div>

      <div className="product-price">
        <s className="old-price">${originalPrice.toFixed(2)}</s>
        <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
      </div>

      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></div>

      <form className="variations-form">
        <div className="variations">
          {singleProduct.colors && singleProduct.colors.length > 0 && (
            <div className="colors-and-quantity">
            <div className="colors">
              <div className="colors-label">
                <span>Color</span>
              </div>
              {singleProduct.colors.map((color, index) => (
                <div className="color-wrapper" key={index}>
                  <label
                    style={{
                      backgroundColor: color,
                      border: "1px solid #ccc",
                      display: "inline-block",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="product-color"
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              ))}
            </div>
              <div className="quantity-wrapper">
                <span className="quantity-label">Quantity</span>
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
              </div>
            </div>
          )}

          <div className="cart-button-centered">
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCard}
              onClick={() =>
                addToCart({
                  ...singleProduct,
                  price: discountedPrice,
                  quantity: parseInt(quantityRef.current.value),
                })
              }
            >
              Add to Cart
            </button>
          </div>

          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wishlist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share This Product</span>
            </a>
          </div>
        </div>
      </form>

      <div className="divider"></div>
    </div>
  );
};

Info.propTypes = {
  singleProduct: PropTypes.object.isRequired,
};

export default Info;
