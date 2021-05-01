import React, { useEffect, useState } from "react";

import defaultImg from "../assets/defaultImage.jpg";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
  },
  showImg: {
    border: "1px solid black",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    //width: "50%",
  },
  showContent: {
    padding: "10px",
    textAlign: "center",
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

  //console.log(data);

  return (
    <div className={classes.root}>
      {data.image ? (
        <img
          className={classes.showImg}
          src={data.image.original}
          style={{ maxWidth: "400px", maxHeight: "800px" }}
          alt="img"
        />
      ) : (
        <img
          className={classes.showImg}
          src={defaultImg}
          style={{ maxWidth: "400px", maxHeight: "800px" }}
          alt="defaultimg"
        ></img>
      )}
      <div className={classes.showContent}>
        {!data.length > 0 && (
          <>
            <Typography variant="h4">{data.name}</Typography>
            {data.genres &&
              data?.genres.map((genre, index) => {
                return (
                  <ul key={index}>
                    <Typography>{genre}</Typography>
                  </ul>
                );
              })}
            <Typography>{data?.rating?.average}</Typography>
            <Typography>{data?.rating?.average}</Typography>
            <Typography>{data?.network?.name}</Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowDetail;
