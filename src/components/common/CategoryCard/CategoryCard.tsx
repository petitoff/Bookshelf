import styled from "styled-components";
import { Category } from "../../../types/Book";

interface Props {
  category: Category;
  isActive: boolean;
  onSetActiveBookCategory: (category: Category) => void;
}

const CategoryCardMainContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0.5px solid #dadada;

  background-color: ${({ isActive }) => (isActive ? "#213872" : "#f7f9fd")};
  color: ${({ isActive }) => (isActive ? "#f7f9fd" : "#1d1f2b")};
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 0 0.5rem;

  &:hover {
    background-color: #213872;
    color: #f7f9fd;
  }
`;

const CategoryCard = ({
  category,
  isActive,
  onSetActiveBookCategory,
}: Props) => {
  return (
    <div>
      <CategoryCardMainContainer
        isActive={isActive}
        onClick={() => onSetActiveBookCategory(category)}
      >
        {category}
      </CategoryCardMainContainer>
    </div>
  );
};

export default CategoryCard;
