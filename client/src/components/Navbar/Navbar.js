import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styled, { css } from "styled-components";
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
                isHamburgerVisible={isHamburgerVisible}
                setIsHamburgerVisible={setIsHamburgerVisible}
              />
              <StyledNavbar>
                <NavLink exact activeClassName="active" to="/">
                  Strona główna
                </NavLink>
                <NavLink activeClassName="active" to="/kitchen">
                  Kuchnia
                </NavLink>
                <NavLink activeClassName="active" to="/codes">
                  Kody
                </NavLink>
                <NavLink activeClassName="active" to="/menu">
                  Menu
                </NavLink>
                <NavLink activeClassName="active" to="/admin">
                  Admin
                </NavLink>
                <NavLink activeClassName="active" to="/logout">
                  Wyloguj
                </NavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
          {/* zalogowany admin */}
          {isAuthenticated && userRole === "employee" && (
            <StyledNavbarContainer>
              <Hamburger
                isHamburgerOpen={isHamburgerOpen}
                setIsHamburgerOpen={setIsHamburgerOpen}
                isHamburgerVisible={isHamburgerVisible}
                setIsHamburgerVisible={setIsHamburgerVisible}
              />

              <StyledNavbar>
                <NavLink exact activeClassName="active" to="/">
                  Strona główna
                </NavLink>
                <NavLink activeClassName="active" to="/kitchen">
                  Kuchnia
                </NavLink>
                <NavLink activeClassName="active" to="/logout">
                  Wyloguj
                </NavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
          {/* zalogowany user */}
          {isAuthenticated && userRole === "user" && (
            <StyledNavbarContainer>
              <Hamburger
                isHamburgerOpen={isHamburgerOpen}
                setIsHamburgerOpen={setIsHamburgerOpen}
                isHamburgerVisible={isHamburgerVisible}
                setIsHamburgerVisible={setIsHamburgerVisible}
              />

              <StyledNavbar>
                <NavLink exact activeClassName="active" to="/">
                  Strona główna
                </NavLink>
                <NavLink activeClassName="active" to="/products">
                  Zamów
                </NavLink>
                <NavLink activeClassName="active" to="/about">
                  O Nas
                </NavLink>
                <NavLink activeClassName="active" to="/gallery">
                  Galeria
                </NavLink>
                <NavLink activeClassName="active" to="/logout">
                  Wyloguj
                </NavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
          {/* niezalogowany user */}
          {!isAuthenticated && (
            <StyledNavbarContainer>
              <Hamburger
                isHamburgerOpen={isHamburgerOpen}
                setIsHamburgerOpen={setIsHamburgerOpen}
                isHamburgerVisible={isHamburgerVisible}
                setIsHamburgerVisible={setIsHamburgerVisible}
              />

              <StyledNavbar>
                <NavLink exact activeClassName="active" to="/">
                  Strona główna
                </NavLink>
                <NavLink activeClassName="active" to="/login">
                  Logowanie
                </NavLink>
                <NavLink activeClassName="active" to="/about">
                  O Nas
                </NavLink>
                <NavLink activeClassName="active" to="/register">
                  Rejestracja
                </NavLink>
                <NavLink activeClassName="active" to="/gallery">
                  Galeria
                </NavLink>
              </StyledNavbar>
            </StyledNavbarContainer>
          )}
        </>
      )}
    </AuthContext.Consumer>
  );
};

const StyledNavbarContainer = styled.div``;
const StyledNavbar = styled.nav``;

export default Navbar;
