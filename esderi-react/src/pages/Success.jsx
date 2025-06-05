import { Link } from "react-router-dom";
import "./Success.css"; // Kendi stil dosyanı oluşturabilirsin

const Success = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <i className="bi bi-check-circle-fill"></i>
        </div>
        <h1>Payment Successful!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <div className="success-btn-group">
          <Link to="/" className="success-btn">
            Back to Home
          </Link>
          <Link to="/orders" className="success-btn secondary">
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;