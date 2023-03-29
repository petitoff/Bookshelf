import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";

// components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function PrivateRoute({ children, ...rest }: any) {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const userIsAuthenticated = useAppSelector(
    (state) => state.auth.user !== undefined
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <Route exact path="/signup">
            {userIsAuthenticated ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route exact path="/login">
            {userIsAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
