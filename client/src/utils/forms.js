import React from 'react';
import PropTypes from 'prop-types';

export const FormErrorMessage = ({ message }) => <small className="d-block text-danger mt-2">{message}</small>;
FormErrorMessage.propTypes = { message: PropTypes.string.isRequired };
