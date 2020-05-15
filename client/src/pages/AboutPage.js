import React, { useContext } from "react";
import { withRouter } from "react-router";
import "./styles.css";
import {
  StyledContainerBox,
  StyledImageContainerBox,
  StyledTextContainerBox,
} from "../stylesComponents/StyledComponents";

const AboutPage = () => {
  return (
    <StyledContainerBox>
      <StyledTextContainerBox>
        <p>
          Istniejemy na rynku od ponad 20 lat. Gotowanie jest naszą pasją.
          Obsługujemy różne wydarzenia (wesela, chrzciny, komunie, stypy,
          catering), jedzenie z dostawą na terenie Krakowa. W roku 2018
          zostaliśmy wyróżnieni nagrodą Złotej Miski
        </p>
      </StyledTextContainerBox>
      <StyledImageContainerBox>
        <img src="https://dziendobry.tvn.pl/media/cache/content/kucharz-i-obsluga-restauracji-jpg.jpg" />
      </StyledImageContainerBox>
    </StyledContainerBox>
  );
};
export default withRouter(AboutPage);
