import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from "../assets/defaultImage.jpg";
import ShowDetail from "./ShowDetail";

const useStyles = makeStyles((theme) => ({
  showList: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  showImage: {
    border: "2px solid black",
    margin: "5px",
    //width: "210px",
  },
}));

const Fetch = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState("");
  const [url, setUrl] = useState(
    "http://api.tvmaze.com/search/shows?q=the+wire"
  );
  const classes = useStyles();

  //console.log(show);

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

  return (
    <div>
      <form
        onSubmit={(e) => {
          setUrl(`http://api.tvmaze.com/search/shows?q=${query}`);
          e.preventDefault();
        }}
      >
        <TextField
          style={{ margin: 8 }}
          fullWidth
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
      <div className={classes.showList}>
        {data &&
          data.map((show, index) => (
            <div
              className={classes.showImage}
              onClick={() => setShow(show.show.id)}
            >
              {show.show.image ? (
                <img src={show.show.image.medium} alt="img" />
              ) : (
                <img src={defaultImg} alt="defaultimg"></img>
              )}
              <Typography>{show.show.name}</Typography>
            </div>
          ))}
      </div>
      {show && <ShowDetail show={show} />}
    </div>
  );
};

export default Fetch;
