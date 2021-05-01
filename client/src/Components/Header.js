import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import cave from "../assets/cave.png";

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
    color: "#f5cb5c",
    textDecoration: "none",
    "&:hover": {
      color: "#9EC63D",
    },
  },
  loginBtn: {},
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuBtn}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}

          <Link to="/" className={classes.title}>
            <Typography variant="h6">
              <img src={cave} width="40px" alt="cave" />
              Couch Cove
            </Typography>
          </Link>
          <Button className={classes.loginBtn} edge="end" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
