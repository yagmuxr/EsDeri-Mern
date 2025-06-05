import "./Breadcrumbs.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ singleProduct }) => {
  const [category, setCategory] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (singleProduct?.category) {
      const fetchCategory = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/categories/${singleProduct.category}`);
          if (response.ok) {
            const categoryData = await response.json();
            setCategory(categoryData);
          }
        } catch (error) {
          console.log("Kategori bilgisi alınamadı:", error);
        }
      };
      fetchCategory();
    }
  }, [singleProduct, apiUrl]);

  if (!singleProduct) {
    return null;
  }

  return (
    <div className="single-topbar">
      <nav className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {category && (
          <li>
              <Link to="/shop">{category.name}</Link>
          </li>
          )}
          <li>{singleProduct.name}</li>
        </ul>
      </nav>
    </div>
  );
};

Breadcrumbs.propTypes = {
  singleProduct: PropTypes.object,
};

export default Breadcrumbs;