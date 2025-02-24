import "./Search.css";
import PropTypes from "prop-types";
const Search = ({ isSearchShow, setIsSearchShow }) => {
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""}`}>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3 className="modal-title">Search Products</h3>
          <button className="modal-close" onClick={() => setIsSearchShow(false)}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <div className="search-content">
          <p className="modal-text">
            Start typing to find your perfect product...
          </p>
          <form className="search-form">
            <div className="search-input-wrapper">
              <i className="bi bi-search search-icon"></i>
              <input 
                type="text" 
                placeholder="Type to search..." 
                autoFocus
              />
            </div>
          </form>
          <div className="search-results">
            <div className="search-heading">
              <h4>Products</h4>
              <span className="results-count">2 Results Found</span>
            </div>
            <div className="results">
              <a href="#" className="result-item">
                <img src="img/products/product1/1.png" className="search-thumb" alt="" />
                <div className="search-info">
                  <h4>Analogue Resin Strap</h4>
                  <span className="search-sku">SKU: PD0016</span>
                  <span className="search-price">$108.00</span>
                </div>
              </a>
              <a href="#" className="result-item">
                <img src="img/products/product2/1.png" className="search-thumb" alt="" />
                <div className="search-info">
                  <h4>Analogue Resin Strap</h4>
                  <span className="search-sku">SKU: PD0016</span>
                  <span className="search-price">$108.00</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};