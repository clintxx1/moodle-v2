import React, { createRef, useEffect, useState } from "react";
import { Layout, Menu, Button, Badge, notification } from "antd";
import {
  LogoutOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FormOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CustomDropdown from "../components/dropdown";
import auth from "../lib/services";
import {
  approveAllUser,
  approveUser,
  deleteUser,
  fetchNotifications,
  rejectAllUser,
} from "../lib/api";
import OutsideClickHandler from "react-outside-click-handler";

const items = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    accounttype: ["admin", "superadmin", "student"],
  },
  {
    key: "exam",
    icon: <FormOutlined />,
    label: "Exam",
    accounttype: ["admin", "superadmin"],
  },
  {
    key: "records",
    icon: <AppstoreOutlined />,
    label: "Records",
    accounttype: ["admin", "superadmin"],
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
    accounttype: ["admin", "superadmin", "student"],
  },
];

const GuestLayout = () => {
  const { Header, Content, Footer } = Layout;
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const ref = createRef();
  const navigate = useNavigate();
  const { firstName, middleName, lastName } = auth.getUserInfo();
  const [notifications, setNotifications] = useState([]);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getSelectedKey = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "dashboard";
      case "/exam":
        return "exam";
      case "/records":
        return "records";
      case "/logout":
        return "logout";
      default:
        return "dashboard";
    }
  };

  const getNotifications = async () => {
    try {
      const res = await fetchNotifications();
      if (res?.data?.data) {
        setNotifications(res?.data?.data);
      }
    } catch (error) {
      console.error("ERR: ", error);
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

  const handleApproveUser = async (id, index) => {
    const res = await approveUser(id);
    if (res.status === 200) {
      getNotifications();
    } else {
      notification.error({
        message: "User Approval",
        description: "Approval Failed.",
      });
    }
  };

  const handleRejectUser = async (id, index) => {
    const res = await deleteUser(id);
    if (res.status === 200) {
      getNotifications();
    } else {
      notification.error({
        message: "User Rejection",
        description: "Rejection Failed.",
      });
    }
  };

  const notificationRenderer = (data, index) => {
    const { _id, firstName, middleName, lastName, role } = data;
    return (
      <div
        className="flex flex-col items-start justify-between h-16 p-3 pr-4 border-b-[1px] border-b-gray-300"
        key={_id}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-semibold">APPROVAL</p>
          <p>{`${firstName ?? ""} ${`${
            middleName ? `${middleName[0]}.` : ""
          }`} ${lastName ?? ""}`}</p>
        </div>
        <div className="flex flex-row items-center justify-between w-full mt-2">
          <div className="flex flex-row items-center justify-between">
            <p className="font-semibold">{"Type: "}&nbsp;</p>
            <p className="">{role.toUpperCase()}</p>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <Button size="small" onClick={() => handleApproveUser(_id, index)}>
              Approve
            </Button>
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => handleRejectUser(_id, index)}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const handleOpenNotifications = (e) => {
    e.stopPropagation();
    setOpenNotification((isOpen) => !isOpen);
  };

  const getNotificationCount = (data) => {
    if (data && data.length === 0) return 0;

    return data.length;
  };

  const handleApproveAllUser = async () => {
    const res = await approveAllUser();
    if (res.status === 200) {
      getNotifications();
    } else {
      notification.error({
        message: "User Approval",
        description: "Approval Failed.",
      });
    }
  };

  const handleRejectAllUser = async () => {
    const res = await rejectAllUser();
    if (res.status === 200) {
      getNotifications();
    } else {
      notification.error({
        message: "User Rejection",
        description: "Rejection Failed.",
      });
    }
  };

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
          <p className="text-sm md:text-xl">BSAG - Mock Exam</p>
        </div>
        <div className="flex flex-row items-center justify-center">
          {auth.getRole() === "superadmin" && (
            <div className="mr-5 mb-1">
              <Badge
                count={getNotificationCount(notifications)}
                className="relative"
              >
                <BellOutlined
                  style={{ fontSize: 22, cursor: "pointer" }}
                  onClick={handleOpenNotifications}
                />
                <OutsideClickHandler
                  onOutsideClick={() => setOpenNotification(false)}
                >
                  {openNotification &&
                    notifications &&
                    notifications.length > 1 && (
                      <div
                        className={`absolute mt-[267px] border-gray-400 text-end right-0 z-50 overflow-auto bg-white pr-4 ${
                          notifications.length <= 4
                            ? "w-96 rounded-b-lg border-x-[1px] border-b-[1px]"
                            : "mr-5 rounded-bl-lg w-[363px] border-b-[1px]"
                        }`}
                      >
                        <Button
                          size="small"
                          type="link"
                          onClick={handleApproveAllUser}
                        >
                          Accept All
                        </Button>
                        <Button
                          size="small"
                          type="link"
                          danger
                          onClick={handleRejectAllUser}
                        >
                          Reject All
                        </Button>
                      </div>
                    )}
                  {openNotification && (
                    <div className="absolute w-96 h-72 right-0 z-40 overflow-auto rounded-lg mt-1 border-[1px] border-gray-400 bg-white">
                      {notifications && notifications.length > 0 ? (
                        <div
                          className={`${
                            notifications.length <= 4 ? "mb-0" : "mb-6"
                          }`}
                        >
                          {notifications.map((item, idx) => {
                            return notificationRenderer(item, idx);
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-row items-center justify-center h-full w-full">
                          <p className="text-base italic text-gray-400">
                            You have no notifications
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </OutsideClickHandler>
              </Badge>
            </div>
          )}
          <p className="mr-2 text-base font-semibold">{`${firstName ?? ""} ${`${
            middleName ? `${middleName[0]}.` : ""
          }`} ${lastName ?? ""}`}</p>
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
            items={items.filter((e) => e.accounttype.includes(auth.getRole()))}
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
