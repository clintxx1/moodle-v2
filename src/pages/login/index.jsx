import React from "react";
import { PageContext } from "../../lib/context";
import LoginView from "./view";
import auth from "../../lib/services";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const payload = {
      schoolId: e.schoolId,
      password: e.password,
    };
    auth
      .login(payload)
      .then(async (res) => {
        if (res.status === 400) {
          const message = await res.json();
          notification.error({
            message: "Login Failed",
            description: message?.message
              ? message?.message
              : "Invalid username or password!",
            duration: 5,
          });
          return;
        }
        const data = await res.json();
        if (data?.token) {
          auth.storeToken(data.token);
          if (auth.getToken()) {
            window.location.href = "/dashboard";
          }
        }
      })
      .catch((err) => {
        console.error("ERR: ", err);
      });
  };

  const values = {
    handleSubmit,
    navigate,
  };
  return (
    <PageContext.Provider value={values}>
      <LoginView />
    </PageContext.Provider>
  );
};

export default Login;
