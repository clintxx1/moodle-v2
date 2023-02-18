import React from "react";
import { Avatar, Dropdown } from "antd";
import { getRandomColor } from "../lib/helper";
import auth from "../lib/services";
import { UserOutlined } from "@ant-design/icons";

const CustomDropdown = () => {
  const initialChar = Array.from(
    auth.getUserInfo().username
  )[0].toUpperCase() ?? <UserOutlined />;

  const handleLogout = () => {
    auth.clear();
  };

  const items = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Avatar
        style={{
          backgroundColor: getRandomColor(),
          verticalAlign: "middle",
          textAlign: "center",
          cursor: "pointer",
        }}
        size="large"
        gap={4}
      >
        <div
          className={
            "flex items-center justify-center text-xl text-white font-semibold mt-1"
          }
        >
          {initialChar}
        </div>
      </Avatar>
    </Dropdown>
  );
};

export default CustomDropdown;
