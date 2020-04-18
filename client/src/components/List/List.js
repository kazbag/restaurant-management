import React, { useState, useEffect } from "react";
import "./styles.css";
const List = (props) => {
  return <div className="list">{props.children}</div>;
};
export default List;
