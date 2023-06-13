import styled from "styled-components";
import { BookCategory, CATEGORIES } from "../../../types/Book";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useAppSelector } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";
import { setActiveBookCategory } from "../../../store/slices/bookSlice";

const CategoryListMainContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  /* Ukryj pasek przewijania */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CategoryList = () => {
  const activeCategory = useAppSelector(
    (state) => state.books.activeBookCategory
  );

  const dispatch = useDispatch();

  const handleSetActiveBookCategory = (category: BookCategory) => {
    dispatch(setActiveBookCategory(category));
  };

  return (
    <div>
      <CategoryListMainContainer>
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            isActive={activeCategory === category}
            onSetActiveBookCategory={handleSetActiveBookCategory}
          />
        ))}
      </CategoryListMainContainer>
    </div>
  );
};

export default CategoryList;
