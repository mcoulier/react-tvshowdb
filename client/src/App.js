import React, { useState, useCallback } from "react";

import Fetch from "./Components/Fetch";
import Header from "./Components/Header";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ShowDetail from "./Components/ShowDetail";

import { makeStyles } from "@material-ui/core/styles";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import { AuthContext } from "./context/auth-context";
import ShowList from "./Components/ShowList";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#333533",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
  },
}));

function App() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
            <Route exact path="/shows/:showId">
              <ShowDetail />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
