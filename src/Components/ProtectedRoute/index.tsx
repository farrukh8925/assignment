import React, { ComponentType } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { isTokenValid } from "../../utils/user";

// Prop types
type ProtectedRouteTypes = {
  path: string;
  component: ComponentType;
};

/**
 * Protected route uses redirect to navigate to alternate route.
 * Using for when the token doesnt exisit and route is acccessed directly.
 */
const ProtectedRoute: React.FC<ProtectedRouteTypes & RouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isTokenValid()) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};

ProtectedRoute.displayName = "ProtectedRoute";

export default ProtectedRoute;
