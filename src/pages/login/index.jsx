import React from "react";
import { PageContext } from "../../lib/context";
import LoginView from "./view";
import auth from "../../lib/services";
import { message } from "antd";

const Login = () => {
  const handleSubmit = (e) => {
    const payload = {
      schoolId: e.schoolId,
      password: e.password,
    };
    auth
      .login(payload)
      .then(async (res) => {
        if (res.status === 401) {
          message.error("Invalid username or password!");
          return;
        }
        const data = await res.json();
        if (data) {
          setTimeout(() => {
            auth.storeToken(data.token);
            window.location.href = "/dashboard";
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("ERR: ", err);
      });
  };

  const values = {
    handleSubmit,
  };
  return (
    <PageContext.Provider value={values}>
      <LoginView />
    </PageContext.Provider>
  );
};

export default Login;
