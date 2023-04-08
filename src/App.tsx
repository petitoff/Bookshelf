import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";
import { ToastContainer } from "react-toastify";
import "./App.css";

// components
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
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
          <Route exact path="/" component={Home} />
          <ProtectedRoute exact path="/books" component={Books} />
          <ProtectedRoute exact path="/books/:id" component={Book} />
          <Route exact path="/signup">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Signup />}
          </Route>
          <Route exact path="/login">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Login />}
          </Route>
          <Route path="/*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
