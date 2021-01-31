import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import toast from 'toast-me';
import { AuthContext } from '../contexts/AuthContext';
import { useFields } from '../utils/hooks';

axios.defaults.withCredentials = true;

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
const getLatestNews = (url, callback) => {
  axios
    .get(`${url}/news`)
    .then((response) => {
      callback(response.data);
    })
    .catch((err) => {
      toast(err.response.data.message, 'error');
    });
};

const NewsList = ({ data }) => data.map((msg) => (
  <div className="col-12 col-md-6 col-lg-4 h-100" key={msg.newsId}>
    <div className="card-deck">
      <div className="card mb-4 col m-4 p-4 card-stretch">
        <h3 className="card-title text-dark">{msg.title}</h3>
        <p
          className="card-text"
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {msg.message}
        </p>
        <a className="btn btn-primary mt-auto" href={`/news/${msg.newsId}`}>
          Czytaj więcej
        </a>
      </div>
    </div>
  </div>
));

const LatestNewsPage = () => {
  const [data, , setData] = useFields([]);
  // TODO: handle isAuthenticated
  // eslint-disable-next-line no-unused-vars
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getLatestNews(serverUrl, setData);
  }, []);

  return (
    <AuthContext.Consumer>
      {() => (
        <>
          <div className="row">
            <NewsList data={data} />
          </div>
        </>
      )}
    </AuthContext.Consumer>
  );
};
export default withRouter(LatestNewsPage);
