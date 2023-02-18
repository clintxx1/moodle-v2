import React, { useRef } from "react";
import { PageContext } from "../../lib/context";
import LoginView from "./view";
import auth from "../../lib/services";
import { message } from "antd";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    auth
      .login(payload)
      .then(async (res) => {
        if (res.status === 401) {
          message.error("Invalid username or password!");
          return;
        }
        const data = await res.json();
        auth.storeToken(data.token);
        window.location.href="/dashboard"
      })
      .catch((err) => {
        console.error("ERR: ", err);
      });
  };

  const values = {
    handleSubmit,
    emailRef,
    passwordRef,
  };
  return (
    <PageContext.Provider value={values}>
      <LoginView />
    </PageContext.Provider>
  );
};

export default Login;
