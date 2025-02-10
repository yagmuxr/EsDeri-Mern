import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaPinterestP, FaSearch, FaUser, FaShoppingBag } from 'react-icons/fa';
import './Header.css';
import esderiLogo from '../../assets/esderilogo.png';

const Header = () => {
  const announcements = [
    "Tüm ürünlerde %10 indirim",
    "Ücretsiz Kargo"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextAnnouncement = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  return (
    <header className="header">
      <div className="announcement-bar">
        <button className="slide-button prev" onClick={prevAnnouncement}>&#10094;</button>
        <div className="announcement-text">{announcements[currentIndex]}</div>
        <button className="slide-button next" onClick={nextAnnouncement}>&#10095;</button>
      </div>
      
      <div className="main-header">
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterestP />
          </a>
        </div>

        <div className="logo">
          <Link to="/">
            <img src={esderiLogo} alt="ESDERİ" />
          </Link>
        </div>

        <div className="header-actions">
          <select className="language-selector">
            <option value="tr">tr</option>
            <option value="en">en</option>
          </select>
          <button className="search-button">
            <FaSearch />
          </button>
          <Link to="/hesap" className="account-button">
            <FaUser />
          </Link>
          <Link to="/sepet" className="cart-button">
            <FaShoppingBag />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
