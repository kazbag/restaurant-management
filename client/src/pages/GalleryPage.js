import React, { useContext } from "react";
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
  return (
    <StyledContainerBox>
        <StyledGalleryImagesContainerBox>

        <StyledGalleryImage src="https://i.picsum.photos/id/1/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/2/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/3/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/4/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/5/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/6/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/7/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/8/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/9/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/10/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/11/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/12/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/13/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/14/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/15/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/16/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/17/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/18/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/19/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/20/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/21/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/22/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/23/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/24/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/25/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/26/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/27/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/28/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/29/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/30/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/31/500/400.jpg"/>
        <StyledGalleryImage src="https://i.picsum.photos/id/32/500/400.jpg"/>

        </StyledGalleryImagesContainerBox> 

    </StyledContainerBox>
  );
};
export default withRouter(GalleryPage);
