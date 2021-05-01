import React, { useEffect, useState } from "react";

import defaultImg from "../assets/defaultImage.jpg";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    //background: "#3F51B5",
  },
}));

const ShowDetail = ({ show }) => {
  const classes = useStyles();
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchUrl() {
      try {
        let response = await fetch(`http://api.tvmaze.com/shows/${show}`);
        response = await response.json();
        setData(response);
      } catch (err) {
        alert(err);
      }
    }
    fetchUrl();
  }, [show]);

  return (
    <div className={classes.root}>
      {data.image ? (
        <img src={data.image.medium} alt="img" />
      ) : (
        <img src={defaultImg} alt="defaultimg"></img>
      )}

      {!data.length > 0 && (
        <>
          <Typography>{data.name}</Typography>
          {data.genres &&
            data?.genres.map((genre) => {
              return <ul>{genre}</ul>;
            })}
          <Typography>{data?.rating?.average}</Typography>
          <h1>{data?.rating?.average}</h1>
          <p>{data?.network?.name}</p>
        </>
      )}
    </div>
  );
};

export default ShowDetail;
