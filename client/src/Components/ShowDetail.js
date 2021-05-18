import React, { useEffect, useState } from "react";

import defaultImg from "../assets/defaultImage.jpg";
import heartIcon from "../assets/heart.png";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: "20px",
    background: `#242423`,
  },
  showCover: {
    width: "70%",
    margin: "10px",
  },
  showContent: {
    margin: "10px",
    textAlign: "center",
    /*     top: 0,
    width: "100%", */
  },
  heartIcon: {
    "&:active": {
      transform: "scale(0.95)",
    },
  },
}));

export default function ShowDetail() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const params = useParams();

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

  //console.log(data);

  return (
    <div className={classes.root}>
      {data && (
        <img
          className={classes.showCover}
          src={!data.image ? defaultImg : data.image.original}
          style={{ maxWidth: "400px", maxHeight: "800px" }}
          alt="img"
        />
      )}
      <div className={classes.showContent}>
        {!data.length > 0 && (
          <>
            <Typography variant="h4">{data.name}</Typography>
            {data.genres &&
              data?.genres.map((genre, index) => {
                return (
                  <ul key={index}>
                    <Typography>- {genre}</Typography>
                  </ul>
                );
              })}
            <Typography>{data?.rating?.average}</Typography>
            <Typography>Status: {data?.status}</Typography>
            <Typography>{data?.network?.name}</Typography>
            <img
              src={heartIcon}
              className={classes.heartIcon}
              width="30px"
              alt="heart icon"
            />
          </>
        )}
      </div>
    </div>
  );
}
