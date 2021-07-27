import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import IconButton from "@material-ui/core/IconButton";
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
    "& a": {
      color: `${theme.palette.primary.main}`,
      textDecoration: "none",
    },
  },
  spinner: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const UserLikes = ({ likes, handleDelete }) => {
  const classes = useStyles();

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
          {likes && likes.length ? (
            likes.map((like) => (
              <TableRow key={like._id}>
                <TableCell>
                  <Link to={`/shows/${like.showId}`}>{like.showName}</Link>
                </TableCell>
                <TableCell align="right">{like.date}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => handleDelete(like.showId)}
                  >
                    <HighlightOffTwoToneIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography>No likes yet...</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
