import { Button, Tabs } from "antd";

import UserApi from "../../api/UserApi";
import { removeJwtToken } from "../../services/jwtTokenService";
import Admin from "../Admin/Admin";
import Items from "../Items/Items";
import Profile from "../Profile/Profile";

import "./General.scss";

function General() {
  const logout = () => {
    UserApi.userLogout().then(() => removeJwtToken());
  };
  return (
    <div className="general-component">
      <Tabs
        defaultActiveKey="1"
        items={[
          { label: "App", key: "1", children: <Items /> },
          { label: "User Profile", key: "2", children: <Profile /> },
          { label: "Admin", key: "3", children: <Admin /> },
        ]}
      />
      <Button
        onClick={logout}
        style={{ position: "absolute", right: "1.5%", top: "25px" }}
      >
        Logout
      </Button>
    </div>
  );
}

export default General;
