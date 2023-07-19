import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppSelector } from "./hooks/hooks";
import "./App.css";

// components
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Settings from "./pages/Settings";
import UserReadingListView from "./pages/UserReadingListView";
import AddBookView from "./pages/AddBookView";
import FirstStepForm from "./features/welcomeScreen/FirstStepForm/FirstStepForm";
import { SecondStepForm } from "./features/welcomeScreen/SecondStepForm/SecondStepForm";
import { RegistrationThankYou } from "./features/welcomeScreen/RegistrationThankYou/RegistrationThankYou";

function App() {
  const user = useAppSelector((state) => state.auth.user);
  const userIsAuthenticated = Boolean(user);
  const isNewUser = user && !user.username;

  const renderRouteWithRedirect = (Component: React.ComponentType) => {
    if (isNewUser) {
      return <Redirect to="/welcome/first-step" />;
    } else {
      return <Component />;
    }
  };

  useEffect(() => {
    document.title = "Bookshelf";
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/*<NewUserRedirect user={user} isNewUser={isNewUser}/>*/}

        <Navbar />
        <Sidebar />
        <ToastContainer position="top-center" />

        <Switch>
          <Route exact path="/">
            <Redirect to="/books" />
          </Route>
          <Route exact path="/books">
            {renderRouteWithRedirect(Books)}
          </Route>
          <Route exact path="/book/:id">
            {renderRouteWithRedirect(Book)}
          </Route>
          <Route exact path="/login">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Login />}
          </Route>
          <Route exact path="/signup">
            {userIsAuthenticated ? <Redirect to="/books" /> : <Signup />}
          </Route>
          <Route exact path="/:username/reading-list">
            {renderRouteWithRedirect(UserReadingListView)}
          </Route>
          <ProtectedRoute exact path="/settings">
            {renderRouteWithRedirect(Settings)}
          </ProtectedRoute>
          <ProtectedRoute exact path="/add-book">
            {renderRouteWithRedirect(AddBookView)}
          </ProtectedRoute>

          <ProtectedRoute exact path="/welcome/first-step">
            <FirstStepForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/welcome/second-step">
            <SecondStepForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/welcome/registration-thank-you">
            <RegistrationThankYou />
          </ProtectedRoute>

          {/*<Route path="/*" component={ErrorPage} />*/}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
