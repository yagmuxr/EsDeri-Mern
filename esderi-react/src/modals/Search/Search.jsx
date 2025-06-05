import "./Search.css";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);
  const inputRef = useRef();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = inputRef.current.value.trim();

    if (!productName) {
      message.warning("Lütfen bir ürün ismi girin.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/products/search/${productName}`);
      if (!response.ok) {
        message.error("Ürün getirme hatası!");
        return;
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
      message.error("Beklenmeyen bir hata oluştu!");
    }
  };

  return (
    <div 
      className={`modal-search ${isSearchShow ? "show" : ""}`}
      onClick={(e) => {
        // Modal wrapper'ın dışına tıklanırsa kapat
        if (e.target === e.currentTarget) {
          handleCloseModal();
        }
      }}
    >
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3 className="modal-title">Search Products</h3>
          <button className="modal-close" onClick={handleCloseModal}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div className="search-content">
          <p className="modal-text">Start typing to find your perfect product...</p>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                placeholder="Type to search..."
                autoFocus
                ref={inputRef}
              />
            </div>
          </form>

          <div className="search-results">
            <div className="search-heading">
              <h4>Products</h4>
              {searchResults && (
                <span className="results-count">
                  {searchResults.length} Results Found
                </span>
              )}
            </div>

            <div
              className="results"
              style={{
                display:
                  !searchResults || searchResults.length === 0 ? "flex" : "grid",
              }}
            >
              {!searchResults && (
                <b className="result-item" style={{ justifyContent: "center", width: "100%" }}>
                  Search for a product...
                </b>
              )}

              {searchResults?.length === 0 && (
                <div className="result-item" style={{ justifyContent: "center", width: "100%" }}>
                  😔 Not found 😔
                </div>
              )}

              {searchResults?.length > 0 &&
                searchResults.map((item) => (
                  <Link to={`/product/${item._id}`} className="result-item" key={item._id} onClick={handleCloseModal}>
                    <img src={item.img[0]} className="search-thumb" alt={item.name} />
                    <div className="search-info">
                      <h4>{item.name}</h4>
                      <span className="search-sku">SKU: PD0016</span>
                      <span className="search-price">${item.price.current.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};

export default Search;
