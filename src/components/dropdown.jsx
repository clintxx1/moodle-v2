import React, { useEffect, useState } from "react";
import { Avatar, Dropdown } from "antd";
import { getRandomColor } from "../lib/helper";
import auth from "../lib/services";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CustomDropdown = () => {
  const navigate = useNavigate();
  const initialChar = <UserOutlined />;
  const role = auth.getRole();
  const handleLogout = () => {
    auth.clear();
  };
  const [items, setItems] = useState([
    {
      key: "1",
      label: (
        <div onClick={() => navigate(`profile/${auth.getUserInfo().id}`)}>
          Profile
        </div>
      ),
    },
    {
      key: "2",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ]);

  useEffect(() => {
    if (role) {
      if (["admin", "superadmin"].includes(role)) {
        setItems([
          {
            key: "1",
            label: (
              <div onClick={() => navigate(`profile/${auth.getUserInfo().id}`)}>
                Profile
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div onClick={() => navigate("create-exam")}>Create Exam</div>
            ),
          },
          {
            key: "3",
            label: <div onClick={handleLogout}>Logout</div>,
          },
        ]);
      }
    }
    // eslint-disable-next-line
  }, [role]);

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
            "flex items-center justify-center text-xl text-white font-semibold mt-2"
          }
        >
          {initialChar}
        </div>
      </Avatar>
    </Dropdown>
  );
};

export default CustomDropdown;
