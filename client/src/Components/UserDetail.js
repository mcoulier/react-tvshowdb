import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    marginTop: "40px",
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
  },
  showLikes: {
    display: "flex",
    flexFlow: "column wrap",
    border: "solid #242423",
    width: "60%",
    padding: "20px",
    background: "#242423",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    marginBottom: "40px",
  },
  spinner: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const UserDetail = () => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    const fetchUrl = async () => {
      if (auth.userId) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/users/${auth.userId}/userlikes`
          );
          const responseData = await response.json();
          setIsLoading(false);
          setUserData(responseData.result);
          setUserLikes(responseData.result.likes);
        } catch (err) {
          alert(err);
        }
      }
    };
    fetchUrl();
  }, [auth]);

  return (
    <div className={classes.root}>
      <div className={classes.userInfo}>
        <Typography variant="h6">Hello {userData?.username}!</Typography>
        <Link to="/">
          <Button style={{ background: "#f5cb5c" }} onClick={auth.logout}>
            Logout
          </Button>
        </Link>
      </div>
      <div className={classes.showLikes}>
        {isLoading ? (
          <CircularProgress className={classes.spinner} />
        ) : (
          <>
            <Typography variant="h5">Likes</Typography>
            {userLikes.length ? (
              userLikes.map((like, id) => (
                <Typography key={like._id}>
                  <Link
                    to={`/shows/${like.showId}`}
                    style={{ textDecoration: "none", color: "#F5CB5C" }}
                  >
                    {like.showName}
                  </Link>
                </Typography>
              ))
            ) : (
              <Typography className={classes.spinner}>
                No likes yet...
              </Typography>
            )}
          </>
        )}
      </div>
    </div>
  );
};
