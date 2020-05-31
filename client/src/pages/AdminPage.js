import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const AdminPage = () => {
  return (
    <StyledModal>
      <StyledText>Jesteś zalogowany jako administrator</StyledText>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.p`
  color: red;
`;

export default withRouter(AdminPage);
