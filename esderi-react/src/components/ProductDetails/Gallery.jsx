import { useState } from "react";
import productsData from "../../data.json";
import "./ProductDetails.css";
import "./Gallery.css";

const Gallery = () => {
  const [activeImg, setActiveImg] = useState(productsData.products[0].img.singleImage);

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={activeImg} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            {productsData.products[0].img.thumbs.map((itemImg, index) => (
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
          <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;