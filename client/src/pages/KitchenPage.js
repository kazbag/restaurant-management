import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { withRouter } from "react-router-dom";
import {
  StyledContainer,
  StyledBox,
  StyledHeader,
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
          </StyledBox>
          <StyledBox>
            <StyledHeader>Zamówienia zrealizowane</StyledHeader>
          </StyledBox>
          <StyledBox>e</StyledBox>
          <StyledBox>e</StyledBox>
        </StyledContainer>
      )}
    </AuthContext.Consumer>
  );
};

export default withRouter(KitchenPage);
