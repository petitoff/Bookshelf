import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { BookCategory, CATEGORIES } from "../../../types/Book";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useAppSelector } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";
import { setActiveBookCategory } from "../../../store/slices/bookSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CategoryListMainContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const CategoryListScrollContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const LeftScrollButton = styled(ScrollButton)`
  left: -20px;
`;

const RightScrollButton = styled(ScrollButton)`
  right: -20px;
`;

const CategoryList = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const activeCategory = useAppSelector(
    (state) => state.books.activeBookCategory
  );

  const dispatch = useDispatch();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollWidth - container.clientWidth - container.scrollLeft >
            1
        );
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollContainerRef]);

  const handleSetActiveBookCategory = (category: BookCategory) => {
    dispatch(setActiveBookCategory(category));
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <CategoryListMainContainer>
      {canScrollLeft && (
        <LeftScrollButton onClick={handleScrollLeft}>
          <ArrowBackIosNewIcon />
        </LeftScrollButton>
      )}
      <CategoryListScrollContainer ref={scrollContainerRef}>
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            isActive={activeCategory === category}
            onSetActiveBookCategory={handleSetActiveBookCategory}
          />
        ))}
      </CategoryListScrollContainer>
      {canScrollRight && (
        <RightScrollButton onClick={handleScrollRight}>
          <ArrowForwardIosIcon />
        </RightScrollButton>
      )}
    </CategoryListMainContainer>
  );
};

export default CategoryList;
