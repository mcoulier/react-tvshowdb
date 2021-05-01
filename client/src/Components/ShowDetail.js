import React, { useEffect, useState } from "react";

import defaultImg from "../assets/defaultImage.jpg";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
  },
  detail: {
    border: "1px solid black",
  },
}));

const ShowDetail = () => {
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

  console.log(data);

  return (
    <div className={classes.root}>
      <div className={classes.detail}></div>
      {data.image ? (
        <img src={data.image.original} width="300px" alt="img" />
      ) : (
        <img src={defaultImg} alt="defaultimg"></img>
      )}

      {!data.length > 0 && (
        <>
          <Typography>{data.name}</Typography>
          {data.genres &&
            data?.genres.map((genre) => {
              return <ul><Typography>{genre}</Typography></ul>;
            })}
          <Typography>{data?.rating?.average}</Typography>
          <Typography>{data?.rating?.average}</Typography>
          <Typography>{data?.network?.name}</Typography>
        </>
      )}
    </div>
  );
};

export default ShowDetail;
