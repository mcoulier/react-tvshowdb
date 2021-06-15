import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import { AuthContext } from "../context/auth-context";
import { Formik, Form } from "formik";
import * as yup from "yup";

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
    marginTop: "20px",
  },
}));

export default function Auth() {
  const classes = useStyles();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useContext(AuthContext);

  const handleAuth = async (username, email, password) => {
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
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            showUsername: true,
          }}
          validationSchema={yup.object({
            showUsername: yup.boolean(),
            username: yup.string("Enter your username").when("showUsername", {
              is: !isLoginMode,
              then: yup.string("Username is required").required(),
            }),
            email: yup
              .string("Enter your email")
              .email("Enter a valid email")
              .required("Email is required"),
            password: yup
              .string("Enter your password")
              .min(8, "Password should be of minimum 8 characters length")
              .required("Password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleAuth(values.username, values.email, values.password);
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <Form onSubmit={handleSubmit} className={classes.form}>
                {!isLoginMode && (
                  <TextField
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.username && touched.username && errors.username
                    }
                    error={errors.username && touched.username}
                    margin="normal"
                  />
                )}
                <TextField
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                  error={errors.email && touched.email}
                  margin="normal"
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  error={errors.password && touched.password}
                  margin="normal"
                />
                <Button
                  style={{ background: "#f5cb5c", marginTop: "10px" }}
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {!isLoginMode ? "Register" : "Login"}
                </Button>
                {!isLoginMode && (
                  <Typography>
                    Already have an account?{" "}
                    <Button
                      onClick={() => setIsLoginMode((prevState) => !prevState)}
                    >
                      Login
                    </Button>
                  </Typography>
                )}
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
}
