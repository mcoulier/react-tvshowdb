import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

export default function SnackBar({ IsShowLiked, snackOpen, onclose }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackOpen}
      autoHideDuration={3000}
      onClose={onclose}
    >
      {IsShowLiked ? (
        <MuiAlert variant="filled" severity="warning">
          Show already liked!
        </MuiAlert>
      ) : (
        <MuiAlert variant="filled" severity="success">
          Show liked!
        </MuiAlert>
      )}
    </Snackbar>
  );
}
