import './CategoryItem.css';
import PropTypes from "prop-types";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <a href="#">
        {category.img && (
          <img
            src={category.img}
            alt={category.name}
            className="category-image"
          />
        )}
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string,
  }),
};

export default CategoryItem;
