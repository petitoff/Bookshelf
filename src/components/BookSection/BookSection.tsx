import React, { useState } from "react";
import BookCard from "../common/BookCard/BookCard";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./BookSection.module.css";
import { Book } from "../../types/Book";
import { setActiveBook } from "../../store/slices/bookSlice";

interface Props {
  titleOfSection: string;
}

const BookSection = ({ titleOfSection }: Props) => {
  const books = useAppSelector((state) => state.books.books);
  const activeBook = useAppSelector((state) => state.books.activeBook);

  const dispatch = useAppDispatch();

  const handleSetActiveBook = (id: string) => {
    if (activeBook?.id === id) {
      dispatch(setActiveBook({}));
      return;
    }

    // setActiveBook(books.find((book: Book) => book.id === id) as Book);

    const localActiveBook = books.find((book: Book) => book.id === id) as Book;

    dispatch(setActiveBook(localActiveBook));
  };

  return (
    <section>
      <h2>{titleOfSection}</h2>
      <div className={styles.bookList}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={
              book.id ??
              // if the book has an id, use it, otherwise throw an error
              (() => {
                throw new Error("Book has no id");
              })()
            }
            title={book?.title ?? "No title"}
            author={book?.authorName ?? "No author"}
            imageId={book?.imageId ?? "No image"}
            isActiveBook={activeBook?.id === book.id}
            onSetActiveBook={handleSetActiveBook}
          />
        ))}
      </div>
    </section>
  );
};

export default BookSection;
