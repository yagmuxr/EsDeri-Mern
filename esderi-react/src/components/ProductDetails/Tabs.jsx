import "./ProductDetails.css";
import Reviews from "./Reviews";
import { useState } from "react";
import PropTypes from "prop-types";

const Tabs = ({ singleProduct, setSingleProduct }) => {

  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div className={`tab-panel-descriptions content ${activeTab === "desc" ? "active" : ""}`}>
        <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: singleProduct.description }}
          ></div>
        </div>
        <div className={`tab-panel-information content ${activeTab === "info" ? "active" : ""}`}>
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                    White
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {activeTab === "reviews" && (
          <Reviews 
            active={activeTab === "reviews" ? "active" : ""} 
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
/>
        )}
      </div>
    </div>
  );
};

export default Tabs;
Tabs.propTypes = {  
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
