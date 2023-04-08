import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";

// components
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Books from "./pages/Books";
import Book from "./pages/Book";

function App() {
  const userIsAuthenticated = useAppSelector(
    (state) => state.auth.user !== undefined
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Sidebar />

        <ToastContainer position="top-center" />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute exact path="/books">
            <Books />
          </ProtectedRoute>
          <ProtectedRoute exact path="/books/:id">
            <Book />
          </ProtectedRoute>
          <Route exact path="/signup">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Signup />}
          </Route>
          <Route exact path="/login">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Login />}
          </Route>
          <Route path="/*">
            <ErrorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
