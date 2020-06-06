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
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 1s linear;
  ${({ loading }) =>
    loading === "true" &&
    css`
      visibility: visible;
      opacity: 1;
    `}
`;

const StyledModalText = styled.span`
  font-size: 3rem;
  color: red;
`;

export default Loader;
