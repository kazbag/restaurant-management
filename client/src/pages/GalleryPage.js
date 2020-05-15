import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import "./styles.css";
import {
  StyledContainerBox,
  StyledGalleryImagesContainerBox,
  StyledGalleryImage,
  StyledImageContainerBox,
  StyledTextContainerBox,
} from "../stylesComponents/StyledComponents";

const GalleryPage = () => {
  const images = new Array(32)
    .fill("https://i.picsum.photos/id/unique_id/500/400.jpg")
    .map((item, index) =>
      item.replace("unique_id", Math.floor(index * Math.random() * 10))
    );

  const mappedImages = images.map((item) => (
    <StyledGalleryImage src={item} key={(Math.random() * 10000).toString(36)} />
  ));
  return (
    <StyledContainerBox>
      <StyledGalleryImagesContainerBox>
        {mappedImages}
      </StyledGalleryImagesContainerBox>
    </StyledContainerBox>
  );
};
export default withRouter(GalleryPage);
