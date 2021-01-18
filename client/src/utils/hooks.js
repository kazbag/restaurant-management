// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'toast-me';

axios.defaults.withCredentials = true;

// eslint-disable-next-line func-names
export const useFields = function (initialValue) {
  const [fields, setValues] = useState(initialValue);
  const setField = (e) => {
    let val = e.target.value;
    if (e.target.dataset.integer) {
      // eslint-disable-next-line radix
      val = parseInt(val);
    }
    if (e.target.type === 'checkbox') {
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

// eslint-disable-next-line func-names
export const useLoad = function (initialState, uri) {
  const [fields, setFields] = useState(initialState);
  useEffect(() => {
    axios
      .get(uri, { withCredentials: true })
      .then((res) => {
        setFields(res.data);
      })
      .catch((err) => toast(err.response.data.message, 'error'));
  }, [uri]);
  return [fields, setFields];
};

export const usePeriodicalLoad = (init, url, interval) => {
  const [data, setData] = useState(init);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadData = () => {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          toast(err.response.data.message, 'error');
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    loadData();

    const refreshData = setInterval(() => {
      loadData();
    }, interval);
    return () => clearInterval(refreshData);
  }, [url, setData, interval]);

  return [data, isLoading, isError, setData];
};
