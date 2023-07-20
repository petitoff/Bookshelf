import styled, { css } from "styled-components";
import { BookCategory, CATEGORIES } from "../../../../types/Book";

interface CategoryContainerProps {
  selected: boolean;
}

const borderWhenCategoryIsSelected = css<{ selected: boolean }>`
  border: 1px solid;
  border-color: ${(props) => (props.selected ? "#0567D1" : "transparent")};
  border-radius: 1rem;
`;

const StyledContainerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const StyledCategoryContainer = styled.div<CategoryContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
  text-align: center;

  ${borderWhenCategoryIsSelected}
`;

const StyledCategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(226, 241, 232, 1);
  border-radius: 50%;
  margin-bottom: 10px;
`;

interface Props {
  selectedCategories: BookCategory[];
  onSelectedCategoriesChange: (
    callback: (prevState: BookCategory[]) => BookCategory[]
  ) => void;
}

export const ListOfCategoriesOfBook = ({
  selectedCategories,
  onSelectedCategoriesChange,
}: Props) => {
  const excludeCategories = ["All"];

  const handleCategoryClick = (category: BookCategory) => {
    onSelectedCategoriesChange((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((c) => c !== category);
      } else {
        return [...prevState, category];
      }
    });
  };

  return (
    <StyledContainerWrapper>
      {CATEGORIES.filter(
        (category) => !excludeCategories.includes(category)
      ).map((category) => (
        <StyledCategoryContainer
          key={category}
          onClick={() => handleCategoryClick(category)}
          selected={selectedCategories.includes(category)}
        >
          <StyledCategoryIcon />
          <p>{category}</p>
        </StyledCategoryContainer>
      ))}
    </StyledContainerWrapper>
  );
};
