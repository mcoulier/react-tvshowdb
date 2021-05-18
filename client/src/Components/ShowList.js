import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from "../assets/defaultImage.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  showCover: {
    "&:hover": {
      //boxShadow: "-3px -3px #F5CB5C",
      transform: "scale(1.01)",
    },
  },
  rating: {
    display: "inline-block",
    position: "absolute",
    right: 0,
    top: 0,
    background: "green",
    zIndex: 2,
    marginRight: "5px",
    color: "black",
  },
}));

export default function ShowList({ show }) {
  const classes = useStyles();

  return (
    <div>
      <img
        className={classes.showCover}
        src={show.image === null ? defaultImg : show.image.medium}
        alt="show cover"
      />
      <h3 className={classes.rating}>{show?.rating?.average}</h3>
      <Typography>{show.name}</Typography>
    </div>
  );
}
