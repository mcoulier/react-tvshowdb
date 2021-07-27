import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import bffIcon from "../assets/bff.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "30%",
    borderRadius: "12px",
    border: `1px solid ${theme.palette.primary.main}`,
    width: "auto",
    padding: "1rem",
    height: "150px",
    backgroundColor: "#18181B",
    color: "#fff",
    "& a": {
      marginTop: "10px",
    },
  },
}));

export default function PopUp({ open, handleClose }) {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={handleClose} className={classes.root}>
      <div className={classes.modal}>
        <Typography>Log in or Register to like shows!</Typography>
        <img height="70px" width="70px" src={bffIcon} alt="bff icon" />
        <Button
          component={Link}
          to="/login"
          color="primary"
          variant="contained"
        >
          Log in / Register
        </Button>
      </div>
    </Modal>
  );
}
