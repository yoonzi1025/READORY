import { FaStar } from "react-icons/fa";

const Rating = ({ rating, onChange, size = 24 }) => {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          onClick={() => onChange(star)}
          style={{
            color: star <= rating ? "gold" : "gray",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
};

export default Rating;
