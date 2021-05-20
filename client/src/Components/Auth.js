import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
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
  const [isLoginMode, setIsLoginMode] = useState(false);
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!isLoginMode) {
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
        auth.login();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
        auth.login();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <form className={classes.form}>
        {!isLoginMode && (
          <TextField
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
        <TextField
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleAuth}>
          {!isLoginMode ? "Register" : "Login"}
        </Button>
      </form>
      {!isLoginMode && (
        <>
          <Typography>
            Already have an account?{" "}
            <Button onClick={() => setIsLoginMode((prevState) => !prevState)}>
              Login
            </Button>
          </Typography>
        </>
      )}
    </>
  );
}
