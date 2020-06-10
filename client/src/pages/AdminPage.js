import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import styled, { css } from "styled-components";
import variables from "../variables/variables";
import axios from "axios";

const mockedUsers = [
  { name: "andrzej", role: "user" },
  { name: "kucharz22", role: "employee" },
  { name: "marekc", role: "admin" },
  { name: "zbyszek", role: "admin" },
  { name: "marcepan345", role: "user" },
  { name: "stachu99", role: "user" },
  { name: "marta_k", role: "user" },
  { name: "zbych31", role: "employee" },
  { name: "aniaaa", role: "employee" },
];

const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const userRoles = ["user", "employee", "admin"];

const getOrders = () => {
  axios
    .get(`${serverUrl}/orders`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: ${variables.whiteColor};
`;

const StyledBox = styled.div`
  padding: 2rem;
`;

const StyledText = styled.p`
  text-align: center;
  color: ${variables.primaryColor};
`;

const StyledUsersList = styled.ul`
  list-style: none;
`;
const StyledUsersListItem = styled.li`
  margin-top: 0.8rem;
  padding: 0.3rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: start;
`;

const StyledUserText = styled.span`
  ${({ title }) =>
    title &&
    css`
      font-size: 1.3rem;
      color: ${variables.secondaryColor};
    `}
`;

const StyledButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  text-align: center;
  border: 1px solid ${variables.blackColor};
  transition: 0.25s;
  &:hover {
    cursor: pointer;
    background: none;
  }
  ${({ remove }) =>
    remove &&
    css`
      background-color: red;
      color: ${variables.whiteColor};
      border-color: red;
      &:hover {
      }
    `}
  ${({ save }) =>
    save &&
    css`
      background-color: ${variables.primaryColor};
      &:hover {
        border-color: ${variables.primaryColor};
        color: ${variables.whiteColor};
      }
    `}
`;

const StyledSelect = styled.select``;
const StyledOption = styled.option``;

const options = userRoles.map((role, index) => {
  return (
    <StyledOption key={index} value={role} name={role}>
      {role}
    </StyledOption>
  );
});

const users = mockedUsers.map((user, index) => {
  return (
    <StyledUsersListItem key={index}>
      <StyledUserText>{user.name}</StyledUserText>
      <StyledSelect
        onChange={(e) => console.log(e.target.value)}
        value={user.role}
      >
        {options}
      </StyledSelect>
      <StyledButton remove>Usuń</StyledButton>
      <StyledButton save>Zapisz</StyledButton>
    </StyledUsersListItem>
  );
});

const AdminPage = () => {
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <StyledContainer>
      <StyledBox>
        <StyledText>Użytkownicy</StyledText>
        <StyledUsersList>
          <StyledUsersListItem>
            <StyledUserText title="true">Użytkownik</StyledUserText>
            <StyledUserText title="true">Rola</StyledUserText>
          </StyledUsersListItem>
          {users}
        </StyledUsersList>
      </StyledBox>
      <StyledBox>
        <StyledText>Zamówienia</StyledText>
      </StyledBox>
    </StyledContainer>
  );
};

export default withRouter(AdminPage);
