import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const CodesPage = () => {
  return (
    <StyledModal>
      <StyledText>Jesteś na stronie z kodami</StyledText>
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

export default withRouter(CodesPage);
