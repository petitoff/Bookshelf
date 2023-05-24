import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./CreateReview.module.scss";

interface Props {
  onSubmit: (rating: number, content?: string) => void;
}

const CreateReview = ({ onSubmit }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, content);
    setRating(0);
    setContent("");
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={24}
          className={styles.star}
          color={i <= rating ? "#f4c150" : "grey"}
          onClick={() => setRating(i)}
        />
      );
    }
    return stars;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="rating">Rating:</label>
      <div className={styles.starsContainer}>{renderStars()}</div>
      <div className={styles["text-box"]}>
        <div className={styles["box-container"]}>
          <textarea
            placeholder="Send your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div>
            <div className={styles.formatting}>
              <button className={styles.send}>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="18"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    stroke="#ffffff"
                    d="M12 5L12 20"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    stroke="#ffffff"
                    d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateReview;
