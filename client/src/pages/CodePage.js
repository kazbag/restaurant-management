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
  const [message, setMessage] = useState('');
  const [goodMessage, setGoodMessage] = useState('');
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
      setTimeout(() => {
        getDiscountCodes();
      }, 50);
  }

  const goToDeleteDiscountCode = (_id)=>{
    clearMessages();
    setGoodMessage("Usunięto Kod")
    deleteDiscountCode(_id)
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

  const goToAddDiscountCode = () =>{
    clearMessages();
    if(!codeText){
      setMessage("Musisz wypełnić pole z kodem");
    }else if(!codeValue){
      setMessage("Musisz wypełnić pole z wartością");
    }else if(codePercentage && codeValue < 0.01){
      setMessage("Kod rabatowy musi być większy niż 1%");
    }else if(codePercentage && codeValue > 1){
      setMessage("zniżka nie może być większa niż 100%!");
    }else if(codeValue<0){
      setMessage("Zniżka nie może być ujemna")
    }else if(codeValue == 0){
      setMessage("Zniżka nie może wynosić 0")
    }else if((isNaN(codeValue))){
      setMessage("Wartość musi być liczbą")
    }else if(codeStartDate > codeEndDate){
      setMessage("Koniec ważności kodu nie może wypadać przed terminem początku ważności kodu")
    }else if(codeStartDate === codeEndDate){
      setMessage("Krańcowe terminy ważności nie mogą być identyczne")
    }else{
      setGoodMessage("Dodano kod rabatowy")
      addDiscountCode();
      }
  }
  

  const addDiscountCode = () => {
    axios
      .post(`${serverUrl}/discountCodes`, buildCode)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      setTimeout(() => {
        getDiscountCodes();
      }, 50);  
    };


  // useEffect(() => {
  //   addDiscountCode();
  // }, []);

  const setCodeValueTranslate = (x) =>{
    if(codePercentage){
      x = x / 100
      setCodeValue(x)
    }else{
      setCodeValue(x)
    }
  }

  const clearMessages = () =>{setGoodMessage(''); setMessage('')}

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
        <StyledCodesText>{item.percentage ? item.value * 100 : item.value}</StyledCodesText>
        <StyledCodesText>{item.percentage ? '%'  : 'zł'}</StyledCodesText>
        <StyledCodesText>{item.startDate}</StyledCodesText>
        <StyledCodesText>{item.expirationDate}</StyledCodesText>
        <StyledCodesText>{item.reusable ? 'Tak'  : 'Nie'}</StyledCodesText>
        <StyledCodesText>{item.used ? 'Tak'  : 'Nie'}</StyledCodesText>
        <StyledButton remove onClick={() => goToDeleteDiscountCode(_id)}>Usuń</StyledButton>
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
            onChange={e => setCodeValueTranslate(e.target.value)}
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
                onChange={e => setCodeReusable(e.target.checked)}
              />
        </StyledCodesText>
        <StyledCodesText></StyledCodesText>
        <StyledButton add onClick={goToAddDiscountCode}>Dodaj</StyledButton>
      </StyledCodesListItem>
      <StyledCodesListAlert>
        <StyledButton issueAlert onClick={clearMessages}>
              {message}
        </StyledButton>
      </StyledCodesListAlert>
      <StyledCodesListAlert>
        <StyledButton goodAlert onClick={clearMessages}>
              {goodMessage}
        </StyledButton>
      </StyledCodesListAlert>
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

const StyledSelect = styled.select`
width: 80%;
margin-bottom: 12px;
justify-self: center;
padding: 5px 10px;
display: block;
border-radius: 6px;
background-color: #272727;
color: #fafafa;
border-color: #b0d332;
`;

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
  justify-self: center;
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
  justify-self: center;
  display: block;
  border-radius: 6px;
  background-color: #272727;
  color: #fafafa;
  border-color: #b0d332;
`;

const StyledInputCheckbox = styled.input`
  width: 50%;
  justify-self: center;
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
const StyledCodesListAlert = styled.li`
  display: grid;
  align-items: center;
  text-align:center;
  grid-template-columns: 1fr;
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
    ${({ goodAlert }) =>
    goodAlert &&
    css`
      box-shadow:inset 0px 39px 0px -24px #3dc21b;
      width:50%;
      justify-self: center;
      background-color:#44c767;
      border-radius:4px;
      border:1px solid #18ab29;
      display:inline-block;
      color:#ffffff;
      font-family:Arial;
      font-size:15px;
      padding:6px 15px;
      text-decoration:none;
      text-shadow:0px 1px 0px #2f6627;
        &:empty {
        display: none;
      }
      &:hover {
        background-color:#44c767;
      }
    `}
    ${({ issueAlert }) =>
    issueAlert &&
    css`
      box-shadow:inset 0px 39px 0px -24px #e67a73;
      width:50%;
      justify-self: center;
      background-color:#e4685d;
      border-radius:4px;
      border:1px solid #ffffff;
      display:inline-block;
      color:#ffffff;
      font-family:Arial;
      font-size:15px;
      padding:6px 15px;
      text-decoration:none;
      text-shadow:0px 1px 0px #b23e35;
        &:empty {
        display: none;
      }
      &:hover {
        background-color:#e4685d;
      }
    `}
`;


export default withRouter(CodesPage);
