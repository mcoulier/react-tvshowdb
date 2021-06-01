import React, { useState, useCallback, useEffect } from "react";

import Fetch from "./Components/Fetch";
import Header from "./Components/Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ShowDetail from "./Components/ShowDetail";

import { makeStyles } from "@material-ui/core/styles";
import Auth from "./Components/Auth";
import Footer from "./Components/Footer";
import { AuthContext } from "./context/auth-context";
import { UserDetail } from "./Components/UserDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#333533",
    minHeight: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
    position: "relative",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

let logoutTimer;

function App() {
  const classes = useStyles();
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState();

  const login = useCallback((uid, username, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setUsername(username);
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiration(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        username: username,
        token: token,
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
    if ((token, tokenExpiration)) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  console.log(logoutTimer);

  return (
    <div className={classes.root}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          username: username,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Fetch />
            </Route>
            <Route path="/shows/:showId">
              <ShowDetail />
            </Route>
            <Route path="/login">
              <Auth />
            </Route>
            <Route path="/user">
              <UserDetail username={username} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
