import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookList from "./BookList";
import { Provider } from "react-redux";
import { store } from "../../../store/store";

const mockBooks = [
  {
    id: "1",
    title: "Book 1",
    author: "Author 1",
    description: "Description 1",
  },
  {
    id: "2",
    title: "Book 2",
    author: "Author 2",
    description: "Description 2",
  },
];

describe("<BookList />", () => {
  test("renders books correctly", () => {
    render(
      <Provider store={store}>
        <BookList books={mockBooks} />
      </Provider>
    );

    const bookList = screen.getByTestId("book-list");
    expect(bookList).toBeInTheDocument();

    const bookCards = within(bookList).getAllByTestId("book-card");
    expect(bookCards).toHaveLength(mockBooks.length);
  });

  test("calls onDeleteBook when delete button is clicked", () => {
    const onDeleteBook = jest.fn();
    render(
      <Provider store={store}>
        <BookList
          books={mockBooks}
          isAllowedToDelete
          onDeleteBook={onDeleteBook}
        />
      </Provider>
    );

    const deleteButtons = screen.getAllByRole("button");
    expect(deleteButtons).toHaveLength(mockBooks.length);

    userEvent.click(deleteButtons[0]);
    expect(onDeleteBook).toHaveBeenCalledWith(mockBooks[0].id);
  });

  test("applies custom styles and class names", () => {
    const customStyle = { backgroundColor: "red" };
    const customClassName = "custom-class-name";

    render(
      <Provider store={store}>
        <BookList
          books={mockBooks}
          customStyle={customStyle}
          customClassName={customClassName}
        />
      </Provider>
    );

    const bookList = screen.getByTestId("book-list");
    expect(bookList).toHaveStyle(customStyle);
    expect(bookList).toHaveClass(customClassName);
  });
});
