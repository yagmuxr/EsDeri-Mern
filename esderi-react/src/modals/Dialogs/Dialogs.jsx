import PropTypes from "prop-types";
import "./Dialogs.css";

const Dialogs = ({ isDialogShow, setIsDialogShow }) => {
  const handleCloseDialog = () => {
    setIsDialogShow(false);
  };

  const handleCheckbox = (event) => {
    const checked = event.target.checked;
    if (checked) {
      // Checkbox işaretlenirse bir daha gösterme
      localStorage.setItem("dialog", JSON.stringify(false));
    } else {
      // Checkbox işaretli değilse sonraki ziyarette göster
      localStorage.setItem("dialog", JSON.stringify(true));
    }
  };

  return (
    <div className={`modal-dialog ${isDialogShow ? "show" : ""}`}>
      <div className="modal-wrapper">
        <button className="modal-close" onClick={handleCloseDialog}>
          <i className="bi bi-x"></i>
        </button>
        <div className="modal-content">
          <div className="modal-image">
            <img src="/img/esderi.jpg" alt="" />
          </div>
          <div className="popup-wrapper">
            <div className="popup-content">
              <div className="popup-title">
                <h3>NEWSLETTER</h3>
              </div>
              <p className="popup-text">
                Sign up to our newsletter and get exclusive deals you won't find anywhere else straight to your inbox!
              </p>
              <form className="popup-form">
                <input 
                  type="email" 
                  placeholder="Enter Email Address..."
                  className="input-email"
                />
                <button className="btn-primary">SUBSCRIBE</button>
                <label>
                  <input type="checkbox" onChange={handleCheckbox} />
                  <span>Don't show this popup again</span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;

Dialogs.propTypes = {
  isDialogShow: PropTypes.bool,
  setIsDialogShow: PropTypes.func,
}; 