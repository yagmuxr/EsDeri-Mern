import './Slider.css';
const Slider = () => {
    return (
        <section className="slider">
    <div className="slider-elements">
      <div className="slider-item fade">
        <div className="slider-image">
          <img src="img/slider/slider22.png" className="img-fluid" alt=""/>
        </div>
        <div className="container">
          <p className="slider-title">SUMMER 2022</p>
          <h2 className="slider-heading">Save up to 70%</h2>
          <a href="#" className="btn btn-lg btn-primary">Explore Now</a>
        </div>
      </div>
      <div className="slider-buttons">
        <button className="prev">
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="next">
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <div className="slider-dots">
        <button className="slider-dot active" onclick="currentSlide(1)">
          <span></span>
        </button>
        <button className="slider-dot" onclick="currentSlide(2)">
          <span></span>
        </button>
        <button className="slider-dot" onclick="currentSlide(3)">
          <span></span>
        </button>
      </div>
    </div>
  </section>
    )
}

export default Slider;