import { useState } from "react";
import styles from './starRating.module.css'

const StarRating = ({ initialRating, onChange = () => { }, name = "" }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingClick = (clickedRating) => {
    setRating(clickedRating === rating ? 0 : clickedRating);
    if (onChange) { onChange({ target: { name, value: clickedRating === rating ? 0 : clickedRating } }) }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating-stars mb-3">
      {stars?.map((star) => (
        <span
          key={star}
          className={`${styles?.star} ${star <= rating ? styles?.selected : ''}`}
          onClick={() => handleRatingClick(star)}
        >
          ☆
        </span>
      ))}
    </div>
  );
};

export default StarRating;
