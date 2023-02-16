import React, { createRef, useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  LogoutOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const { Header, Content, Footer } = Layout;
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
      label: "Dashboard",
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
          <Button
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
              padding: "0 10px",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <img
            src={require("../assets/nwssu.png")}
            style={{ height: 60, cursor: "pointer", padding: "0 10px" }}
            alt=""
            onClick={() => (window.location.href = "/")}
          />
          <p className="text-sm md:text-xl">NwSSU LMS - Moodle</p>
        </div>
        <div className="">
          You are not logged in. (
          <a href="/login" className="text-indigo-600">
            Log in
          </a>
          )
        </div>
      </Header>
      <Layout style={{ minHeight: "93vh", flex: 1, flexDirection: "row"}}>
        <div className="bg-white hidden mt-2">
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
        <div className={`bg-white lg:block ${collapsed ? 'hidden' : 'block'} mt-2`}>
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
        <Layout style={{ flex: 1, display: 'flex', margin: 0, padding: 0 }}>
          <Content style={{ margin: 0, padding: 0 }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>All Rights Reserved™ 2023</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GuestLayout;
