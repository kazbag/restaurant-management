import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import {
  UserList,
  UserEdit,
  OrderList,
  NewsModal,
} from "../components/Admin/admin_components";
import {
  handleEdit,
  handleRemove,
  handleNew,
  handleCreateMessage,
} from "../components/Admin/admin_methods";
import { useLoad } from "../utils/hooks";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const USER_ROLES = ["user", "employee", "admin"];
const EMPTY_USER_TEMPLATE = {
  name: "",
  surname: "",
  login: "",
  password: "",
  email: "",
  city: "",
  role: "user",
};
const EMPTY_NEWS_TEMPLATE = {
  title: "",
  message: "",
};

const AdminPage = () => {
  const [user, setUser] = useState(EMPTY_USER_TEMPLATE);
  const [users, setUsers] = useLoad([], `${SERVER_URL}/users`);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  // TODO: unificate that orderStatus: true is completed or pending order
  const [ordersPending] = useLoad([], `${SERVER_URL}/orders/completed`);
  const [ordersCompleted] = useLoad([], `${SERVER_URL}/orders/pending`);
  const [news, setNews] = useState(EMPTY_NEWS_TEMPLATE);

  const handleUserSelection = (id) => {
    const user = users.filter((u) => u._id === id);
    if (user.length) {
      setIsUserModalVisible(true);
      setSelectedUser(user[0]);
    } else {
      setIsUserModalVisible(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="row">
      <NewsModal
        onChange={(e) => setNews({ ...news, [e.target.name]: e.target.value })}
        onSubmit={() =>
          handleCreateMessage(news, () => setNews(EMPTY_USER_TEMPLATE))
        }
      />
      <UserList
        performEdit={(e) => {
          handleUserSelection(e.target.dataset.id);
          setIsEdit(true);
        }}
        onEdit={(e) => console.log(e.target.dataset.id)}
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
          onSubmit={() =>
            handleEdit(selectedUser._id, selectedUser, (userData) => {
              setUsers(userData);
              setIsEdit(false);
              setIsUserModalVisible(false);
              setUser(EMPTY_USER_TEMPLATE);
            })
          }
          onCancel={() => {
            setIsEdit(false);
            setIsUserModalVisible(false);
            setSelectedUser(EMPTY_USER_TEMPLATE);
          }}
          onChange={(e) =>
            setSelectedUser({
              ...selectedUser,
              [e.target.name]: e.target.value,
            })
          }
          user={selectedUser}
          roles={USER_ROLES}
          buttonText="Zapisz"
        />
      )}
      {isUserModalVisible && isAdd && (
        <UserEdit
          header="Dodawanie użytkownika"
          onSubmit={() =>
            handleNew(user, (userData) => {
              setUsers(userData);
              setIsAdd(false);
              setIsUserModalVisible(false);
              setUser(EMPTY_USER_TEMPLATE);
            })
          }
          onCancel={() => {
            setIsAdd(false);
            setIsUserModalVisible(false);
            setUser(EMPTY_USER_TEMPLATE);
          }}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
          user={user}
          roles={USER_ROLES}
          buttonText="Dodaj"
        />
      )}
      <OrderList
        orders={{ pending: ordersPending, completed: ordersCompleted }}
      />
    </div>
  );
};

export default withRouter(AdminPage);
