import { Tabs } from "antd";

import Admin from "../Admin/Admin";
import Items from "../Items/Items";
import Profile from "../Profile/Profile";

import "./General.scss";

function General() {
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
    </div>
  );
}

export default General;
