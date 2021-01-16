import React from "react";

export const FormErrorMessage = ({ message }) => {
  return <small className="d-block text-danger mt-2">{message}</small>;
};
