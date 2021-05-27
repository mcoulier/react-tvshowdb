import React from "react";

import { Typography } from "@material-ui/core";

export const UserDetail = ({ username }) => {
  return (
    <div>
      <Typography>Hello {username}</Typography>
    </div>
  );
};
