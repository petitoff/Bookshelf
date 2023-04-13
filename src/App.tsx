import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// components
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import Books from "./pages/Books";
import Book from "./pages/Book";

function App() {
  const userIsAuthenticated = useAppSelector(
    (state) => state.auth.user !== undefined
  );

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <ToastContainer position="top-center" />

        <Switch>
          <Route exact path="/">
            <Redirect to="/books" />
          </Route>
          <ProtectedRoute exact path="/books">
            <Books />
          </ProtectedRoute>
          <ProtectedRoute exact path="/books/:id">
            <Book />
          </ProtectedRoute>
          <Route exact path="/login">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Login />}
          </Route>
          <Route exact path="/signup">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Signup />}
          </Route>
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
