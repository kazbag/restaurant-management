import React, { useContext } from "react";
import { withRouter } from "react-router";
import "./styles.css";
import Countup from "react-countup";
import {
  StyledContainerBox,
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

const StyledImageContainerBox = styled.div`
  width: 35%;
  z-index: 1000;
  margin-left: 10rem;
  position: relative;
  &::after {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(12.5%, 12.5%);
    width: 100%;
    height: 100%;
    border: 1px solid #b0d332;
    border-radius: 1rem;
    content: "";
    box-shadow: 0 0 5px #b0d332;
  }
`;
const StyledAside = styled.div`
  width: 50%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
`;
const StyledContainer = styled.div`
  display: flex;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  transform: rotate(4deg);
`;

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
