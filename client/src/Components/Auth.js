import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { AuthContext } from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Auth() {
  const classes = useStyles();
  //const [isLoginMode, setIsLoginMode] = useState(false);
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    /* if (auth.isLoggedIn) {
      auth.logout();
    } else {
      auth.login();
    } */

    if (!auth.isLoggedIn) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
    auth.login();
  };

  return (
    <>
      <form className={classes.form}>
        {/* {!isLoginMode && <TextField variant="filled"></TextField>} */}
        <TextField
          variant="filled"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="filled"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="filled"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleAuth}>
          Register
        </Button>
        {/* <Button variant="contained" onClick={handleAuth}>
          {auth.isLoggedIn ? "Register" : "Login"}
        </Button> */}
      </form>
    </>
  );
}
