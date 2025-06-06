import "./Auth.css";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş başarılı.");
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        message.error("Giriş başarısız.");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    }
  };
  return (
    <div className="account-column">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>
            Username or email address <span className="required">*</span>
          </label>
          <input type="text" name="email" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input
              type="password"
              name="password"
              onChange={handleInputChange}
            />
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button className="submit-button">Login</button>
        <a href="#" className="forgot-password">
          Lost your password?
        </a>
      </form>
    </div>
  );
};

export default Login;