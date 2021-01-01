import React, { useEffect, useState } from "react";

export const UserList = ({
  users,
  performEdit,
  onEdit,
  onRemove,
  isModalVisible,
}) => {
  return (
    <div className="col-12 col-md-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Użytkownicy</h3>
        </div>
        <div className="card-body">
          {users.map((user, index) => {
            return (
              <li className="list-item d-flex mb-2 mb-lg-4" key={index}>
                <span>
                  <span className="text-bold">
                    {user.name} -{" "}
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
        </div>
      </div>
    </div>
  );
};

export const UserEdit = ({ onSubmit, onCancel, onChange, user, roles }) => {
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
        <h3 className="card-title">Edycja użytkownika</h3>
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
            <label>Miasto</label>
            <select className="form-control" value={user.role}>
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
          Dodaj użytkownika
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Anuluj
        </button>
      </div>
    </div>
  );
};
