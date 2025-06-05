import "./Auth.css";

import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //console.log(formData);
const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // const { password, ...rest } = data;
        
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Kayıt başarılı.");
        navigate("/");
      } else {
        message.error("Kayıt başarısız.");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
    }
  };

  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="login-form">
        <div className="form-group">
          <label>
            Username <span className="required">*</span>
          </label>
          <input type="text" onChange={handleInputChange} name="username" />
        </div>
        <div className="form-group">
          <label>
            Email address <span className="required">*</span>
          </label>
          <input type="email" onChange={handleInputChange} name="email" />
        </div>
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input
              type="password"
              onChange={handleInputChange}
              name="password"
            />
        </div>
        <div className="privacy-policy">
          <p>
            Your personal data will be used to support your experience throughout
            this website, to manage access to your account, and for other purposes
            described in our privacy policy.
          </p>
        </div>
        <button type="submit" className="submit-button">Register</button>
        </form>
    </div>
  );
};

export default Register;