import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#242423",
    padding: "4px",
    marginTop: "20px",
    color: "#919191",
    fontSize: "12px",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography variant="caption">2021 MC</Typography>
      <Typography variant="caption">
        Data by{" "}
        <a
          style={{ color: "#919191" }}
          href="https://www.tvmaze.com/api"
          target="_blank"
          rel="noreferrer"
        >
          TVmaze
        </a>
      </Typography>
    </footer>
  );
}
