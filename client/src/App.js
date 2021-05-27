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

function App() {
  const classes = useStyles();
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);

  const login = useCallback((uid, username, token) => {
    setToken(token);
    setUserId(uid);
    setUsername(username);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, username: username, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.token) {
      login(userData.userId, userData.username, userData.token);
    }
  }, [login]);

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
