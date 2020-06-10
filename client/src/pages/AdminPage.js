import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import variables from "../variables/variables";

const AdminPage = () => {
  return (
    <StyledContainer>
      <StyledText>Użytkownicy</StyledText>
      <StyledText>Zamówienia</StyledText>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledText = styled.p`
  text-align: center;
  color: ${variables.primaryColor};
`;

export default withRouter(AdminPage);
