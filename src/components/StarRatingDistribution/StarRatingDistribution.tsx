import "./StarRatingDistribution.scss";

interface Props {
  //   ratings: Array<{ username: string; rating: number; content: string }>;

  ratings: number[];
}

const StarRatingDistribution = ({ ratings }: Props) => {
  const maxRatings = Math.max(...ratings);

  return (
    <div className="star-rating-distribution">
      {ratings.map((rating, index) => {
        const barWidth = (rating / maxRatings) * 100;

        return (
          <div key={index} className="star-rating-distribution__row">
            <div className="star-rating-distribution__label">{5 - index} ★</div>
            <div className="star-rating-distribution__bar">
              <div
                className="star-rating-distribution__bar-fill"
                style={{ width: `${barWidth}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRatingDistribution;
