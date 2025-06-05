import PropTypes from "prop-types";

const ReviewItem = ({ item }) => {
  const { review, user } = item;
  
  // Kullanıcı avatarı için varsayılan resim
  const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=dc3545&color=fff&size=50";
  const userAvatar = user?.avatar || user?.image || defaultAvatar;

  return (
    <li className="comment-item">
      <div className="comment-content">
        <div className="comment-avatar">
          <img 
            src={userAvatar} 
            alt={user ? user.username || user.name || "Kullanıcı" : "Kullanıcı"}
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
        </div>
        <div className="comment-details">
          <div className="comment-meta">
            <span className="comment-author">
              {user ? user.username || user.name || "Bilinmeyen Kullanıcı" : "Bilinmeyen Kullanıcı"}
            </span>
            <span className="comment-date">
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString('tr-TR') : ""}
            </span>
          </div>
          <div className="comment-text">
            <div className="comment-star">
              {Array.from({ length: review.rating || 0 }).map((_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
            </div>
            <p>{review.text || "Yorum metni bulunamadı"}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

ReviewItem.propTypes = {
  item: PropTypes.shape({
    review: PropTypes.object.isRequired,
    user: PropTypes.object,
  }).isRequired,
};

export default ReviewItem;