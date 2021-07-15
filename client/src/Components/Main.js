import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ShowList from "./ShowList";
import remoteIcon from "../assets/remote-control.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1400px",
    marginLeft: "auto",
    marginRight: "auto",
    "& .MuiFormLabel-root": {
      color: "#f5cb5c",
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#f5cb5c",
    },
    "& .MuiInputBase-input": {
      color: "#fafafa",
    },
    "& form": {
      margin: "20px",
    },
  },
  showList: {
    margin: "10px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    marginBottom: "20px",
  },
  showCard: {
    position: "relative",
    margin: "10px",
    width: "210px",
    textAlign: "center",
    color: "#F5CB5C",
    border: "3px solid",
  },
}));

export default function Main() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    "https://api.tvmaze.com/search/shows?q=the+wire"
  );
  const classes = useStyles();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        let response = await fetch(url);
        response = await response.json();
        setData(response);
      } catch (err) {
        alert(err);
      }
    };
    fetchUrl();
  }, [url]);

  const handleInput = (e) => {
    const trimQuery = e.target.value.replace(/\s+/g, "+").toLowerCase();
    setQuery(trimQuery);
  };

  const handleSubmit = (e) => {
    setUrl(`https://api.tvmaze.com/search/shows?q=${query}`);
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} autocomplete="off">
        <TextField
          style={{ margin: 8, color: "white" }}
          label="Search show"
          id="search"
          fullWidth
          variant="outlined"
          type="text"
          onChange={handleInput}
        />
        <Button
          style={{ backgroundColor: "#f5cb5c", marginLeft: "8px" }}
          type="submit"
          variant="contained"
          startIcon={
            <img
              src={remoteIcon}
              height="30px"
              width="30px"
              alt="remote icon"
            />
          }
        >
          Search{" "}
        </Button>
      </form>
      <section className={classes.showList}>
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
          <Typography>No shows found</Typography>
        )}
      </section>
    </div>
  );
}
