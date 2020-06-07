import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import variables from "../../variables/variables";

const List = (props) => {
  return <StyledList>{props.children}</StyledList>;
};

const StyledList = styled.div`
  margin: 0 auto;
  background-color: ${variables.whiteColor};
  border-radius: 0.6rem;
  display: grid;
  grid-column-gap: 2rem;
  grid-template-columns: 1fr 1fr;
  max-width: 1400px;
  padding: 2rem;
  @media (max-width: ${variables.mediumScreen}) {
    grid-template-columns: 1fr;
  }
  @media (max-width: ${variables.smallScreen}) {
    padding: 0.3rem;
  }
`;
export default List;
