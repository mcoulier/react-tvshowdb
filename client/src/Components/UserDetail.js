import React, { useContext, useEffect, useState } from "react";

import { Typography, Button } from "@material-ui/core";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

export const UserDetail = ({ username }) => {
  const auth = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${auth.userId}/userlikes`
        );
        const responseData = await response.json();
        setUserData(responseData.result);
        setUserLikes(responseData.result.likes);
      } catch (err) {
        alert(err);
      }
    };
    fetchUrl();
  }, []);

  return (
    <div>
      <Typography>Hello {username}</Typography>
      <Link to="/">
        <Button onClick={auth.logout}>Logout</Button>
      </Link>
      {userLikes.map((like, id) => (
        <Typography>{like.showName}</Typography>
      ))}
    </div>
  );
};
