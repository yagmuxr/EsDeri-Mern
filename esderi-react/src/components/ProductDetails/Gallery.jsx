import { useState } from "react";
import productsData from "../../data.json";
import "./ProductDetails.css";
import "./Gallery.css";

const Gallery = () => {
  const [activeImg, setActiveImg] = useState(productsData.products[0].img.singleImage);
  const thumbs = productsData.products[0].img.thumbs;

  const handleArrowClick = (direction) => {
    const currentIndex = thumbs.indexOf(activeImg);
    if (direction === "right") {
      // Eğer son resimde değilsek bir sonrakine geç
      if (currentIndex < thumbs.length - 1) {
        setActiveImg(thumbs[currentIndex + 1]);
      } else {
        // Son resimdeyse ilk resme dön
        setActiveImg(thumbs[0]);
      }
    } else if (direction === "left") {
      // Eğer ilk resimde değilsek bir öncekine geç
      if (currentIndex > 0) {
        setActiveImg(thumbs[currentIndex - 1]);
      } else {
        // İlk resimdeyse son resme git
        setActiveImg(thumbs[thumbs.length - 1]);
      }
    }
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={activeImg} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            {thumbs.map((itemImg, index) => (
              <li
                className={`glide__slide ${itemImg === activeImg ? "active" : ""}`}
                key={index}
                onClick={() => setActiveImg(itemImg)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={itemImg}
                  alt=""
                  className="img-fluid"
                />
              </li>
            ))}
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button 
            className="glide__arrow glide__arrow--left" 
            onClick={() => handleArrowClick("left")}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button 
            className="glide__arrow glide__arrow--right" 
            onClick={() => handleArrowClick("right")}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;