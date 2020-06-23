import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import styled, { css } from "styled-components";
import variables from "../variables/variables";
import { lastIndexOf } from "components/mocks/products";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";


const CodesPage = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const [discountCodes, setDiscountCodes] = useState([]);
  const [discountCode, eraseDiscountCode] = useState([]);
  const [codeText, setCodeText] = useState('');
  const [codeValue, setCodeValue] = useState(0);
  const [codeStartDate, setCodeStartDate] = useState(Date.now());
  const [codeEndDate, setCodeEndDate] = useState(Date.now());
  const [codePercentage, setCodePercentage] = useState(true);
  const [codeReusable, setCodeReusable] = useState(false);
  const [codeUsed, setCodeUsed] = useState(false);
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

  const buildCode = {
    code: codeText,
    startDate: codeStartDate,
    expirationDate: codeEndDate,
    value: codeValue,
    percentage: codePercentage,
    reusable: codeReusable,
    used: codeUsed,
  };

  const addDiscountCode = () => {
    axios
      .post(`${serverUrl}/discountCodes`, buildCode)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    addDiscountCode();
  }, []);

  const setCodeReusableTranslate = (e) =>{
    if(e == "on"){
      setCodeReusable(true)
    }else{
      setCodeReusable(true)
    }
    
  
  }

  const setCodePercentageTranslate = (e) =>{
      if (e == '%'){
      setCodePercentage(true)
      }else{
        setCodePercentage(false)
      }
  }
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
        <StyledButton remove onClick={() => deleteDiscountCode(_id)}>Usuń</StyledButton>
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
              </StyledCodesListItem>)}
              <StyledCodesListItem>
        <StyledCodesText></StyledCodesText>
        <StyledCodesText>
          <StyledInput
            type="text"
            placeholder="Kod"
            onChange={e => setCodeText(e.target.value)}
          />
        </StyledCodesText>
        <StyledCodesText>
          <StyledInput
            type="text"
            placeholder="wartość"
            onChange={e => setCodeValue(e.target.value)}
          />
        </StyledCodesText>
        <StyledCodesText>
            <StyledSelect
            onChange={(e) => setCodePercentageTranslate(e.target.value)}
          >
            <StyledOption>%</StyledOption>
            <StyledOption>zł</StyledOption>
          </StyledSelect>
        </StyledCodesText>
        <StyledCodesText>
          <StyledInputDate
                type="date"
                onChange={e => setCodeStartDate(e.target.value)}
              />
        </StyledCodesText>
        <StyledCodesText>
          <StyledInputDate
                type="date"
                onChange={e => setCodeEndDate(e.target.value)}
              />
        </StyledCodesText>
        <StyledCodesText>
        <StyledInputCheckbox
                type="checkbox"
                onChange={e => setCodeReusableTranslate(e.target.value)}
              />
        </StyledCodesText>
        <StyledCodesText></StyledCodesText>
        <StyledButton add onClick={addDiscountCode}>Dodaj</StyledButton>
      </StyledCodesListItem>
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

const StyledSelect = styled.select``;
const StyledOption = styled.option``;

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
