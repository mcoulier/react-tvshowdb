import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from "../assets/defaultImage.jpg";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  showCover: {
    "&:hover": {
      transform: "scale(1.01)",
      opacity: "0.97",
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
    <>
      <img
        className={classes.showCover}
        src={show.image === null ? defaultImg : show.image.medium}
        alt="show cover"
      />
      <Typography>{show.name}</Typography>
    </>
  );
}
