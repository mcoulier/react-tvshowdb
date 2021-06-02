import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import { AuthContext } from "../context/auth-context";

import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#f5cb5c",
    },
    "& .MuiInput-underline::after": {
      borderColor: "#f5cb5c",
    },
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  },
  lowerForm: {
    marginTop: "5px",
  },
}));

export default function Auth() {
  const classes = useStyles();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
              username,
              email,
              password,
            }),
          }
        );
        const responseData = await response.json();
        auth.login(
          responseData.userId,
          responseData.username,
          responseData.token
        );
        setIsLoggedIn(true);
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
            email,
            password,
          }),
        });
        const responseData = await response.json();
        auth.login(
          responseData.userId,
          responseData.username,
          responseData.token
        );
        setIsLoggedIn(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Redirect to="/user" />
      ) : (
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
          <Button
            style={{ background: "#f5cb5c", marginTop: "10px" }}
            variant="contained"
            onClick={handleAuth}
          >
            {!isLoginMode ? "Register" : "Login"}
          </Button>
          {!isLoginMode && (
            <div className={classes.lowerForm}>
              <Typography>
                Already have an account?{" "}
                <Button
                  onClick={() => setIsLoginMode((prevState) => !prevState)}
                >
                  Login
                </Button>
              </Typography>
            </div>
          )}
        </form>
      )}
    </>
  );
}
