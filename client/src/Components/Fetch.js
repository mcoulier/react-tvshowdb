import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from "../assets/defaultImage.jpg";
import couchPotato from "../assets/matt-blackmon-edit.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#333533",
    margin: "20px",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#f5cb5c",
    },
  },
  showList: {
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  showImage: {
    margin: "5px",
    width: "210px",
    "&:hover": {},
  },
  mainImg: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  },
}));

const Fetch = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("the+wire");
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

  console.log(data);

  return (
    <div className={classes.root}>
      <img src={couchPotato} className={classes.mainImg} alt="Couch Potato" />
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ margin: 8 }}
          label="Enter name of show"
          fullWidth
          type="text"
          onChange={handleInput}
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
              {show && (
                <Link to={`/shows/${show.show.id}`}>
                  <img
                    src={
                      show.show.image === null
                        ? defaultImg
                        : show.show.image.medium
                    }
                    alt="img"
                  />
                </Link>
              )}
              <Typography>{show.show.name}</Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Fetch;
