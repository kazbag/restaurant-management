import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import variables from '../../variables/variables';

const Hamburger = ({ isHamburgerOpen, setIsHamburgerOpen }) => {
  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <StyledHamburger className="hamburger" onClick={handleHamburgerClick}>
      <StyledLine isHamburgerOpen={isHamburgerOpen} />
      <StyledLine isHamburgerOpen={isHamburgerOpen} />
      <StyledLine isHamburgerOpen={isHamburgerOpen} />
    </StyledHamburger>
  );
};

const StyledHamburger = styled.div`
  margin-left: auto;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  flex-direction: column;
  cursor: pointer;

  @media screen and (min-width: ${variables.smallScreen}) {
    display: none;
  }
`;
const StyledLine = styled.span`
  width: 100%;
  height: 0.2rem;
  background-color: ${variables.primaryColor};
  transition: 0.35s ease-in-out;
  ${({ isHamburgerOpen }) => isHamburgerOpen
    && css`
      &:nth-of-type(2) {
        transform: translateX(15rem) rotate(360deg);
        visibility: hidden;
      }
      &:nth-of-type(1) {
        transform: rotate(45deg) translate(0.75rem, 0.75rem);
      }

      &:nth-of-type(3) {
        transform: rotate(-45deg) translate(0.65rem, -0.75rem);
      }
    `}
`;

export default Hamburger;
