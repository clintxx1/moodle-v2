import React, { createRef, useRef, useState } from "react";
import { Layout, Menu, Button, Tooltip } from "antd";
import {
  LogoutOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const GuestLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const ref = createRef();
  const navigate = useNavigate();

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/home":
        return "1";
      case "/3":
        return "2";
      default:
        return "1";
    }
  };

  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Home",
    },
    {
      key: "home",
      icon: <LogoutOutlined />,
      label: "Random Stuffs",
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: "Random Stuffs 2",
    },
    {
      key: "4",
      icon: <MailOutlined />,
      label: "Random Stuffs",
    },
  ];
  //Added random comment
  const navigateTo = (e) => {
    navigate(e.key);
    // window.location.href = e.key;
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
          margin: 0,
          backgroundColor: "white",
        }}
      >
        <div className="flex flex-row items-center">
          <Tooltip title="Switch for sidebar navigation" placement="bottomLeft">
          <Button
            // type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
              padding: "0 10px",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          </Tooltip>
          <img
            src={require("../assets/nwssu.png")}
            style={{ height: 60, cursor: "pointer", padding: "0 10px" }}
            alt=""
            onClick={() => (window.location.href = "/")}
          />
          <p style={{ padding: "0 10px", fontSize: 20 }}>NwSSU LMS - Moodle</p>
        </div>
        <div>
          You are not logged in. (
          <a href="/login" style={{ color: "green" }}>
            Log in
          </a>
          )
        </div>
      </Header>
      <Layout style={{ minHeight: "90vh", flex: 1, flexDirection: "row" }}>
        <div style={{ backgroundColor: "white" }}>
          <Menu
            ref={ref}
            theme="light"
            selectedKeys={getSelectedKey()}
            mode="inline"
            items={items}
            onClick={navigateTo}
            inlineCollapsed={collapsed}
          />
        </div>
        <Layout style={{ flex: 1 }}>
          <Content style={{ margin: "0 16px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>Cid&Clint @2023</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GuestLayout;
