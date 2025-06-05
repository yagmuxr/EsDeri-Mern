import { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
//import productsData from "../../data.json";
import "./ProductDetails.css";
import "./Gallery.css";

const Gallery = ({ singleProduct }) => {
  const [activeImg, setActiveImg] = useState({
    img: singleProduct.img[0],
    imgIndex: 0,
  });

  const sliderSettings = {
    slidesToShow: Math.min(singleProduct.img.length, 4),
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${activeImg.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {singleProduct.img.map((itemImg, index) => (
                <li
                  className={`glide__slide glide__slide--active`}
                  key={index}
                  onClick={() =>
                    setActiveImg({
                      img: itemImg,
                      imgIndex: index,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={`${itemImg}`}
                    alt=""
                    className={`img-fluid ${activeImg.imgIndex === index ? "active" : ""}`}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left"
            onClick={() =>
              setActiveImg((prev) => {
                const newIndex = prev.imgIndex === 0 ? singleProduct.img.length - 1 : prev.imgIndex - 1;
                return { img: singleProduct.img[newIndex], imgIndex: newIndex };
              })
            }
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            onClick={() =>
              setActiveImg((prev) => {
                const newIndex = prev.imgIndex === singleProduct.img.length - 1 ? 0 : prev.imgIndex + 1;
                return { img: singleProduct.img[newIndex], imgIndex: newIndex };
              })
            }
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  singleProduct: PropTypes.object,
};

export default Gallery;