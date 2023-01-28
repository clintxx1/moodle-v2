import React from "react";
import { Layout, Menu } from "antd";
import { LogoutOutlined, DashboardOutlined, AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const GuestLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const location = useLocation();

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/home":
        return "1";
      default:
        return "1";
    }
  };

  const items = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Home"
    },
    {
      key: "home",
      icon: <LogoutOutlined />,
      label: "Random Stuffs"
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: "Random Stuffs 2"
    },
    {
      key: "4",
      icon: <MailOutlined />,
      label: "Random Stuffs"
    },
  ]

  const navigateTo = (e) => {
    window.location.href = e.key;
  }

  return (
    <Layout>
      <Header style={{ padding: 0, margin: 0, backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <img
            src={require("../assets/sample.jpg")}
            style={{ height: 60, cursor: "pointer" }}
            alt=""
          />
          <p className="text-xs font-bold" style={{ fontWeight: "bold" }}>
            Sample Boilerplate
          </p>
        </div>
      </Header>
      <Layout style={{ minHeight: "90vh" }}>
        <Sider theme="light" collapsible>
          <Menu theme="light" selectedKeys={getSelectedKey()} mode="inline" items={items} onClick={navigateTo}/>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>Cid&Clint @2023</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GuestLayout;
