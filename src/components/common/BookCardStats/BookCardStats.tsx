import { Book } from "../../../types/Book";
import styled from "styled-components";

interface Props {
  book: Book;
  isDarkVersion?: boolean;
}

const BookCard = styled.div<{ isDarkVersion?: boolean }>`
  display: flex;
  justify-content: space-evenly;
  color: ${({ isDarkVersion }) => (isDarkVersion ? "#f7f9fd" : "#1d1f2b")};
  background-color: ${({ isDarkVersion }) =>
    isDarkVersion ? "#1d1f2b" : "#f7f9fd"};
  border-radius: 10px;
  margin-top: 20px;
  padding: 0px 15px;
  width: 90%;
`;

const BookCardParagraph = styled.p`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const Subtitle = styled.span<{ isDarkVersion?: boolean }>`
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0;
  padding: 1px 0;
  color: ${({ isDarkVersion }) =>
    isDarkVersion ? "rgba(255, 255, 255, 0.5)" : "#1d1f2b"};
`;

const BookCardStats = ({ book, isDarkVersion = false }: Props) => {
  const calcRatings = () => {
    const sum =
      book.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
    const averageRating = sum / (book.reviews?.length || 1);

    if (sum === 0) {
      return 0;
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {averageRating}
        <h4
          style={{
            padding: 0,
            margin: 0,
            fontSize: "0.8rem",
            paddingLeft: "0.2rem",
          }}
        >
          /5
        </h4>
      </div>
    );
  };

  return (
    <BookCard isDarkVersion={isDarkVersion}>
      <BookCardParagraph>
        <strong>{calcRatings()}</strong>
        <Subtitle isDarkVersion={isDarkVersion}>ratings</Subtitle>
      </BookCardParagraph>
      <div className="separator" />
      <BookCardParagraph>
        <strong>{book.pages ?? 0}</strong>
        <Subtitle isDarkVersion={isDarkVersion}>pages</Subtitle>
      </BookCardParagraph>
      <div className="separator" />
      <BookCardParagraph>
        <strong>{book.reviews?.length ?? 0}</strong>
        <Subtitle isDarkVersion={isDarkVersion}>reviews</Subtitle>
      </BookCardParagraph>
    </BookCard>
  );
};

export default BookCardStats;
