import { Redirect, Route } from "react-router-dom";
import { useAppSelector } from "./hooks/hooks";

const ProtectedRoute = ({ children, ...rest }: any) => {
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
};

export default ProtectedRoute;
