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
