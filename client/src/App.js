import React, { useState, useCallback } from "react";

import Fetch from "./Components/Fetch";
import Header from "./Components/Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ShowDetail from "./Components/ShowDetail";

import { makeStyles } from "@material-ui/core/styles";
import Auth from "./Components/Auth";
import Footer from "./Components/Footer";
import { AuthContext } from "./context/auth-context";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <div className={classes.root}>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
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
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
