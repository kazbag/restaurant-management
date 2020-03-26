import React, { useState } from "react";
const Greetings = props => {
  const { isLogged, setIsLogged } = props;
  console.log(props);
  // console.log(isLogged);
  return (
    <div style={{ color: "white", textAlign: "center" }}>
      {isLogged ? "witaj zalogowany użytkowniku" : "witaj nieznajomy"}
    </div>
  );
};

export default Greetings;
