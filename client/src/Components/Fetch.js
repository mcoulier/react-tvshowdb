import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from "../assets/defaultImage.jpg";
import ShowDetail from "./ShowDetail";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#333533",
  },
  showList: {
    margin: "20px",
    padding: "10px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  showImage: {
    margin: "5px",
    width: "210px",
  },
}));

const Fetch = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [showId, setShowId] = useState("");
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

  //console.log(show);

  return (
    <div className={classes.root}>
      <form
        onSubmit={(e) => {
          setUrl(`http://api.tvmaze.com/search/shows?q=${query}`);
          e.preventDefault();
        }}
      >
        <TextField
          style={{ margin: 8 }}
          label="Enter name of show"
          fullWidth
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          style={{ backgroundColor: "#f5cb5c" }}
          type="submit"
          variant="contained"
        >
          Search
        </Button>
      </form>
      <div className={classes.showList}>
        {data &&
          data.map((show, index) => (
            <div className={classes.showImage} key={show.show.id}>
              {show.show.image ? (
                <Link to={`/shows/${show.show.id}`}>
                  <img src={show.show.image.medium} alt="img" />
                </Link>
              ) : (
                <Link to={`/shows/${show.show.id}`}>
                  <img src={defaultImg} alt="defaultimg"></img>
                </Link>
              )}
              <Typography>{show.show.name}</Typography>
            </div>
          ))}
      </div>
      <>{showId && <ShowDetail />}</>
    </div>
  );
};

export default Fetch;
