import React from "react";

import Fetch from "./Components/Fetch";
import Header from "./Components/Header";
import { Route, Switch } from "react-router-dom";
import ShowDetail from "./Components/ShowDetail";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#333533",
    height: "100vh",
    overflowX: "hidden",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Fetch />
        </Route>
        <Route path="/shows/:showId">
          <ShowDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
