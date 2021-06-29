import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import IconButton from '@material-ui/core/IconButton';

import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: theme.palette.action.selected,
  },
  spinner: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const UserLikes = ({ likes }) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const handleDelete = async (showId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${auth.userId}/unlike/${showId}`, {
        method: "PUT"
      });
      response = await response.json()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TableContainer className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date liked</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {likes.length ? (
            likes.map((like) => (
              <TableRow key={like._id} hover={true}>
                <TableCell>
                  <Link
                    to={`/shows/${like.showId}`}
                    style={{ textDecoration: "none", color: "#F5CB5C" }}
                  >
                    {like.showName}
                  </Link>
                </TableCell>
                <TableCell align="right" >
                  {like.date}
                </TableCell>
                <TableCell align="right">
                  <IconButton style={{ color: "#F5CB5C" }} size="small" onClick={() => handleDelete(like.showId)}>
                    <HighlightOffTwoToneIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <Typography>No likes yet...</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
