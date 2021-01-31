import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { useFields } from '../utils/hooks';
import { handleRegister, handleLogin } from '../utils/form_methods';
import { FormErrorMessage } from '../utils/forms';

const AccountForm = ({
  handleChange, onRegister, onLogin,
}) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  return (
    <div className="col-12 col-md-9 col-lg-6 mx-auto">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            {window.location.pathname === '/login' ? 'Logowanie' : 'Rejestracja'}
          </h3>
        </div>
        <div className="card-body">
          <form className="form">
            <div className="row">

              <div className="form-group col-12">
                <label>Login</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.login ? 'border border-danger' : ''
                  }`}
                  type="text"
                  placeholder="login"
                  name="login"
                  onChange={handleChange}
                />
                {errors.login && <FormErrorMessage message="Login jest wymagany" />}
                {!errors.login && (
                <small className="form-text text-muted">Wprowadź swój login</small>
                )}
              </div>
              <div className="form-group col-12">
                <label>Hasło</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.password ? 'border border-danger' : ''
                  }`}
                  type="password"
                  placeholder="hasło"
                  name="password"
                  onChange={handleChange}
                />
                {errors.password && (
                <FormErrorMessage message="Hasło jest wymagane" />
                )}
                {!errors.password && (
                <small className="form-text text-muted">Wprowadź hasło</small>
                )}
              </div>

              {window.location.pathname === '/register' && (
              <>
                <div className="form-group col-12 col-md-6">
                  <label>Imię</label>
                  <input
                    type="text"
                    placeholder="imię"
                    name="name"
                    onChange={handleChange}
                    ref={register({ required: true })}
                    className={`form-control ${
                      errors.name ? 'border border-danger' : ''
                    }`}
                  />
                  {errors.name && <FormErrorMessage message="Imię jest wymagane" />}
                  {!errors.name && (
                  <small className="form-text text-muted">Wprowadź imię</small>
                  )}
                </div>

                <div className="form-group col-12 col-md-6">
                  <label>Nazwisko</label>
                  <input
                    ref={register({ required: true })}
                    className={`form-control ${
                      errors.surname ? 'border border-danger' : ''
                    }`}
                    type="text"
                    placeholder="nazwisko"
                    name="surname"
                    onChange={handleChange}
                  />
                  {errors.surname && (
                  <FormErrorMessage message="Nazwisko jest wymagane" />
                  )}
                  {!errors.surname && (
                  <small className="form-text text-muted">
                    Wprowadź swoje nazwisko
                  </small>
                  )}
                </div>

                <div className="form-group col-12 col-md-6">
                  <label>E-mail</label>
                  <input
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                    className={`form-control ${
                      errors.email ? 'border border-danger' : ''
                    }`}
                    type="text"
                    placeholder="jankowalski@gmail.com"
                    name="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                  <FormErrorMessage message="E-mail jest wymagany" />
                  )}
                  {!errors.email && (
                  <small className="form-text text-muted">Wprowadź e-mail</small>
                  )}
                </div>

                <div className="form-group col-12 col-md-6">
                  <label>Adres</label>
                  <input
                    ref={register({ required: true })}
                    className={`form-control ${
                      errors.address ? 'border border-danger' : ''
                    }`}
                    type="text"
                    placeholder="ul. Wielicka 23/2"
                    name="address"
                    onChange={handleChange}
                  />
                  {errors.address && (
                  <FormErrorMessage message="Adres jest wymagany" />
                  )}
                  {!errors.address && (
                  <small className="form-text text-muted">Wprowadź adres</small>
                  )}
                </div>

                <div className="form-group col-12 col-md-6">
                  <label>Miasto</label>
                  <input
                    ref={register({ required: true })}
                    className={`form-control ${
                      errors.city ? 'border border-danger' : ''
                    }`}
                    type="text"
                    placeholder="Kraków"
                    name="city"
                    onChange={handleChange}
                  />
                  {errors.city && (
                  <FormErrorMessage message="Miasto jest wymagane" />
                  )}
                  {!errors.city && (
                  <small className="form-text text-muted">Wprowadź miasto</small>
                  )}
                </div>
                <div className="form-group col-12 col-md-6">
                  <label>Telefon</label>
                  <input
                    ref={register({
                      required: true, minLength: 6, maxLength: 12, valueAsNumber: true,
                    })}
                    className={`form-control ${
                      errors.phone ? 'border border-danger' : ''
                    }`}
                    type="text"
                    placeholder="Twój numer telefonu"
                    name="phone"
                    onChange={handleChange}
                  />
                  {errors.phone && (
                  <FormErrorMessage message="Numer telefonu jest wymagany" />
                  )}
                  {!errors.phone && (
                  <small className="form-text text-muted">Wprowadź numer telefonu</small>
                  )}
                </div>
              </>
              )}
            </div>
          </form>

        </div>
        <div className="card-footer">
          {window.location.pathname === '/login' && (
          <div className="form-group col-12 mt-4">
            <button
              type="button"
              className="btn btn-primary px-5"
              onClick={handleSubmit(onLogin)}
            >
              Zaloguj się
            </button>
          </div>
          )}
          {window.location.pathname === '/register' && (
          <div className="form-group col-12 mt-4">
            <button
              type="button"
              className="btn btn-primary px-5"
              onClick={handleSubmit(onRegister)}
            >
              Zarejestruj się
            </button>
          </div>
          )}
        </div>
      </div>
    </div>

  );
};

AccountForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,

};

// TODO: handle location
// eslint-disable-next-line no-unused-vars
const LoginPage = ({ history, location }) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const [isRegistered, setIsRegistered] = useState(false);
  const [fields, setField] = useFields({});

  useEffect(() => {
    if (isRegistered) {
      history.push('/login');
    }
  }, [isRegistered]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  return (
    <div className="d-flex flex-column">
      <AccountForm
        handleChange={setField}
        onLogin={() => handleLogin(serverUrl, fields, () => setAuth())}
        onRegister={() => handleRegister(serverUrl, fields, () => setIsRegistered(true))}
        fields={fields}
      />
    </div>
  );
};

LoginPage.propTypes = {
  history: PropTypes.any,
  location: PropTypes.any,
};

export default withRouter(LoginPage);
