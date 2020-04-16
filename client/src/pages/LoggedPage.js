import React, { useState } from "react";

const LoggedPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <p style={{ color: "white", marginBottom: "24px" }}>
        naciśnięto {count} razy
      </p>
      <button
        style={{ display: "block" }}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Dodaj
      </button>
    </div>
  );
};

export default LoggedPage;
