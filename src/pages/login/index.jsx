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
        if (res.status === 400) {
          message.error("Invalid username or password!");
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
  };
  return (
    <PageContext.Provider value={values}>
      <LoginView />
    </PageContext.Provider>
  );
};

export default Login;
