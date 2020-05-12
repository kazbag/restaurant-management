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
