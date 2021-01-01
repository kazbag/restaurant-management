import React, { useEffect, useState } from "react";

export const UserList = ({ users, onEdit, onRemove, isModalVisible }) => {
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
                    onClick={onEdit}
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
      {isModalVisible && (
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
          eee
        </div>
      )}
    </div>
  );
};
