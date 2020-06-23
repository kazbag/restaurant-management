import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import styled, { css } from "styled-components";
import variables from "../variables/variables";
import { lastIndexOf } from "components/mocks/products";

const CodesPage = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const [discountCodes, setDiscountCodes] = useState([]);
  const [discountCode, eraseDiscountCode] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, setAuth } = useContext(AuthContext);



  const getDiscountCodes = () => {
    axios.get(`${serverUrl}/discountCodes`, setLoading(true))
      .then((response) => {
        setDiscountCodes(response.data);
      })
      .then(() => setLoading(false));
  };
  const deleteDiscountCode = (_id) => {
    axios.delete(`${serverUrl}/discountCodes/${_id}`)
      .then((response) => {
        eraseDiscountCode(response.data);
      })
  }

  useEffect(() => {
    getDiscountCodes();
  }, []);

  const mappedCodes = discountCodes.map((item, index) => {
    const { _id, code, startDate, expirationDate, value, percentage, reusable, used } = item;
    return (
      <StyledCodesListItem key={index}>
        <StyledCodesText>#{index}</StyledCodesText>
        <StyledCodesText>{item.code}</StyledCodesText>
        <StyledCodesText>{item.value}</StyledCodesText>
        <StyledCodesText>{item.percentage ? '%'  : 'zł'}</StyledCodesText>
        <StyledCodesText>{item.startDate}</StyledCodesText>
        <StyledCodesText>{item.expirationDate}</StyledCodesText>
        <StyledCodesText>{item.reusable ? 'Tak'  : 'Nie'}</StyledCodesText>
        <StyledCodesText>{item.used ? 'Tak'  : 'Nie'}</StyledCodesText>
        {/* #{index} KOD: {item.code} Wartość: {item.value} zł - {item.percentage} % */}
        <StyledButton save>Edytuj</StyledButton>
        <StyledButton remove onClick={() => deleteDiscountCode(_id)}>Usuń</StyledButton>
      </StyledCodesListItem>
    );
  });

  const create = discountCodes.map((item, index) => {
    const { _id, code, startDate, expirationDate, value, percentage, reusable, used } = item;
    return (


      
      <StyledCodesListItem key={index}>
        <StyledCodesText></StyledCodesText>
        <StyledCodesText>
          <StyledInput
            name = {code}
            type="text"
            placeholder="Kod"
          />
        </StyledCodesText>
        <StyledCodesText>
          <StyledInput
            name = {value}
            type="text"
            placeholder="wartość"
          />
        </StyledCodesText>
        <StyledCodesText>
          <StyledInput
              name = {percentage}
              type="text"
              placeholder="tu ma być select"
            />
        </StyledCodesText>
        <StyledCodesText>
          <StyledInputDate
                type="date"
                name= {startDate}
              />
        </StyledCodesText>
        <StyledCodesText>
          <StyledInputDate
                type="date"
                name= {expirationDate}
              />
        </StyledCodesText>
        <StyledCodesText>
        <StyledInputCheckbox
                type="checkbox"
                name= {reusable}
              />
        </StyledCodesText>
        <StyledCodesText></StyledCodesText>
        <StyledButton add>Dodaj</StyledButton>
      </StyledCodesListItem>
    );
  });



  return (
    <AuthContext.Consumer>
      {(context) => (
        <StyledContainer>
          {/* <StyledTitle>Codes Page</StyledTitle> */}
          <StyledCodesList>
            {loading ? (
              <StyledCodesListItem>Loading...</StyledCodesListItem>

            ) : (
              <StyledCodesListItem>
                <StyledCodesText title="true">ID</StyledCodesText>
                <StyledCodesText title="true">Kod</StyledCodesText>
                <StyledCodesText title="true">Wartość</StyledCodesText>
                <StyledCodesText title="true">Typ wartości</StyledCodesText>
                <StyledCodesText title="true">Ważny od</StyledCodesText>
                <StyledCodesText title="true">Ważny do</StyledCodesText>
                <StyledCodesText title="true">Wielorazowy</StyledCodesText>
                <StyledCodesText title="true">Użyty</StyledCodesText>
                <StyledCodesText title="true"></StyledCodesText>
                <StyledCodesText title="true"></StyledCodesText>
              </StyledCodesListItem>)}
            {create}
            {mappedCodes}

              

          </StyledCodesList>
        </StyledContainer>
      )}
    </AuthContext.Consumer>
  );

};

const StyledContainer = styled.div`
  max-width: 75%;
  margin: 0 auto;
  color: ${variables.whiteColor};
`;

const StyledTitle = styled.h3`
  text-align: center;
`;

const StyledCodesText = styled.span`
  ${({ title }) =>
    title &&
    css`
      font-size: 1.3rem;
      color: ${variables.secondaryColor};
    `}
`;

const StyledInput = styled.input`
  width: 80%;
  margin-bottom: 12px;
  padding: 5px 10px;
  display: block;
  border-radius: 6px;
  background-color: #272727;
  color: #fafafa;
  border-color: #b0d332;
`;

const StyledInputDate = styled.input`
  width: 70%;
  margin-bottom: 12px;
  padding: 3px 10px;
  display: block;
  border-radius: 6px;
  background-color: #272727;
  color: #fafafa;
  border-color: #b0d332;
`;

const StyledInputCheckbox = styled.input`
  width: 50%;
  margin-bottom: 12px;
  padding: 5px 10px;
  display: block;
  border-radius: 6px;
  background-color: #272727;
  color: #fafafa;
  border-color: #b0d332;
`;

const StyledCodesList = styled.ul`
  list-style: none;
  line-height: 1.7;
`;
const StyledCodesListItem = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
    ${({ add }) =>
    add &&
    css`
    background-color: ${variables.primaryColor};
    &:hover {
      border-color: ${variables.primaryColor};
      color: ${variables.whiteColor};
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


export default withRouter(CodesPage);
