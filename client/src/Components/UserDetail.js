import React, { useContext, useEffect, useState } from "react";

import { Typography, Button } from "@material-ui/core";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
  },
}));

export const UserDetail = () => {
  const auth = useContext(AuthContext);
  //const [userData, setUserData] = useState();
  const [userLikes, setUserLikes] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${auth.userId}/userlikes`
        );
        const responseData = await response.json();
        //setUserData(responseData.result);
        setUserLikes(responseData.result.likes);
      } catch (err) {
        alert(err);
      }
    };
    fetchUrl();
  }, [auth]);

  return (
    <div className={classes.root}>
      <>
        <Typography>Hello {auth.username}</Typography>
        <Link to="/">
          <Button onClick={auth.logout}>Logout</Button>
        </Link>
        {userLikes.map((like, id) => (
          <Link
            to={`/shows/${like.showId}`}
            style={{ textDecoration: "none", color: "#F5CB5C" }}
          >
            <li key={like._id}>{like.showName}</li>
          </Link>
        ))}
      </>
    </div>
  );
};
