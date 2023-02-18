import { Form, message } from "antd";
import React from "react";
import { PageContext } from "../../lib/context";
import auth from "../../lib/services";
import RegisterView from "./view";

const Register = () => {
  const [form] = Form.useForm();
  const handleSubmit = (e) => {
    auth
      .register(e)
      .then(async (res) => {
        if (res.status === 409) {
          message.error("Invalid username or password!");
          return;
        }
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error("ERR: ", err);
      });
  };

  const values = {
    handleSubmit,
    form,
  };
  return (
    <PageContext.Provider value={values}>
      <RegisterView />
    </PageContext.Provider>
  );
};

export default Register;
