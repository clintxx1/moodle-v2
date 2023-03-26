import { Form, notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../lib/api";
import { PageContext } from "../../lib/context";
import RegisterView from "./view";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (e) => {
    try {
      const res = await register(e);
      if (res.status === 400) {
        notification.error({
          message: "Account Registration",
          description: "Creating an account failed.",
        });
      } else if (res.status === 401) {
        notification.error({
          message: "Account Registration",
          description: "Email is already taken",
        });
      } else {
        notification.success({
          message: "Account Registration",
          description: "Registration successful. Waiting for approval.",
        });
        navigate("/login");
      }
    } catch (error) {
      notification.error({
        message: "Account Registration",
        description: error.response.data.message,
      });
    }
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
