import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styled, { css } from "styled-components";
import variables from "../../variables/variables";

import Hamburger from "./Hamburger";
const Navbar = (props) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
  console.log(window.location);

  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          {/* zalogowany admin */}
          {isAuthenticated && userRole === "admin" && (
            <StyledNavbarContainer>
              <Hamburger
                isHamburgerOpen={isHamburgerOpen}
                setIsHamburgerOpen={setIsHamburgerOpen}
              />
              <StyledNavbar isHamburgerOpen={isHamburgerOpen}>
                <StyledNavLink exact to="/">
                  Strona główna
                </StyledNavLink>
                <StyledNavLink to="/kitchen">Kuchnia</StyledNavLink>
                <StyledNavLink to="/codes">Kody</StyledNavLink>
                <StyledNavLink to="/menu">Menu</StyledNavLink>
                <StyledNavLink to="/admin">Admin</StyledNavLink>
                <StyledNavLink to="/logout">Wyloguj</StyledNavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
          {/* zalogowany admin */}
          {isAuthenticated && userRole === "employee" && (
            <StyledNavbarContainer>
              <Hamburger
                isHamburgerOpen={isHamburgerOpen}
                setIsHamburgerOpen={setIsHamburgerOpen}
              />

              <StyledNavbar isHamburgerOpen={isHamburgerOpen}>
                <StyledNavLink exact to="/">
                  Strona główna
                </StyledNavLink>
                <StyledNavLink to="/kitchen">Kuchnia</StyledNavLink>
                <StyledNavLink to="/logout">Wyloguj</StyledNavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
          {/* zalogowany user */}
          {isAuthenticated && userRole === "user" && (
            <StyledNavbarContainer>
              <Hamburger
                isHamburgerOpen={isHamburgerOpen}
                setIsHamburgerOpen={setIsHamburgerOpen}
              />

              <StyledNavbar isHamburgerOpen={isHamburgerOpen}>
                <StyledNavLink exact to="/">
                  Strona główna
                </StyledNavLink>
                <StyledNavLink to="/products">Zamów</StyledNavLink>
                <StyledNavLink to="/about">O Nas</StyledNavLink>
                <StyledNavLink to="/gallery">Galeria</StyledNavLink>
                <StyledNavLink to="/logout">Wyloguj</StyledNavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
          {/* niezalogowany user */}
          {!isAuthenticated && (
            <StyledNavbarContainer>
              <Hamburger
                isHamburgerOpen={isHamburgerOpen}
                setIsHamburgerOpen={setIsHamburgerOpen}
              />

              <StyledNavbar isHamburgerOpen={isHamburgerOpen}>
                <StyledNavLink exact to="/">
                  Strona główna
                </StyledNavLink>
                <StyledNavLink activeClassName={activeClassName} to="/login">
                  Logowanie
                </StyledNavLink>
                <StyledNavLink to="/about">O Nas</StyledNavLink>
                <StyledNavLink to="/register">Rejestracja</StyledNavLink>
                <StyledNavLink to="/gallery">Galeria</StyledNavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};
const activeClassName = "active";
const StyledNavLink = styled(NavLink).attrs({
  activeClassName: activeClassName,
})`
  &.${activeClassName} {
    color: ${variables.blackColor};
    background-color: ${variables.primaryColor};
  }
  padding: 10px;
  text-decoration: none;
  color: ${variables.primaryColor};
  transition: 0.25s ease-in-out;
  &:hover {
    background-color: ${variables.primaryColor};
    color: ${variables.blackColor};
  }
`;
const StyledNavbarContainer = styled.div`
  padding: 0.5rem;
`;
const StyledNavbar = styled.nav`
  max-width: 50%;
  margin-left: auto;
  justify-content: space-around;
  transition: 0.3s;
  display: none;
  @media screen and (max-width: ${variables.mediumScreen}) {
    max-width: 100%;
  }
  @media screen and (min-width: ${variables.smallScreen}) {
    display: flex;
  }

  ${({ isHamburgerOpen }) =>
    isHamburgerOpen &&
    css`
      display: flex;
      justify-content: space-around;
      @media screen and (max-width: ${variables.smallScreen}) {
        flex-direction: column;
      }
    `}
`;

export default Navbar;
