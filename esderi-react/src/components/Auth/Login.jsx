import "./Auth.css";

const Login = () => {
  return (
    <div className="account-column">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label>
            Username or email address <span className="required">*</span>
          </label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input type="password" required />
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