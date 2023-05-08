import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; // Importuj swój store, jeśli ścieżka jest inna, zaktualizuj ją

import App from "./App";

test("renders App component with Navbar, Sidebar, and ToastContainer", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  // Test czy Navbar jest obecny
  const navbarElement = screen.getByRole("navigation");
  expect(navbarElement).toBeInTheDocument();

  // Test czy Sidebar jest obecny
  const sidebarElement = screen.getByTestId("sidebar");
  expect(sidebarElement).toBeInTheDocument();
});
