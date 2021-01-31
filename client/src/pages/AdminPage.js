import React, { useState } from 'react';
import { withRouter } from 'react-router';
import {
  UserList,
  UserEdit,
  OrderList,
  NewsModal,
  NewsList,
} from '../components/Admin/admin_components';
import {
  handleEdit,
  handleRemove,
  handleNew,
  handleCreateMessage,
  handleRemoveMessage,
  handleDataChange
} from '../components/Admin/admin_methods';
import { useLoad } from '../utils/hooks';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

const USER_ROLES = ['user', 'employee', 'admin'];
const EMPTY_USER_TEMPLATE = {
  name: '',
  surname: '',
  login: '',
  password: '',
  email: '',
  city: '',
  role: 'user',
};
const EMPTY_NEWS_TEMPLATE = {
  title: '',
  message: '',
};

const AdminPage = () => {
  const [user, setUser] = useState(EMPTY_USER_TEMPLATE);
  const [users, setUsers] = useLoad([], `${SERVER_URL}/users`);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [ordersPending] = useLoad([], `${SERVER_URL}/orders/completed`);
  const [ordersCompleted] = useLoad([], `${SERVER_URL}/orders/pending`);
  const [news, setNews] = useState(EMPTY_NEWS_TEMPLATE);
  const [newsList, setNewsList] = useLoad([], `${SERVER_URL}/news`);
  const [isNewsModalVisible, setIsNewsModalVisible] = useState(false);
  const handleUserSelection = (id) => {
    const _user = users.filter((u) => u._id === id);
    if (_user.length) {
      setSelectedUser(_user[0]);
      setIsUserModalVisible(true);
    } else {
      setSelectedUser(null);
      setIsUserModalVisible(false);
    }
  };

  return (
    <div className="row">
      <NewsList
        data={newsList}
        performNew={() => setIsNewsModalVisible(true)}
        onRemove={(e) => handleRemoveMessage(e.target.dataset.id, setNewsList)}
      />
      {isNewsModalVisible && (
        <NewsModal
          onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })}
          onSubmit={() => handleCreateMessage(news, (newList) => {
            setNews(EMPTY_USER_TEMPLATE);
            setIsNewsModalVisible(false);
            setNewsList(newList);
          })}
          onCancel={() => {
            setIsNewsModalVisible(false);
            setNews(EMPTY_USER_TEMPLATE);
          }}
        />
      )}
      <UserList
        performEdit={(e) => {
          handleUserSelection(e.target.dataset.id);
          setIsEdit(true);
        }}
        // TODO: handle it
        // onEdit={(e) => console.log(e.target.dataset.id)}
        performNew={() => {
          setIsAdd(true);
          setIsUserModalVisible(true);
        }}
        onRemove={(e) => handleRemove(e.target.dataset.id, setUsers)}
        users={users}
      />
      {isUserModalVisible && isEdit && (
        <UserEdit
          header="Edycja użytkownika"
          onSubmit={() => handleEdit(selectedUser._id, selectedUser, (userData) => {
            setUsers(userData);
            setIsEdit(false);
            setIsUserModalVisible(false);
            setUser(EMPTY_USER_TEMPLATE);
          })}
          onCancel={() => {
            setIsEdit(false);
            setIsUserModalVisible(false);
            setSelectedUser(EMPTY_USER_TEMPLATE);
          }}
          onChange={(e) => setSelectedUser({
            ...selectedUser,
            [e.target.name]: e.target.value,
          })}
          user={selectedUser}
          roles={USER_ROLES}
          buttonText="Zapisz"
        />
      )}
      {isUserModalVisible && isAdd && (
        <UserEdit
          header="Dodawanie użytkownika"
          onSubmit={() => handleNew(user, (userData) => {
            setUsers(userData);
            setIsAdd(false);
            setIsUserModalVisible(false);
            setUser(EMPTY_USER_TEMPLATE);
          })}
          onCancel={() => {
            setIsAdd(false);
            setIsUserModalVisible(false);
            setUser(EMPTY_USER_TEMPLATE);
          }}
          onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
          user={user}
          roles={USER_ROLES}
          buttonText="Dodaj"
        />
      )}
      <OrderList
        orders={{ pending: ordersPending, completed: handleDataChange(ordersCompleted) }}
      />
    </div>
  );
};

export default withRouter(AdminPage);
