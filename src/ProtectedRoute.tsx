import { useCallback } from "react";
import { useAppSelector } from "./hooks/hooks";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }: any) => {
  const user = useAppSelector((state) => state.auth.user);

  const renderProtectedRoute = useCallback(
    ({ location }: any) =>
      user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      ),
    [user, children]
  );

  return <Route {...rest} render={renderProtectedRoute} />;
};

export default ProtectedRoute;
