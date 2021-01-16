import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

export const useFields = function(initialValue) {
  const [fields, setValues] = useState(initialValue);
  const setField = (e) => {
    let val = e.target.value;
    if (e.target.dataset.integer) {
      val = parseInt(val);
    }
    if (e.target.type === "checkbox") {
      val = e.target.checked;
    }
    setValues({
      ...fields,
      [e.target.name]: val,
    });
  };
  const updateFields = (newValue) => {
    setValues({ ...fields, ...newValue });
  };
  return [fields, setField, setValues, updateFields];
};

export const useLoad = function(initialState, uri) {
  const [fields, setFields] = useState(initialState);
  useEffect(() => {
    axios
      .get(uri, { withCredentials: true })
      .then((res) => {
        setFields(res.data);
      })
      .catch((err) => console.log(err));
  }, [uri]);
  return [fields, setFields];
};
