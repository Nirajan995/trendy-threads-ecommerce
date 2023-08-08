import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loader;
