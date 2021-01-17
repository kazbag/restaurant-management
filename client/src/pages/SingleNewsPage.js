import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useFields, useLoad } from '../utils/hooks';

axios.defaults.withCredentials = true;

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const News = ({ data }) =>
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  // console.log(data);
  (
    <div className="col-12 h-100 mx-auto">
      <div className="card-deck">
        <div className="card mb-4 col m-4 p-4 card-stretch">
          <h3 className="card-title text-dark">{data[0].title}</h3>
          <p className="card-text">{data[0].message}</p>
        </div>
      </div>
    </div>
  );
const SingleNewsPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const newsId = window.location.pathname.replace('/news/', '');
  const [data, setData] = useLoad([], `${serverUrl}/news/${newsId}`);
  // useEffect(() => {
  //   console.log(data);
  // }, [data, setData]);
  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          <div className="row">
            {data && data.length > 0 && !data[0].error && <News data={data} />}
            {data && data.length > 0 && data[0].error && (
              <div className="col">
                <div className="d-flex flex-column">
                  <div className="alert alert-warning d-flex align-items-center mb-4">
                    <i className="fas fa-exclamation-triangle mr-2 fa-2x" />
                    Niestety, nie znaleziono newsa.
                  </div>
                  <div className="form-group">
                    <a href="/" className="btn btn-info btn-sm">
                      Przejdź do strony głównej
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(SingleNewsPage);
