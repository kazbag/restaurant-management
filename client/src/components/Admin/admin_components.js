import React, { useEffect, useState } from "react";

export const UserList = ({
  users,
  performEdit,
  onEdit,
  performNew,
  onRemove,
}) => {
  return (
    <div className="col-12 col-md-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Użytkownicy</h3>
        </div>
        <div className="card-body">
          <ul className="list list-unstyled">
            <li
              className="list-item d-flex pb-2 pb-lg-4 mb-2 mb-lg-4 justify-content-center align-items-center"
              style={{ borderBottom: "1px solid #28a745" }}
            >
              <span className="text-success font-weight-bold mr-auto">
                Nowy użytkownik
              </span>
              <button
                className="btn btn-sm btn-success ml-auto"
                onClick={performNew}
              >
                Dodaj
              </button>
            </li>
            {users.map((user, index) => {
              return (
                <li
                  className="list-item d-flex mb-2 mb-lg-4 justify-content-center align-items-center"
                  key={index}
                >
                  <span>
                    <span className="text-bold">
                      #{index + 1} {user.name} -{" "}
                      <span className="text-primary">{user.role}</span>
                    </span>
                  </span>
                  <div className="d-flex ml-auto">
                    <button
                      data-id={user._id}
                      onClick={performEdit}
                      className="btn btn-sm btn-primary mr-2"
                    >
                      Edytuj
                    </button>
                    <button
                      data-id={user._id}
                      onClick={onRemove}
                      className="btn btn-sm btn-danger"
                    >
                      Usuń
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const UserEdit = ({
  header,
  onSubmit,
  onCancel,
  onChange,
  user,
  roles,
  buttonText,
}) => {
  return (
    <div
      className="card"
      style={{
        minWidth: "75vw",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "100000",
        boxShadow: "5px 5px rgba(0,0,0,0.3)",
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
              className="form-control"
              value={user.name}
              name="name"
              placeholder="Wpisz imię użytkownika"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Nazwisko</label>
            <input
              type="text"
              className="form-control"
              value={user.surname}
              name="surname"
              placeholder="Wpisz nazwisko użytkownika"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Login</label>
            <input
              type="text"
              className="form-control"
              value={user.login}
              name="login"
              placeholder="Wpisz nazwisko użytkownika"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Hasło</label>
            <input
              type="password"
              className="form-control"
              value={user.password}
              name="password"
              placeholder="Wpisz hasło użytkownika"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              name="email"
              placeholder="Wpisz e-mail użytkownika"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Miasto</label>
            <input
              type="city"
              className="form-control"
              value={user.city}
              name="city"
              placeholder="Wpisz miasto użytkownika"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Rola</label>
            <select
              className="form-control"
              defaultValue={user.role}
              onChange={onChange}
              name="role"
            >
              <option value="" disabled></option>
              {roles.map((role, index) => {
                return (
                  <option key={index} value={role}>
                    {role}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>
      <div className="card-footer d-flex">
        <button className="btn btn-primary mr-2" onClick={onSubmit}>
          {buttonText}
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Anuluj
        </button>
      </div>
    </div>
  );
};

export const OrderList = ({ orders }) => {
  const [orderType, setOrderType] = useState("pending");
  const [orderDate, setOrderDate] = useState("all");
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
          {orderType === "completed" && (
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
            {orders &&
              orderType === "pending" &&
              orders[orderType].map((item, index) => {
                return (
                  <li
                    className="list-item d-flex mb-2 align-items-center"
                    key={index}
                  >
                    <span className="mr-auto">
                      #{index + 1} {item.address}
                    </span>
                    <button
                      data-id={item._id}
                      type="button"
                      className="btn btn-sm btn-primary ml-auto"
                    >
                      Szczegóły
                    </button>
                  </li>
                );
              })}

            {orders &&
              orderType === "completed" &&
              orders[orderType].map((item, index) => {})}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const NewsModal = ({ onChange, onSubmit, onCancel }) => {
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
                placeholder="wpisz tytuł wiadomości"
                onChange={onChange}
                type="text"
                className="form-control"
                name="title"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="wpisz wiadomość"
                onChange={onChange}
                className="form-control"
                name="message"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="card-footer">
          <button className="btn btn-success mr-2" onClick={onSubmit}>
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

export const NewsList = ({ data, performNew, onRemove }) => {
  return (
    <div className="col-12 mb-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Lista newsów</h3>
        </div>
        <div className="card-body">
          <ul className="list list-unstyled">
            <li
              className="list-item d-flex align-items-center mb-4 pb-4"
              style={{ borderBottom: "1px solid black" }}
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
            {data.map((item, index) => {
              return (
                <li
                  key={index}
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
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
  return data.map((msg, index) => {
    return (
      <div className="col-12 col-md-6 col-lg-4 h-100" key={index}>
        <div className="card-deck">
          <div className="card mb-4 col m-4 p-4 card-stretch">
            <h3 className="card-title text-dark">{msg.title}</h3>
          </div>
        </div>
      </div>
    );
  });
};
