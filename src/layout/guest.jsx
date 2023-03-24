import React, { createRef, useEffect, useState } from "react";
import { Layout, Menu, Button, Badge, Dropdown } from "antd";
import {
  LogoutOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FormOutlined,
  BellOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomDropdown from "../components/dropdown";
import auth from "../lib/services";
import { fetchNotifications } from "../lib/api";

/**
 *
 * @returns Dropdown payload
 * key
 * label
 * icon
 * disabled
 *
 */

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    accountType: ["admin", "superadmin", "student"],
  },
  {
    key: "exam",
    icon: <FormOutlined />,
    label: "Exam",
    accountType: ["admin", "superadmin"],
  },
  {
    key: "category",
    icon: <AppstoreOutlined />,
    label: "Category",
    accountType: ["admin", "superadmin"],
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    accountType: ["admin", "superadmin", "student"],
  },
];

const GuestLayout = () => {
  const { Header, Content, Footer } = Layout;
  const location = useLocation();
  const role = auth.getRole();
  const [collapsed, setCollapsed] = useState(true);
  const ref = createRef();
  const navigate = useNavigate();
  const { firstName, middleName, lastName } = auth.getUserInfo();
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await fetchNotifications();
        if (res?.data?.data) {
          const customFormat = res.data.data.map((item) => {
            return {
              key: item._id,
              label: notificationRenderer(item),
            };
          });
          setNotification(customFormat);
          console.log(res);
        }
      } catch (error) {
        console.log("ERR: ", error);
      }
    };
    getNotifications();
  }, []);

  useEffect(() => {
    if (notification) {
      console.log("NOTIF: ", notification);
    }
  }, [notification]);

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "dashboard";
      case "/exam":
        return "exam";
      case "/category":
        return "3";
      case "/logout":
        return "4";
      default:
        return "dashboard";
    }
  };

  const navigateTo = (e) => {
    if (e.key === "logout") {
      auth.clear();
    }
    navigate(e.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const notificationRenderer = (data) => {
    return (
      <>
        <div className="flex flex-row items-center justify-between">
          <p>APPROVAL</p>
          <p>{`${data.firstName} ${data?.middleName} ${data.lastName}`}</p>
        </div>
      </>
    );
  };

  const customShit = [
    {
      key: "1",
      label: <div>test</div>,
      onClick: () => console.log("TEST")
    },
    // {
    //   key: "2",
    //   label: <div onClick={() => console.log("TEST")}>test</div>,
    // },
    // {
    //   key: "3",
    //   label: <div onClick={() => console.log("TEST")}>test</div>,
    // },
  ];

  return (
    <div className="flex flex-col">
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
        <div className="flex flex-row items-center justify-center">
          {auth.getRole() === "superadmin" && (
            <div className="mr-5 mb-1">
              <Badge count={1} className="test">
                <Dropdown.Button arrow placement="bottomRight" menu={{ items }}>
                  <div>
                    <BellOutlined style={{ fontSize: 22 }} />
                  </div>
                </Dropdown.Button>
              </Badge>
            </div>
          )}
          <p className="mr-2 text-base font-semibold">{`${firstName ?? ""} ${
            middleName ?? ""
          } ${lastName ?? ""}`}</p>
          <CustomDropdown />
        </div>
      </Header>
      <Layout style={{ minHeight: "93vh", flex: 1, flexDirection: "row" }}>
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
        <div
          className={`bg-white lg:block ${collapsed ? "hidden" : "block"} mt-2`}
        >
          <Menu
            ref={ref}
            theme="light"
            selectedKeys={getSelectedKey()}
            mode="inline"
            items={items.filter((e) => e.accountType.includes(auth.getRole()))}
            onClick={navigateTo}
            inlineCollapsed={collapsed}
          />
        </div>
        <Layout style={{ flex: 1, display: "flex", margin: 0, padding: 0 }}>
          <Content style={{ margin: 0, padding: 0 }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            All Rights Reserved™ 2023
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default GuestLayout;
