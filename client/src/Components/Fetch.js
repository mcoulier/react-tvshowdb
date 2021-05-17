import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ShowList from "./ShowList";

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: "#333533",
    margin: "20px",
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#f5cb5c",
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#f5cb5c",
    },
  },
  showList: {
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  showCard: {
    position: "relative",
    margin: "10px",
    width: "210px",
    //background: "#e8af5a",
    textAlign: "center",
    color: "#F5CB5C",
    border: "3px solid",
    //padding: "3px",
    /* [theme.breakpoints.down("sm")]: {
      width: "20%",
    }, */
  },
}));

export default function Fetch() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    "http://api.tvmaze.com/search/shows?q=the+wire"
  );
  const classes = useStyles();

  useEffect(() => {
    async function fetchUrl() {
      try {
        let response = await fetch(url);
        response = await response.json();
        setData(response);
      } catch (err) {
        alert(err);
      }
    }
    fetchUrl();
  }, [url]);

  const handleInput = (e) => {
    const trimQuery = e.target.value.replace(/\s+/g, "+").toLowerCase();
    setQuery(trimQuery);
  };

  const handleSubmit = (e) => {
    setUrl(`http://api.tvmaze.com/search/shows?q=${query}`);
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ margin: 8, color: "white" }}
          label="Search show"
          fullWidth
          variant="outlined"
          type="text"
          onChange={handleInput}
        />
        <Button
          style={{ backgroundColor: "#f5cb5c", marginLeft: "8px" }}
          type="submit"
          variant="contained"
        >
          Search
        </Button>
      </form>
      <div className={classes.showList}>
        {data.length ? (
          data.map((show, index) => (
            <div className={classes.showCard} key={show.show.id}>
              {show.show && (
                <Link
                  to={`/shows/${show.show.id}`}
                  style={{ textDecoration: "none", color: "#F5CB5C" }}
                >
                  <ShowList show={show.show} />
                </Link>
              )}
            </div>
          ))
        ) : (
          <Typography>{`No shows found`}</Typography>
        )}
      </div>
    </div>
  );
}
