import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { UserList } from "../components/Admin/admin_components";
import { handleEdit, handleRemove } from "../components/Admin/admin_methods";
import { useLoad } from "../utils/hooks";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

const USER_ROLES = ["user", "employee", "admin"];

const AdminPage = () => {
  const [users, setUsers] = useLoad([], `${SERVER_URL}/users`);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  return (
    <div className="row">
      <UserList
        onEdit={(e) => console.log(e.target.dataset.id)}
        onRemove={(e) => handleRemove(e.target.dataset.id, setUsers)}
        users={users}
        isModalVisible={isUserModalVisible}
        setIsModalVisible={setIsUserModalVisible}
      />
    </div>
  );
};

export default withRouter(AdminPage);
