import "./Auth.css";

const Register = () => {
  return (
    <div className="account-column">
      <h2>Register</h2>
      <form className="login-form">
        <div className="form-group">
          <label>
            Username <span className="required">*</span>
          </label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>
            Email address <span className="required">*</span>
          </label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input type="password" required />
        </div>
        <div className="privacy-policy">
          <p>
            Your personal data will be used to support your experience throughout
            this website, to manage access to your account, and for other purposes
            described in our privacy policy.
          </p>
        </div>
        <button className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;