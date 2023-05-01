import React, { useContext } from "react";
import { PageContext } from "../../lib/context";
import { Button, Checkbox, Form, Input } from "antd";

const LoginView = () => {
  const { handleSubmit, navigate } = useContext(PageContext);
  return (
    <div className="flex min-h-full w-full h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src={require("../../assets/nwssu.png")}
            alt=""
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or &nbsp;
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create an account if you're new.
            </a>
          </p>
        </div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="right"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form.Item
            label="Student ID"
            name="schoolId"
            rules={[
              { required: true, message: "Please input your Student ID" },
            ]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
            style={{ width: "100%" }}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex w-full items-center justify-end mb-4">
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ width: "60%", padding: 0, margin: 0 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button style={{ padding: 0 }} type="link" onClick={() => navigate("/forgot-password")}>
              Forgot password
            </Button>
          </div>
          <Button type="primary" htmlType="submit" style={{ width: "50%" }}>
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginView;
