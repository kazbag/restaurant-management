import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import variables from "../../variables/variables";

const List = (props) => {
  return <StyledList>{props.children}</StyledList>;
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${variables.whiteColor};
  padding: 2rem;
  border-radius: 0.6rem;
`;
export default List;
