import "./ProductItem.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";

const ProductItem = ({ productItem }) => {
  const { addToCart } = useContext(CartContext);

  const originalPrice = productItem.price?.current || 0;
  const discount = productItem.price?.discount || 0;
  const discountedPrice = originalPrice - (originalPrice * discount) / 100;

  // Dinamik yıldız puanlama hesaplama
  const reviews = productItem.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviewCount 
    : 0;

  // Yıldızları render etme fonksiyonu
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Dolu yıldızlar
    for (let i = 0; i < fullStars; i++) {
      stars.push(<li key={`full-${i}`}><i className="bi bi-star-fill"></i></li>);
    }

    // Yarım yıldız
    if (hasHalfStar && fullStars < 5) {
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
    <li className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href="#">
          <img src={productItem.img && productItem.img[0] ? productItem.img[0] : "/img/default.jpg"} alt="" className="img1" />
          {productItem.img && productItem.img[1] && (
            <img src={productItem.img[1]} alt="" className="img2" />
          )}
        </a>
      </div>
      <div className="product-info">
        <a href="#" className="product-title">
          {productItem.name}
        </a>
        <ul className="product-star">
          {reviewCount > 0 ? (
            renderStars(averageRating)
          ) : (
            // Eğer hiç yorum yoksa boş yıldızlar göster
            <>
              <li><i className="bi bi-star"></i></li>
              <li><i className="bi bi-star"></i></li>
              <li><i className="bi bi-star"></i></li>
              <li><i className="bi bi-star"></i></li>
              <li><i className="bi bi-star"></i></li>
            </>
          )}
          {reviewCount > 0 && (
            <span className="rating-text">({reviewCount})</span>
          )}
        </ul>
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span className="old-price">${originalPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{discount}%</span>

        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() =>
              addToCart({
                ...productItem
              })
            }
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${productItem._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </li>
  );
};

ProductItem.propTypes = {
  productItem: PropTypes.object,
};

export default ProductItem;
