import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { withRouter } from "react-router-dom";
import {
  StyledContainer,
  StyledBox,
  StyledHeader,
  StyledList,
  StyledListItem,
  StyledListItemLink,
  StyledButton,
  StyledListItemHeader,
  StyledDescription,
} from "../stylesComponents/StyledComponents";
const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const KitchenPage = ({ history }) => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);

  return (
    <AuthContext.Consumer>
      {(context) => (
        <StyledContainer>
          <StyledBox>
            <StyledHeader>Zamówienia do zrealizowania</StyledHeader>
            <StyledList>
              <StyledListItem>
                <StyledDescription>
                  #1 lorem ipsum dolor et ce tera
                </StyledDescription>
                <StyledListItemHeader>
                  <StyledListItemLink href="tel:+48123456789">
                    Zadzwoń
                  </StyledListItemLink>
                  <StyledListItemLink href="#">
                    Pokaż zamówienie
                  </StyledListItemLink>
                  <StyledButton>Archiwizuj</StyledButton>
                </StyledListItemHeader>
              </StyledListItem>
              <StyledListItem>
                <StyledDescription>#2 inne zamowienie</StyledDescription>
                <StyledListItemHeader>
                  <StyledListItemLink href="tel:+48123456789">
                    Zadzwoń
                  </StyledListItemLink>
                  <StyledListItemLink href="#">
                    Pokaż zamówienie
                  </StyledListItemLink>
                  <StyledButton>Archiwizuj</StyledButton>
                </StyledListItemHeader>
              </StyledListItem>
            </StyledList>
          </StyledBox>
          <StyledBox>
            <StyledHeader>Zamówienia zrealizowane</StyledHeader>
            <StyledList></StyledList>
          </StyledBox>
          <StyledBox>e</StyledBox>
          <StyledBox>e</StyledBox>
        </StyledContainer>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(KitchenPage);
