import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useParams } from "react-router-dom";

import heartIcon from "../assets/heart.png";
import tvIcon from "../assets/tvIcon.png";
import clockIcon from "../assets/clockIcon.png";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  heartIcon: {
    "&:active": {
      transform: "scale(0.95)",
    },
  },
  genres: {
    background: "#F5CB5C",
    borderRadius: "30px",
    color: "black",
  },
}));

export const ShowContent = ({ data }) => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const classes = useStyles();

  const updateLike = async () => {
    if (auth.userId) {
      try {
        await fetch(`http://localhost:8080/api/users/${auth.userId}/like`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            showId: params.showId,
            showName: data.name,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You need to be logged in to like!");
    }
  };

  console.log(data)

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        {data.name}{" "}
        <img
          onClick={updateLike}
          src={heartIcon}
          className={classes.heartIcon}
          width="25px"
          alt="heart icon"
        />
      </Typography>
      {data.genres &&
        data?.genres.map((genre, index) => {
          return (
            <Typography key={index} className={classes.genres}>
              {genre}
            </Typography>
          );
        })}
      <Typography>{data?.rating?.average}</Typography>
      {data?.averageRuntime && (
        <Typography>
          <img src={clockIcon} alt="clock icon" width="30px" />
          {data?.averageRuntime}
        </Typography>
      )}
      <Typography>Status: {data?.status}</Typography>
      <Typography>
        <img src={tvIcon} alt="tv icon" width="30px" /> {data?.network?.name}
      </Typography>
    </div>
  );
};
