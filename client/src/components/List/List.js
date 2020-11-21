import React, { useState, useEffect } from "react";

const List = (props) => {
  return <ul className="list">{props.children}</ul>;
};

export default List;
