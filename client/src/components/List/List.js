import React, { useState, useEffect } from "react";

const List = (props) => {
  return (
    <div
      className="list"
      style={{
        maxWidth: "1366px",
        backgroundColor: "#f0f0f0",
        margin: "0 auto",
        color: "black",
        borderRadius: "12px",
      }}
    >
      {props.children}
    </div>
  );
};
export default List;
