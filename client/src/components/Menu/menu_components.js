import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "../../utils/forms";

export const ProductNewCard = ({ onClick }) => {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h3 className="card-title">Dodaj nowy produkt</h3>
      </div>
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
          Dodaj
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
  const { register, handleSubmit, errors } = useForm(); // initialize the hook

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
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.name ? "border border-danger" : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="wprowadź nazwę produktu"
                  value={product.name}
                  onChange={onChange}
                />
                {errors.name && (
                  <FormErrorMessage message="Nazwa produktu jest wymagana" />
                )}
                {!errors.name && (
                  <small className="form-text text-muted">
                    Wprowadź nazwę produktu
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Opis produktu</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.description ? "border border-danger" : ""
                  }`}
                  type="text"
                  name="description"
                  placeholder="wprowadź opis produktu"
                  value={product.description}
                  onChange={onChange}
                />
                {errors.description && (
                  <FormErrorMessage message="Opis produktu jest wymagany" />
                )}
                {!errors.description && (
                  <small className="form-text text-muted">
                    Wprowadź opis produktu
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Cena produktu</label>
                <input
                  ref={register({
                    required: true,
                    valueAsNumber: true,
                    min: 1,
                    max: 1000,
                  })}
                  className={`form-control ${
                    errors.price ? "border border-danger" : ""
                  }`}
                  type="number"
                  name="price"
                  min="1"
                  max="1000"
                  step="0.1"
                  placeholder="wprowadź cenę produktu"
                  value={product.price}
                  onChange={onChange}
                />
                {errors.price && (
                  <FormErrorMessage message="Wprowadź poprawną cenę (od 1 do 1000 zł)" />
                )}
                {!errors.price && (
                  <small className="form-text text-muted">
                    Wprowadź cenę produktu
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Link do obrazka</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.photo ? "border border-danger" : ""
                  }`}
                  type="text"
                  name="photo"
                  placeholder="wprowadź link do obrazka produktu"
                  value={product.photo}
                  onChange={onChange}
                />
                {errors.photo && (
                  <FormErrorMessage message="Link do obrazka jest wymagany." />
                )}
                {!errors.photo && (
                  <small className="form-text text-muted">
                    Wprowadź link do obrazka produktu
                  </small>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card-footer px-0">
        <div className="d-flex mx-auto col-12 col-sm-9 col-md-6">
          <button
            className="btn btn-success mr-2"
            onClick={handleSubmit(onSave)}
          >
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
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
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
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.name ? "border border-danger" : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="wprowadź nazwę produktu"
                  onChange={onChange}
                  value={product.name}
                />
                {errors.name && (
                  <FormErrorMessage message="Nazwa produktu jest wymagana" />
                )}
                {!errors.name && (
                  <small className="form-text text-muted">
                    Wprowadź nazwę produktu
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Opis produktu</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.description ? "border border-danger" : ""
                  }`}
                  type="text"
                  name="description"
                  placeholder="wprowadź opis produktu"
                  onChange={onChange}
                  value={product.description}
                />
                {errors.description && (
                  <FormErrorMessage message="Opis produktu jest wymagany" />
                )}
                {!errors.description && (
                  <small className="form-text text-muted">
                    Wprowadź opis produktu
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Cena produktu</label>
                <input
                  ref={register({
                    required: true,
                    valueAsNumber: true,
                    min: 1,
                    max: 1000,
                  })}
                  className={`form-control ${
                    errors.price ? "border border-danger" : ""
                  }`}
                  type="number"
                  name="price"
                  min="1"
                  max="1000"
                  step="0.1"
                  placeholder="wprowadź cenę produktu"
                  onChange={onChange}
                  value={product.price}
                />
                {errors.price && (
                  <FormErrorMessage message="Wprowadź poprawną cenę (od 1 do 1000 zł)" />
                )}
                {!errors.price && (
                  <small className="form-text text-muted">
                    Wprowadź cenę produktu
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Link do obrazka</label>
                <input
                  ref={register({ required: true })}
                  className={`form-control ${
                    errors.photo ? "border border-danger" : ""
                  }`}
                  type="text"
                  name="photo"
                  placeholder="wprowadź link do obrazka produktu"
                  onChange={onChange}
                  value={product.photo}
                />
                {errors.photo && (
                  <FormErrorMessage message="Link do obrazka jest wymagany." />
                )}
                {!errors.photo && (
                  <small className="form-text text-muted">
                    Wprowadź link do obrazka produktu
                  </small>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card-footer px-0">
        <div className="d-flex mx-auto col-12 col-sm-9 col-md-6">
          <button
            className="btn btn-primary mr-2"
            onClick={handleSubmit(onSave)}
          >
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
