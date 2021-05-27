import React, { useContext } from "react";

import { Typography, Button } from "@material-ui/core";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

export const UserDetail = ({ username }) => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <Typography>Hello {username}</Typography>
      <Link to="/">
        <Button onClick={auth.logout}>Logout</Button>
      </Link>
    </div>
  );
};
