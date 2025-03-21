import React from "react";
import { ProductInterface } from "../types/types";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  product?: ProductInterface;
  productRating?:number;
  setRating?:React.Dispatch<React.SetStateAction<number>>
}

const StarRating: React.FC<StarRatingProps> = ({ product, setRating, productRating }) => {


  const avgRating = () => {
    if (product && setRating) {
      const ratings = product.productReviews.map((product) => product.rating)
      if (typeof ratings === "undefined" || ratings.length === 0 ) return 0
      const sum = ratings.reduce((acc:number, num:number) => acc + num, 0)
      const rating = parseFloat((sum/ratings.length).toFixed(1))
      setRating(rating)
      return rating;
    }

}

  const rating = productRating || avgRating()
  const fullStars = Math.floor(rating!); 
  const hasHalfStar = rating! % 1 >= 0.5; 
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 

  return (
    <div style={{ display: "flex", gap: "2px", color: "#FFD700" }}>
      {/* Full Stars */}
      {Array(fullStars).fill(0).map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}

      {/* Half Star */}
      {hasHalfStar && <FaStarHalfAlt key="half" />}

      {/* Empty Stars */}
      {Array(emptyStars).fill(0).map((_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
    </div>
  );
};

export default StarRating;