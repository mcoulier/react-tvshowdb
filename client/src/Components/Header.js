import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";
import IconButton from "@material-ui/core/IconButton";

import cave from "../assets/godzilla.png";
import { AuthContext } from "../context/auth-context";

const useStyles = makeStyles((theme) => ({
  root: {},
  appBar: {
    flexGrow: 1,
    background: "#242423",
  },
  menuBtn: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
    display: "flex",
    color: "#f5cb5c",
    textDecoration: "none",
    "&:hover": {
      color: "#c2910a",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link to="/" className={classes.title}>
            <img src={cave} width="40px" alt="cave" />
            <Typography style={{ marginTop: "10px" }} variant="h6">
              ZapZilla
            </Typography>
          </Link>
          {auth.isLoggedIn ? (
            <IconButton
              className={classes.loginBtn}
              style={{ background: "#f5cb5c" }}
              variant="contained"
              component={Link}
              to="/user"
            >
              <FaceIcon />
            </IconButton>
          ) : (
            <Button
              component={Link}
              to="/login"
              style={{ background: "#f5cb5c" }}
            >
              Register / Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
