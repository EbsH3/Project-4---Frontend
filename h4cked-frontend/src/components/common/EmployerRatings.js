import StarRatings from 'react-star-ratings';

export default function EmployerRatings({ rating, setRating, size }) {
  return (
    <StarRatings
      rating={rating}
      starRatedColor='gold'
      starHoverColor='gold'
      changeRating={setRating}
      numberOfStars={5}
      name='rating'
      starDimensio={size}
    />
  );
}
