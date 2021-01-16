import React from "react";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "../../utils/forms";

export const CodeModal = ({ onChange, onCreate, onReset }) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  return (
    <div className="col-12 col-md-6">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Dodaj nowy kod</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="mx-auto col-12">
              <form className="form">
                <div className="form-group">
                  <label>Wpisz kod</label>
                  <input
                    ref={register({ required: true })}
                    className={`form-control ${
                      errors.code ? "border border-danger" : ""
                    }`}
                    placeholder="wprowadź kod"
                    type="text"
                    onChange={onChange}
                    name="code"
                  />
                  {errors.code && (
                    <FormErrorMessage message="Kod jest wymagany" />
                  )}
                  {!errors.code && (
                    <small className="form-text text-muted">Wprowadź kod</small>
                  )}
                </div>
                <div className="form-group">
                  <label>Rabat (w procentach)</label>
                  <input
                    ref={register({
                      required: true,
                      valueAsNumber: true,
                      min: 1,
                      max: 80,
                    })}
                    className={`form-control ${
                      errors.value ? "border border-danger" : ""
                    }`}
                    onChange={onChange}
                    className="form-control"
                    type="number"
                    min="1"
                    max="50"
                    name="value"
                    step="1"
                    defaultValue="10"
                  />
                  {errors.value && (
                    <FormErrorMessage message="Wprowadź poprawną wartość (od 1 do 80%)" />
                  )}
                  {!errors.value && (
                    <small className="form-text text-muted">
                      Wprowadź rabat
                    </small>
                  )}
                </div>
                <div className="form-group d-flex mt-8">
                  <button
                    className="btn btn-success mr-2"
                    type="button"
                    onClick={handleSubmit(onCreate)}
                  >
                    Dodaj kod
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="reset"
                    onClick={onReset}
                  >
                    Anuluj
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CodeList = ({ list, onRemove }) => {
  return (
    <div className="col-12 col-md-6 mt-4 mt-md-0">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Dostępne kody</h3>
        </div>
        <div className="card-body">
          <ul className="list list-unstyled">
            {list.map((item, index) => {
              return (
                <li className="list-item d-flex mb-2" key={index}>
                  <span>
                    {item.code} - {item.value * 100} %
                  </span>
                  <button
                    onClick={() => onRemove(item._id)}
                    className="btn btn-sm btn-danger ml-auto"
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
};
