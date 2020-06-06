import React, { useEffect } from "react";
import styled, { css } from "styled-components";
const Loader = ({ loading }) => {
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  return (
    <StyledModalContainer loading={loading}>
      <StyledModalText>Ładowanie...</StyledModalText>
    </StyledModalContainer>
  );
};
const StyledModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.35);
  display: none;
  justify-content: center;
  align-items: center;
  ${({ loading }) =>
    loading === "true" &&
    css`
      display: flex;
    `}
`;

const StyledModalText = styled.span`
  font-size: 3rem;
  color: red;
`;

export default Loader;
