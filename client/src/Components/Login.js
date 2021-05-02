import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { AuthContext } from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Login() {
  const classes = useStyles();
  //const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext)

  return (
    <div className={classes.root}>
      {/* {!isLoginMode && <TextField variant="filled"></TextField>} */}
      <TextField variant="filled" label="Email" />
      <TextField variant="filled" label="Password" />
      {/* <Button variant="contained">Register</Button> */}
      <Button variant="contained">{auth.isLoggedIn ? "Register" : "Login"}</Button>
    </div>
  );
}
