import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { UserList, UserEdit } from "../components/Admin/admin_components";
import { handleEdit, handleRemove } from "../components/Admin/admin_methods";
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
  role: "",
};

const AdminPage = () => {
  const [user, setUser] = useState(EMPTY_USER_TEMPLATE);
  const [users, setUsers] = useLoad([], `${SERVER_URL}/users`);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
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
      <UserList
        performEdit={(e) => handleUserSelection(e.target.dataset.id)}
        onEdit={(e) => console.log(e.target.dataset.id)}
        onRemove={(e) => handleRemove(e.target.dataset.id, setUsers)}
        users={users}
      />
      {isUserModalVisible && selectedUser && (
        <UserEdit
          onSubmit={() => console.log("ok")}
          onCancel={() => {
            setIsUserModalVisible(false);
          }}
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
          user={selectedUser}
          roles={USER_ROLES}
        />
      )}
    </div>
  );
};

export default withRouter(AdminPage);
