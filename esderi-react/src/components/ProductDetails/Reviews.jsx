import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { message } from "antd";

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
  const [users, setUsers] = useState([]);
  const [thisReview, setThisReview] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Kullanıcı verisi alınamadı.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  useEffect(() => {
    if (singleProduct?.reviews && Array.isArray(singleProduct.reviews)) {
      const reviews = [];
      singleProduct.reviews.forEach((review) => {
        const matchingUsers = users.filter((user) => user._id === review.user);
        if (matchingUsers.length > 0) {
          matchingUsers.forEach((matchingUser) => {
            reviews.push({
              review: review,
              user: matchingUser,
            });
          });
        } else {
          // Kullanıcı bulunamazsa yine de yorumu ekle
          reviews.push({
            review: review,
            user: null,
          });
        }
      });
      setThisReview(reviews);
    } else {
      setThisReview([]);
    }
  }, [singleProduct, users]);

  if (!singleProduct) {
    return <div>Ürün bulunamadı.</div>;
  }

  if (!singleProduct.reviews || !Array.isArray(singleProduct.reviews)) {
    return (
      <div className={`tab-panel-reviews ${active}`}>
        <h3>Hiç yorum yok...</h3>
        <div className="review-form-wrapper">
          <h2>Yorum Ekle</h2>
          <ReviewForm
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>{singleProduct.reviews.length} review(s) for {singleProduct.name} </h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, index) => (
                <ReviewItem key={index} item={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>No reviews yet...</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  active: PropTypes.string,
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};