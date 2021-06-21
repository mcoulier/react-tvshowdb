import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useParams } from "react-router-dom";

import heartIcon from "../assets/heart.png";
import tvIcon from "../assets/tvIcon.png";
import clockIcon from "../assets/clockIcon.png";
import theaterIcon from "../assets/theater.png";
import starIcon from "../assets/star.png";

import { Typography, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import PopUp from "./PopUp";

const useStyles = makeStyles((theme) => ({
  heartIcon: {
    "&:hover": {
      opacity: "0.8",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
  },
  genreContainer: {
    display: "flex",
    flexFlow: "row wrap",
  },
  genres: {
    background: "#F5CB5C",
    borderRadius: "50px 50px 50px 50px / 50px 50px 50px 0px",
    color: "black",
    width: "fit-content",
    padding: "1px 10px",
    margin: "5px",
    marginTop: "40px",
  },
  icons: {
    marginTop: "30px",
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    "& img, p": {
      paddingTop: "10px",
    },
  },
}));

export const ShowContent = ({ data }) => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [IsShowLiked, setIsShowLiked] = useState(false);

  const updateLike = async () => {
    if (auth.userId) {
      try {
        let response = await fetch(
          `http://localhost:8080/api/users/${auth.userId}/like`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              showId: params.showId,
              showName: data.name,
            }),
          }
        );
        response = await response.json();
        setIsShowLiked(response.isAlreadyLiked);
        setSnackOpen(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        {IsShowLiked ? (
          <MuiAlert variant="filled" severity="warning">
            Show already liked!
          </MuiAlert>
        ) : (
          <MuiAlert variant="filled" severity="success">
            Show liked!
          </MuiAlert>
        )}
      </Snackbar>
      <Typography className={classes.title} variant="h4">
        {data.name}{" "}
        <img
          onClick={updateLike}
          src={heartIcon}
          className={classes.heartIcon}
          width="30px"
          alt="heart icon"
        />
      </Typography>
      <div className={classes.genreContainer}>
        {data.genres &&
          data.genres.map((genre, index) => {
            return (
              <Typography key={index} className={classes.genres}>
                {genre}
              </Typography>
            );
          })}
      </div>
      <div className={classes.icons}>
        {data?.rating?.average && (
          <>
            <img src={starIcon} alt="star icon" width="50px" />
            <Typography>Rating: {data.rating.average}</Typography>
          </>
        )}
        {data?.averageRuntime && (
          <>
            <img src={clockIcon} alt="clock icon" width="50px" />
            <Typography>Average Runtime: {data.averageRuntime}</Typography>
          </>
        )}
        {data?.status && (
          <>
            <img src={theaterIcon} alt="theater icon" width="50px" />
            <Typography>Status: {data.status}</Typography>
          </>
        )}
        {data?.network?.name && (
          <>
            <img src={tvIcon} alt="tv icon" width="50px" />{" "}
            <Typography>Network: {data.network.name}</Typography>
          </>
        )}
      </div>
      <PopUp open={open} handleClose={handleClose} />
    </>
  );
};
