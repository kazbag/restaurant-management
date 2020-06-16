import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import styled, { css } from "styled-components";
import variables from "../variables/variables";

const CodesPage = () => {

    const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
    const [discountCodes, setDiscountCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, setAuth } = useContext(AuthContext);



    const getDiscountCodes = () => {
        axios.get(`${serverUrl}/discountCodes`, setLoading(true))
            .then((response) => {
                setDiscountCodes(response.data);
            })
            .then(() => setLoading(false));
    };
    useEffect(() => {
        getDiscountCodes();
    }, []);

    const mappedCodes = discountCodes.map((code, index) => {
        return (
            <StyledCodesListItem key={index}>
                #{index} {code.code} - {code.value} zł - {code.percentage} %
                <StyledButton save>Edytuj</StyledButton>{" "}
                <StyledButton remove>Usuń</StyledButton>
            </StyledCodesListItem>
        );
    });



    return (
        <AuthContext.Consumer>
            {(context) => (
                <StyledContainer>
                    <StyledTitle>Codes Page</StyledTitle>
                    <StyledCodesList>
                        {loading ? (
                            <StyledCodesListItem>Loading...</StyledCodesListItem>
                        ) : (
                                mappedCodes

                            )}

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

const StyledCodesList = styled.ul`
  list-style: none;
  line-height: 1.7;
`;
const StyledCodesListItem = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr 1fr;
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


export default withRouter(CodesPage);
