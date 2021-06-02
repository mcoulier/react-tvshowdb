import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";

import heartIcon from "../assets/heart.png";
import tvIcon from "../assets/tvIcon.png";
import clockIcon from "../assets/clockIcon.png";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { useParams } from "react-router-dom";
import defaultImg from "../assets/defaultImage.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    marginTop: "40px",
    marginBottom: "40px",
    background: `#242423`,
    color: "#F5CB5C",
    width: "auto",
    justifyContent: "center",
  },
  showCover: {
    width: "90%",
    margin: "10px",
  },
  showContent: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
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

export default function ShowDetail() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const params = useParams();
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchUrl() {
      try {
        let response = await fetch(
          `http://api.tvmaze.com/shows/${params.showId}`
        );
        response = await response.json();
        setData(response);
      } catch (err) {
        alert(err);
      }
    }
    fetchUrl();
  }, [params.showId]);

  const updateLike = async () => {
    if (auth.userId) {
      try {
        const response = await fetch(
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
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You need to be logged in to like!");
    }
  };

  return (
    <div className={classes.root}>
      <img
        className={classes.showCover}
        src={
          data && data.image && Object.keys(data.image).length
            ? data.image.medium
            : defaultImg
        }
        style={{ maxWidth: "400px", maxHeight: "800px" }}
        alt="cover"
      />
      <div className={classes.showContent}>
        <Typography variant="h4">
          {data.name}
          <img
            onClick={updateLike}
            src={heartIcon}
            className={classes.heartIcon}
            width="30px"
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
    </div>
  );
}
