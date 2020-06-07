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
  max-width: 45%;
  padding: 2rem;
  @media (max-width: ${variables.largeScreen}) {
    grid-template-columns: 1fr;
    max-width: 60%;
    grid-row-gap: 2rem;
  }

  @media (max-width: ${variables.mediumScreen}) {
    max-width: 100%;
  }
  @media (max-width: ${variables.smallScreen}) {
    padding: 0.3rem;
    max-width: 100%;
  }
`;
export default List;
