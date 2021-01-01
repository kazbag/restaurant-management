import React, { useEffect, useState } from "react";

export const ProductNewCard = ({ onClick }) => {
  return (
    <div className="card h-100">
      <div className="card-header">Dodaj nowy produkt</div>
      <div className="card-body">
        <p className="text-muted">
          Aby dodać nowy produkt do bazy danych, wybierz poniższy przycisk i
          wypełnij formularz.
        </p>
        <p className="text-muted">
          Produkt pojawi się tutaj automatycznie po dodaniu oraz zostanie
          natychmiastowo wyświetlony nowym klientom.
        </p>
      </div>
      <div className="card-footer">
        <button onClick={onClick} className="btn btn-success">
          Dodaj nowy produkt
        </button>
      </div>
    </div>
  );
};

export const ProductList = ({
  list,
  children,
  onEdit,
  performEdit,
  onRemove,
}) => {
  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-4 mb-4">{children}</div>
      {list.map((item, index) => {
        return (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-header d-flex flex-column">
                <h3 className="card-title">
                  {item.name || "brak nazwy produktu"}
                </h3>
                <span className="text-muted">
                  {item.description || "brak opisu produktu"}
                </span>
                <span className="text-success ">
                  {item.price || "brak ceny w "} zł
                </span>
              </div>
              <div className="card-body">
                <img
                  className="card-img-bottom"
                  src={item.photo}
                  alt={item.name}
                />
              </div>
              <div className="card-footer d-flex">
                <button
                  id={item._id}
                  onClick={performEdit}
                  className="btn btn-primary mr-2"
                >
                  Edytuj
                </button>
                <button
                  id={item._id}
                  onClick={onRemove}
                  className="btn btn-danger"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ProductNew = ({ onCancel, onChange, onSave, product }) => {
  return (
    <div
      className="card"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        minWidth: "75vw",
        transform: "translate(-50%, -50%)",
        zIndex: "100000",
        boxShadow: "5px 5px rgba(0,0,0,0.3)",
      }}
    >
      <div className="card-header">
        <h3 className="card-title">Dodaj nowy produkt</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-9 col-md-6 mx-auto">
            <form className="form">
              <div className="form-group">
                <label>Nazwa produktu</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="wprowadź nazwę produktu"
                  value={product.name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Opis produktu</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="wprowadź opis produktu"
                  value={product.description}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Cena produktu</label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  min="1"
                  max="1000"
                  step="0.1"
                  placeholder="wprowadź cenę produktu"
                  value={product.price}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label>Link do obrazka</label>
                <input
                  className="form-control"
                  type="text"
                  name="photo"
                  placeholder="wprowadź link do obrazka produktu"
                  value={product.photo}
                  onChange={onChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card-footer px-0">
        <div className="d-flex mx-auto col-12 col-sm-9 col-md-6">
          <button className="btn btn-success mr-2" onClick={onSave}>
            Dodaj produkt
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductEdit = ({ product, onSave, onCancel, onChange }) => {
  return (
    <div
      className="card"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        minWidth: "75vw",
        transform: "translate(-50%, -50%)",
        zIndex: "100000",
        boxShadow: "5px 5px rgba(0,0,0,0.3)",
      }}
    >
      <div className="card-header">
        <h3 className="card-title">Edytuj produkt - {product.name}</h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-9 col-md-6 mx-auto">
            <form className="form">
              <div className="form-group">
                <label>Nazwa produktu</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="wprowadź nazwę produktu"
                  onChange={onChange}
                  value={product.name}
                />
              </div>
              <div className="form-group">
                <label>Opis produktu</label>
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="wprowadź opis produktu"
                  onChange={onChange}
                  value={product.description}
                />
              </div>
              <div className="form-group">
                <label>Cena produktu</label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  min="1"
                  max="1000"
                  step="0.1"
                  placeholder="wprowadź cenę produktu"
                  onChange={onChange}
                  value={product.price}
                />
              </div>
              <div className="form-group">
                <label>Link do obrazka</label>
                <input
                  className="form-control"
                  type="text"
                  name="photo"
                  placeholder="wprowadź link do obrazka produktu"
                  onChange={onChange}
                  value={product.photo}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card-footer px-0">
        <div className="d-flex mx-auto col-12 col-sm-9 col-md-6">
          <button className="btn btn-primary mr-2" onClick={onSave}>
            Zapisz produkt
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};
