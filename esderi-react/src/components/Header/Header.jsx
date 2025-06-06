import './Header.css';
import { useState, useContext } from 'react';
import Search from "../../modals/Search/Search";
import { CartContext } from "../../context/CartProvider";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Güvenli useLocation
function useSafeLocation() {
  try {
    return useLocation();
  } catch (e) {
    console.warn("Header rendered outside <Router>", e);
    return { pathname: "/" }; // fallback
  }
}

const Header = ({ setIsSearchShow, setCurrentPage }) => {
  const { pathname } = useSafeLocation();
  const [isSearchShow, setIsSearchShowLocal] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleCartClick = (e) => {
    e.preventDefault();
    setCurrentPage && setCurrentPage('cart');
  };

  const handleLogout = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <header>
      <div className="global-notification">
        <div className="container">
          <p>
            SUMMER SALE FOR ALL PRODUCTS AND FREE EXPRESS INTERNATIONAL DELIVERY - OFF 50%!
            <Link to={"/"} className="logo">
              <img src="/img/esderi.jpg" alt="Esderi Logo" width="40" height="35"></img>
            </Link>
          </p>
        </div>
      </div>

      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>

            <div className="header-left">
              <a href="/" className="logo-link" onClick={(e) => {
                e.preventDefault();
                setCurrentPage && setCurrentPage('home');
              }}>
                <img src="/img/esderi.jpg" alt="Esderi Logo" className="logo-img" />
              </a>
            </div>

            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <Link to={"/"} className={`menu-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
                  </li>
                  <li className="menu-list-item megamenu-wrapper">
                    <Link to={"/shop"} className={`menu-link ${pathname === "/shop" ? "active" : ""}`}>
                      Shop <i className="bi bi-chevron-down"></i>
                    </Link>
                    <div className="menu-dropdown-wrapper">
                      <div className="menu-dropdown-megamenu">
                        {/* megamenu content here */}
                        <div className="megamenu-links">
                          {/* Repeat megamenu-products content */}
                        </div>
                        <div className="megamenu-single">
                          <a href="#"><img src="img/mega-menu.jpg" alt="" /></a>
                          <h3 className="megamenu-single-title">JOIN THE LAYERING GANG</h3>
                          <h4 className="megamenu-single-subtitle">Suspendisse faucibus nunc et pellentesque</h4>
                          <a href="#" className="megamenu-single-button btn btn-sm">Shop Now</a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="menu-list-item">
                    <Link to={"/contact"} className={`menu-link ${pathname === "/contact" ? "active" : ""}`}>Contact</Link>
                  </li>
                </ul>
              </nav>
              <i className="bi bi-x-circle" id="close-sidebar"></i>
            </div>

            <div className="header-right">
              <div className="header-right-links">
                {!user ? (
                  <Link to={"/auth"} className="header-account">
                    <i className="bi bi-person"></i>
                  </Link>
                ) : (
                  <button className="search-button" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                )}
                <button className="search-button" onClick={() =>
                  setIsSearchShow ? setIsSearchShow(true) : setIsSearchShowLocal(true)
                }>
                  <i className="bi bi-search"></i>
                </button>
                <Link to="/orders" className="header-orders">
                  <i className="bi bi-receipt" title="Siparişlerim"></i>
                </Link>
                <div className="header-cart">
                  <Link to={"/cart"} className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">{cartItemCount}</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {!setIsSearchShow && <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShowLocal} />}
    </header>
  );
};

Header.propTypes = {
  setIsSearchShow: PropTypes.func,
  setCurrentPage: PropTypes.func
};

export default Header;
