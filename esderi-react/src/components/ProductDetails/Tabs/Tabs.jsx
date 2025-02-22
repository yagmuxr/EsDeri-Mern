import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tabId) => {
    e.preventDefault();
    setActiveTab(tabId);
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
        <div className={`tab-panel-descriptions content ${activeTab === "desc" ? "active" : ""}`} id="desc">
          {/* Description content */}
        </div>
        <div className={`tab-panel-information content ${activeTab === "info" ? "active" : ""}`} id="info">
          {/* Info content */}
        </div>
        <div className={`tab-panel-reviews content ${activeTab === "reviews" ? "active" : ""}`} id="reviews">
          {/* Reviews content */}
        </div>
      </div>
    </div>
  );
};

export default Tabs; 