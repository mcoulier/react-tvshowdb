import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "#242423",
    padding: "2px",
    borderTop: "solid #f5cb5c",
    opacity: "0.5",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>2021 MC</Typography>
      <Typography style={{ paddingRight: "5px" }}>
        Data by &nbsp
        <a href="https://www.tvmaze.com/api" target="_blank" rel="noreferrer">
          TVmaze
        </a>
      </Typography>
    </div>
  );
}