import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import defaultImg from "../assets/defaultImage.jpg";

const ShowDetail = ({ show }) => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUrl() {
      try {
        let response = await fetch(`http://api.tvmaze.com/shows/${show}`);
        response = await response.json();
        setData(response);
      } catch (err) {
        alert(err);
      }
    }
    fetchUrl();
  }, [show]);

  console.dir(data);

  return (
    <div>
      {data.image ? (
        <img src={data.image.medium} alt="img" />
      ) : (
        <img src={defaultImg} alt="defaultimg"></img>
      )}
      <Typography>{data.name}</Typography>
      <Typography>{data.schedule.time}</Typography>
      <Typography>{data.rating.average}</Typography>
      {/* <h1>{data.rating.average}</h1> */}
      {/* <p>{data.network.name}</p> */}
      {/*       {data.genres.map(genre => {
        <Typography>{genre}</Typography>
      })} */}
    </div>
  );
};

export default ShowDetail;
