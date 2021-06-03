import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useParams } from "react-router-dom";
import defaultImg from "../assets/defaultImage.jpg";
import { ShowContent } from "./ShowContent";

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
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "400px",
    minWidth: "300px",
    width: "90%",
  },
}));

export default function ShowDetail() {
  const classes = useStyles();
  const [data, setData] = useState([]);
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
        <ShowContent data={data} />
      </div>
    </div>
  );
}
