import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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

  return (
    <TableContainer className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date liked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {likes.length ? (
            likes.map((like, id) => (
              <TableRow key={like._id} hover={true}>
                <TableCell>
                  <Link
                    to={`/shows/${like.showId}`}
                    style={{ textDecoration: "none", color: "#F5CB5C" }}
                  >
                    {like.showName}
                  </Link>
                </TableCell>
                <TableCell align="right">{like.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <Typography>No likes yet...</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
