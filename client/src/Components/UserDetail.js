import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserLikes } from "./UserLikes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    marginBottom: "20px",
    color: "#919191",
  },
  userInfo: {
    display: "flex",
    flexFlow: "row wrap",
    border: "solid #242423",
    width: "60%",
    padding: "20px",
    justifyContent: "space-between",
    background: "#242423",
    marginBottom: "20px",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    "& button": {
      background: "#f5cb5c",
    },
  },
  showLikes: {
    border: "solid #242423",
    width: "60%",
    padding: "20px",
    background: "#242423",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    marginBottom: "20px",
  },
  lowerProfile: {
    display: "flex",
    justifyContent: "flex-end",
    width: "60%",
    padding: "20px",
    "& button": {
      background: "#F44336",
    },
  },
  spinner: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#F5CB5C",
  },
}));

export const UserDetail = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const fetchUrl = async () => {
    if (auth.userId) {
      try {
        let response = await fetch(
          `https://tvshowdb.herokuapp.com/api/users/${auth.userId}/userlikes`
        );
        response = await response.json();
        setIsLoading(false);
        setUserData(response.result);
      } catch (err) {
        setIsLoading(true);
        alert(err);
      }
    }
  };

  const deleteShow = async (showId) => {
    try {
      await fetch(
        `https://tvshowdb.herokuapp.com/api/users/${auth.userId}/unlike/${showId}`,
        {
          method: "PUT",
        }
      );
      fetchUrl();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async () => {
    try {
      auth.logout();
      await fetch(
        `https://tvshowdb.herokuapp.com/api/users/${auth.userId}/deleteUser`,
        {
          method: "DELETE",
        }
      );
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, [auth.userId]);

  return (
    <div className={classes.root}>
      <div className={classes.userInfo}>
        <Typography variant="h6">Hello {userData?.username}!</Typography>
        <Link to="/">
          <Button onClick={auth.logout}>Logout</Button>
        </Link>
      </div>
      <div className={classes.showLikes}>
        <Typography variant="h5">Likes</Typography>
        {isLoading ? (
          <CircularProgress className={classes.spinner} />
        ) : (
          <UserLikes likes={userData?.likes} handleDelete={deleteShow} />
        )}
      </div>
      <div className={classes.lowerProfile}>
        <Button onClick={deleteUser} startIcon={<DeleteIcon />}>
          Delete Account
        </Button>
      </div>
    </div>
  );
};
