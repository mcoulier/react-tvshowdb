import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from "../assets/defaultImage.jpg";
import { Link } from "react-router-dom";

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
  showCover: {
    "&:hover": {
      //boxShadow: "-3px -3px #F5CB5C",
      transform: "scale(1.01)",
    },
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
    if (query === "") console.log("No data");
    setUrl(`http://api.tvmaze.com/search/shows?q=${query}`);
    e.preventDefault();
  };

  //console.log(data);

  return (
    <div className={classes.root}>
      {/* <img src={couchPotato} className={classes.mainImg} alt="Couch Potato" /> */}
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
              <Link to={`/shows/${show.show.id}`}>
                <img
                  className={classes.showCover}
                  src={
                    show.show.image === null
                      ? defaultImg
                      : show.show.image.medium
                  }
                  alt="img"
                />
              </Link>
              <Typography>{show.show.name}</Typography>
            </div>
          ))
        ) : (
          <Typography>{`No shows found`}</Typography>
        )}
      </div>
    </div>
  );
};

export default Fetch;
