import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ForYouSection } from "../ForYouSection";

jest.mock("react-blurhash", () => ({
  Blurhash: () => <div>Mock Blurhash</div>,
}));

const books = [
  { id: 1, title: "Sci-Fi Book", category: "Sci-Fi" },
  { id: 2, title: "Horror Book", category: "Horror" },
  { id: 3, title: "Fantasy Book", category: "Fantasy" },
];

const mockStore = configureStore();
const store = mockStore({
  books: {
    books,
  },
  auth: {
    user: {
      favouriteCategories: ["Sci-Fi", "Fantasy"],
    },
  },
});

describe("ForYouSection", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <ForYouSection />
      </Provider>
    );
  });

  it("displays only books from favorite categories", () => {
    render(
      <Provider store={store}>
        <ForYouSection />
      </Provider>
    );

    expect(screen.queryByText("Horror Book")).toBeNull();
    expect(screen.getByText("Sci-Fi Book")).toBeInTheDocument();
    expect(screen.getByText("Fantasy Book")).toBeInTheDocument();
  });
});
