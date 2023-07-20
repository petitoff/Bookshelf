import BookSection from "../../components/BookSection/BookSection";
import { Book } from "../../types/Book";

interface Props {
  booksDataFromSearchResult: Book[];
}

export const SearchResults = ({ booksDataFromSearchResult }: Props) => {
  return (
    <BookSection
      titleOfSection="Search Results"
      books={booksDataFromSearchResult}
    />
  );
};
