import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { useParams } from "react-router-dom";

import heartIcon from "../assets/heart.png";
import tvIcon from "../assets/tvIcon.png";
import clockIcon from "../assets/clockIcon.png";
import theaterIcon from "../assets/theater.png";
import starIcon from "../assets/star.png";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PopUp from "./PopUp";
import SnackBar from "./SnackBar";

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
    background: `${theme.palette.primary.main}`,
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
      paddingTop: "15px",
    },
    "& img": {
      width: "45px",
      height: "45px",
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
          `https://tvshowdb.herokuapp.com/api/users/${auth.userId}/like`,
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

  const snackClose = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <Typography className={classes.title} variant="h4">
        {data.name}{" "}
        <img
          onClick={updateLike}
          src={heartIcon}
          className={classes.heartIcon}
          width="30px"
          height="30px"
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
            <img src={starIcon} alt="star icon" />
            <Typography>Rating: {data.rating.average}</Typography>
          </>
        )}
        {data?.averageRuntime && (
          <>
            <img src={clockIcon} alt="clock icon" />
            <Typography>Average Runtime: {data.averageRuntime}</Typography>
          </>
        )}
        {data?.status && (
          <>
            <img src={theaterIcon} alt="theater icon" />
            <Typography>Status: {data.status}</Typography>
          </>
        )}
        {data?.network?.name && (
          <>
            <img src={tvIcon} alt="tv icon" />{" "}
            <Typography>Network: {data.network.name}</Typography>
          </>
        )}
      </div>
      <PopUp open={open} handleClose={handleClose} />
      <SnackBar
        IsShowLiked={IsShowLiked}
        snackOpen={snackOpen}
        onclose={snackClose}
      />
    </>
  );
};
