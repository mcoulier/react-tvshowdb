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
}));

export default function ShowList({ show }) {
  const classes = useStyles();

  return (
    <>
      <img
        className={classes.showCover}
        src={show.image === null ? defaultImg : show.image.medium}
        alt="show cover"
        width="210px"
        height="295px"
      />
      <Typography variant="subtitle1">{show.name}</Typography>
    </>
  );
}
