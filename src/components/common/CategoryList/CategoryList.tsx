import styled from "styled-components";
import { Category } from "../../../types/Book";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useAppSelector } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";
import { setActiveBookCategory } from "../../../store/slices/bookSlice";

const CategoryListMainContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const CATEGORY: Category[] = ["All", "Fantasy"];

const CategoryList = () => {
  // const [activeCategory, setActiveCategory] = useState<Category>("All");

  const activeCategory = useAppSelector(
    (state) => state.books.activeBookCategory
  );

  const dispatch = useDispatch();

  const handleSetActiveBookCategory = (category: Category) => {
    dispatch(setActiveBookCategory(category));
  };

  return (
    <div>
      <CategoryListMainContainer>
        {CATEGORY.map((category) => (
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
