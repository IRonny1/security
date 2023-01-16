import { useEffect, useState } from "react";
import { Button, Select } from "antd";

import UserApi from "../../api/UserApi";

function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    UserApi.getAllUsers().then(({ data }) => setUsers(data));
  }, []);

  const onChangeUser = (user) => setSelectedUser(user);
  const onChangeRole = (role) => setSelectedRole(role);

  const onDone = () => {
    UserApi.setUserRole(selectedUser, selectedRole).then(({ data }) =>
      console.log(data)
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Select
        placeholder="User"
        options={users.map(({ userId, firstName, lastName }) => {
          return {
            value: userId,
            label: `${firstName} ${lastName}`,
          };
        })}
        onChange={onChangeUser}
        style={{ width: "200px", marginRight: "10px" }}
      />
      <Select
        placeholder="Role"
        options={roles}
        onChange={onChangeRole}
        style={{ width: "200px", marginRight: "10px" }}
      />
      <Button onClick={onDone}>Done</Button>
    </div>
  );
}

const roles = [
  { value: "USER", label: "User" },
  { value: "MODERATOR", label: "Moderator" },
  { value: "ADMIN", label: "Admin" },
];

export default Admin;
