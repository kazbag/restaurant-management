import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { FormErrorMessage } from '../../utils/forms';

export const UserList = ({
  users, performEdit, performNew, onRemove,
}) => (
  <div className="col-12 col-md-6">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Użytkownicy</h3>
      </div>
      <div className="card-body">
        <ul className="list list-unstyled">
          <li
            className="list-item d-flex pb-2 pb-lg-4 mb-2 mb-lg-4 justify-content-center align-items-center"
            style={{ borderBottom: '1px solid #28a745' }}
          >
            <span className="text-success font-weight-bold mr-auto">
              Nowy użytkownik
            </span>
            <button
              type="button"
              className="btn btn-sm btn-success ml-auto"
              onClick={performNew}
            >
              Dodaj
            </button>
          </li>
          {users.map((user, index) => (
            <li
              className="list-item d-flex mb-2 mb-lg-4 justify-content-center align-items-center"
              key={user.name}
            >
              <span>
                <span className="text-bold">
                  #
                  {index + 1}
                  {' '}
                  {user.name}
                  {' '}
                  -
                  {' '}
                  <span className="text-primary">{user.role}</span>
                </span>
              </span>
              <div className="d-flex ml-auto">
                <button
                  type="button"
                  data-id={user._id}
                  onClick={performEdit}
                  className="btn btn-sm btn-primary mr-2"
                >
                  Edytuj
                </button>
                <button
                  type="button"
                  data-id={user._id}
                  onClick={onRemove}
                  className="btn btn-sm btn-danger"
                >
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

UserList.propTypes = {
  users: PropTypes.object.isRequired,
  performEdit: PropTypes.func.isRequired,
  performNew: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

// TODO: check that don't we have to unhash user password first
// TODO: to discuss, should we at all have access to user password here?
export const UserEdit = ({
  header,
  onSubmit,
  onCancel,
  onChange,
  user,
  roles,
  buttonText,
}) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook

  return (
    <div
      className="card"
      style={{
        minWidth: '75vw',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100000',
        boxShadow: '5px 5px rgba(0,0,0,0.3)',
      }}
    >
      <div className="card-header">
        <h3 className="card-title">{header}</h3>
      </div>
      <div className="card-body">
        <form className="form">
          <div className="form-group">
            <label>Imię</label>
            <input
              type="text"
              value={user.name}
              name="name"
              placeholder="Wpisz imię użytkownika"
              onChange={onChange}
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
          <div className="form-group">
            <label>Nazwisko</label>
            <input
              type="text"
              ref={register({ required: true })}
              className={`form-control ${
                errors.surname ? 'border border-danger' : ''
              }`}
              value={user.surname}
              name="surname"
              placeholder="Wpisz nazwisko użytkownika"
              onChange={onChange}
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
          <div className="form-group">
            <label>Login</label>
            <input
              ref={register({ required: true })}
              className={`form-control ${
                errors.login ? 'border border-danger' : ''
              }`}
              type="text"
              value={user.login}
              name="login"
              placeholder="Wpisz nazwisko użytkownika"
              onChange={onChange}
            />
            {errors.login && <FormErrorMessage message="Login jest wymagany" />}
            {!errors.login && (
              <small className="form-text text-muted">
                Wprowadź swój login
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Hasło</label>
            <input
              ref={register({ required: true, minLength: 4 })}
              className={`form-control ${
                errors.password ? 'border border-danger' : ''
              }`}
              type="password"
              value={user.password}
              name="password"
              placeholder="Wpisz hasło użytkownika"
              onChange={onChange}
            />
            {errors.password && (
              <FormErrorMessage message="Hasło jest wymagane" />
            )}
            {!errors.password && (
              <small className="form-text text-muted">Wprowadź hasło</small>
            )}
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              className={`form-control ${
                errors.email ? 'border border-danger' : ''
              }`}
              type="email"
              value={user.email}
              name="email"
              placeholder="Wpisz e-mail użytkownika"
              onChange={onChange}
            />
            {errors.email && (
              <FormErrorMessage message="E-mail jest wymagany" />
            )}
            {!errors.email && (
              <small className="form-text text-muted">Wprowadź e-mail</small>
            )}
          </div>
          <div className="form-group">
            <label>Miasto</label>
            <input
              ref={register({ required: true })}
              className={`form-control ${
                errors.city ? 'border border-danger' : ''
              }`}
              type="city"
              value={user.city}
              name="city"
              placeholder="Wpisz miasto użytkownika"
              onChange={onChange}
            />
            {errors.city && <FormErrorMessage message="Miasto jest wymagane" />}
            {!errors.city && (
              <small className="form-text text-muted">Wprowadź miasto</small>
            )}
          </div>
          <div className="form-group">
            <label>Rola</label>
            <select
              className="form-control"
              defaultValue={user.role}
              onChange={onChange}
              name="role"
            >
              <option value="" disabled />
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <div className="card-footer d-flex">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={handleSubmit(onSubmit)}
        >
          {buttonText}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Anuluj
        </button>
      </div>
    </div>
  );
};

UserEdit.propTypes = {
  header: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  roles: PropTypes.any,
  buttonText: PropTypes.string.isRequired,
};

export const OrderList = ({ orders }) => {
  const [orderType, setOrderType] = useState('pending');
  const [orderDate, setOrderDate] = useState('all');
  // TODO: complete data sort
  // TODO: handle showDetails
  return (
    <div className="col-12 col-md-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Zamówienia</h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Wybierz typ zamówień</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              name="type"
              className="form-control"
            >
              <option value="pending">Aktualne</option>
              <option value="completed">Zakończone</option>
            </select>
          </div>
          {orderType === 'completed' && (
            <div className="form-group">
              <label>Okres</label>
              <select
                name="date"
                className="form-control"
                onChange={(e) => setOrderDate(e.target.value)}
                value={orderDate}
              >
                <option value="day">Dzisiejsze</option>
                <option value="week">Tygodniowe</option>
                <option value="month">Miesięczne</option>
                <option value="year">Roczne</option>
                <option value="all">Wszystkie</option>
              </select>
            </div>
          )}
          <ul className="list list-unstyled">
            {orders
              && orderType === 'pending'
              && orders[orderType].map((item, index) => (
                <li
                  className="list-item d-flex mb-2 align-items-center"
                  key={item._id}
                >
                  <span className="mr-auto">
                    #
                    {index + 1}
                    {' '}
                    {item.address}
                  </span>
                  <button
                    data-id={item._id}
                    type="button"
                    className="btn btn-sm btn-primary ml-auto"
                  >
                    Szczegóły
                  </button>
                </li>
              ))}
            {/* TODO: handle it */}
            {/* {orders
              && orderType === 'completed'
              && orders[orderType].map((item, index) => {})} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
};

export const NewsModal = ({ onChange, onSubmit, onCancel }) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook

  return (
    <div className="col-12 mb-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Dodaj news</h3>
        </div>
        <div className="card-body">
          <form className="form">
            <div className="form-group">
              <label>Tytuł</label>
              <input
                ref={register({ required: true })}
                className={`form-control ${
                  errors.title ? 'border border-danger' : ''
                }`}
                placeholder="wpisz tytuł wiadomości"
                onChange={onChange}
                type="text"
                name="title"
              />
              {errors.title && (
                <FormErrorMessage message="Tytuł jest wymagany" />
              )}
              {!errors.title && (
                <small className="form-text text-muted">Wprowadź tytuł</small>
              )}
            </div>
            <div className="form-group">
              <textarea
                ref={register({ required: true })}
                className={`form-control ${
                  errors.message ? 'border border-danger' : ''
                }`}
                placeholder="wpisz wiadomość"
                onChange={onChange}
                name="message"
              />
              {errors.message && (
                <FormErrorMessage message="Treść newsa jest wymagana" />
              )}
              {!errors.message && (
                <small className="form-text text-muted">
                  Wprowadź treść newsa
                </small>
              )}
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-success mr-2"
            onClick={handleSubmit(onSubmit)}
          >
            Dodaj
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

NewsModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export const NewsList = ({ data, performNew, onRemove }) => (
  <div className="col-12 mb-4">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Lista newsów</h3>
      </div>
      <div className="card-body">
        <ul className="list list-unstyled">
          <li
            className="list-item d-flex align-items-center mb-4 pb-4"
            style={{ borderBottom: '1px solid black' }}
          >
            <span className="text-success font-weight-bold">Dodaj news</span>
            <button
              type="button"
              className="btn btn-sm btn-success ml-auto"
              onClick={performNew}
            >
              Dodaj
            </button>
          </li>
          {data.map((item) => (
            <li
              key={item._id}
              className="list-item d-flex mb-2 align-items-center"
            >
              <span>{item.title}</span>
              <button
                data-id={item._id}
                type="button"
                className="btn btn-sm btn-danger ml-auto"
                onClick={onRemove}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

NewsList.propTypes = {
  data: PropTypes.array.isRequired,
  performNew: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
