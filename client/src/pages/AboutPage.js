import React, { useContext } from "react";
import { withRouter } from "react-router";
import "./styles.css";
import Countup from "react-countup";
import {
  StyledContainerBox,
  StyledImageContainerBox,
  StyledTextContainerBox,
} from "../stylesComponents/StyledComponents";
import styled from "styled-components";
const AboutPage = () => {
  return (
    <StyledContainer>
      <StyledAside>
        <StyledText>
          Istniejemy na rynku od ponad 20 lat. Gotowanie jest naszą pasją.
          Obsługujemy różne wydarzenia (wesela, chrzciny, komunie, stypy,
          catering), jedzenie z dostawą na terenie Krakowa. W roku 2018
          zostaliśmy wyróżnieni nagrodą Złotej Miski
        </StyledText>
        <StyledCountersBox>
          <StyledInfo>Zadowolonych klientów</StyledInfo>
          <StyledInfo>Złożonych zamówień</StyledInfo>
          <StyledInfo>Przejechanych kilometrów</StyledInfo>
          <StyledInfo>Dni na rynku</StyledInfo>
          <Countup start={0} end={9213} duration={4.75} />
          <Countup start={0} end={15733} duration={4.75} />
          <Countup start={0} end={29214} duration={4.75} />
          <Countup start={0} end={932} duration={4.75} />
        </StyledCountersBox>
      </StyledAside>
      <StyledImageContainerBox>
        <StyledImage src="https://dziendobry.tvn.pl/media/cache/content/kucharz-i-obsluga-restauracji-jpg.jpg" />
      </StyledImageContainerBox>
    </StyledContainer>
  );
};
const StyledAside = styled.div`
  width: 50%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
`;
const StyledContainer = styled.div`
  display: flex;
`;

const StyledImage = styled.img``;

const StyledCountersBox = styled.div`
  box-sizing: border-box;
  border-radius: 0.6rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  text-align: center;
  grid-row-gap: 2rem;
  border: 1px solid #b0d332;
  padding: 1rem;
  box-shadow: 0 0 5px #b0d332;
  span {
    color: #b0d332;
  }
`;
const StyledText = styled.p`
  flex: 1;
  padding: 2rem;
  background-color: #d0d0d0;
  color: #000;
  margin-bottom: 1rem;
  box-shadow: 0 0 5px #b0d332;
  border-radius: 0.6rem;
`;
const StyledInfo = styled.h3`
  font-size: 1rem;
  color: #b0d332;
`;

export default withRouter(AboutPage);
