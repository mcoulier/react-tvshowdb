import React, { useState, useCallback, useEffect, Suspense } from "react";

import Main from "./components/Main";
import Header from "./components/Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from "../src/components/PrivateRoute";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./components/Footer";
import { AuthContext } from "./context/auth-context";
import { UserDetail } from "./components/UserDetail";
import { CircularProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./styles/theme";

const ShowDetail = React.lazy(() => import("./components/ShowDetail"));
const Auth = React.lazy(() => import("./components/Auth"));

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#212121",
    minHeight: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    position: "relative",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: `${theme.palette.primary.main}`,
  },
}));

let logoutTimer;

function App() {
  const classes = useStyles();
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState();

  const login = useCallback((uid, username, token, expirationDate) => {
    setUsername(username);
    setToken(token);
    setUserId(uid);
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiration(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        username,
        token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(
        userData.userId,
        userData.username,
        userData.token,
        new Date(userData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  return (
    <div className={classes.root}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          userId,
          username,
          login,
          logout,
        }}
      >
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <Suspense
              fallback={
                <div className={classes.spinner}>
                  <CircularProgress />
                </div>
              }
            >
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/shows/:showId" component={ShowDetail} />
                <Route exact path="/login" component={Auth} />
                <PrivateRoute exact path="/user" component={UserDetail} />
              </Switch>
            </Suspense>
            <Footer />
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
