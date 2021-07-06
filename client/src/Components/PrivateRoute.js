import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
