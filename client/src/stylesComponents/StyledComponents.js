import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  // minus nav height and padding-bottom & top
  height: calc(100vh - 45px - 48px);
  display: grid;
  grid-gap: 4px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 4fr 1fr 1fr;
  grid-template-areas: "a a b b" "a a b b" "c c d d";
`;
export const StyledBox = styled.div`
  background: #e5e5e5;
  &:nth-of-type(1) {
    grid-area: a;
  }
  &:nth-of-type(2) {
    grid-area: b;
  }
  &:nth-of-type(3) {
    grid-area: c;
  }
  &:nth-of-type(4) {
    grid-area: d;
  }
`;

export const StyledHeader = styled.h3`
  background-color: #b0d332;
  padding: 12px;
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-type: none;
`;

export const StyledListItem = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  margin: 8px;
`;
export const StyledListItemLink = styled.a`
  color: #000000;
  width: auto;
  &:hover {
    color: #f0f0f0;
    background: #000000;
  }
`;

export const StyledDescription = styled.span``;
export const StyledSpan = styled.span``;

export const StyledListItemHeader = styled.div`
  border: 1px solid #000000;
  display: flex;
  margin-left: auto;
  margin-right: 16px;
`;

export const StyledButton = styled.button`
  display: flex;
  padding: 5px 15px;
  outline: none;
  background: none;
  color: #000000;
  border: none;
  transition: 0.25s ease-in-out;
  &:hover {
    background: #000000;
    cursor: pointer;
    color: #ffffff;
  }
`;
export const StyledContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const StyledImageContainerBox = styled.div`
  width: 50%;
  padding-left: 5%;
  padding-right: 7%;
`;
export const StyledTextContainerBox = styled.div`
  font-size: 25px;
  width: 50%;
`;

export const StyledGalleryImagesContainerBox = styled.div`
  width: 90%;
  hright: 80%;
  margin-left: 6%;
  margin-top: 2%;
`;

export const StyledGalleryImage = styled.img`
  width: 10%;
  hright: 10%;
  padding: 1%;
  &:hover {
    cursor: pointer;
    transform: scale(2.5);
`;

export const StyledForm = styled.form`
  margin: 0 auto;
  max-width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const StyledH3 = styled.h3`
  color: white;
  text-align: center;
  margin-bottom: 24px;
`;
export const StyledInput = styled.input`
  margin-bottom: 12px;
  padding: 5px 15px;
  display: block;
  border-radius: 6px;
  background-color: #272727;
  color: #fafafa;
  border-color: #b0d332;
`;
export const StyledFormButton = styled.button`
  border-color: #b0d332;
  background-color: #272727;
  color: #fafafa;
  border-radius: 6px;
  margin-right: 5px;
  padding: 5px 10px;
  display: inline;
`;
