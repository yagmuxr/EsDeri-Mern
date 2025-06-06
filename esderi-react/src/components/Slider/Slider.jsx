import './Slider.css';
import { useState } from 'react';
import SliderItem from './SliderItem';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
  };

  return (
    <section className="slider">
      <div className="slider-container">
        {currentSlide === 0 && <SliderItem imageSrc="img/slider/slider22.png" />}
        {currentSlide === 1 && <SliderItem imageSrc="img/slider/slider11.png" />}
        {currentSlide === 2 && <SliderItem imageSrc="img/slider/slider33.png" />}
        <div className="slider-buttons">
          <button className="prev" onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="next" onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="slider-dots">
          <button 
            className={`slider-dot ${currentSlide === 0 ? "active" : ""}`} 
            onClick={() => setCurrentSlide(0)}
          >
            <span></span>
          </button>
          <button 
            className={`slider-dot ${currentSlide === 1 ? "active" : ""}`} 
            onClick={() => setCurrentSlide(1)}
          >
            <span></span>
          </button>
          <button 
            className={`slider-dot ${currentSlide === 2 ? "active" : ""}`} 
            onClick={() => setCurrentSlide(2)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;