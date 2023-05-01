import React, { useContext } from "react";
import { PageContext } from "../../lib/context";
import { Button, Form, Input } from "antd";

const ForgotPasswordView = () => {
  const {
    handleSubmit,
    email,
    setEmail,
    studentId,
    setStudentId,
    isAvailable,
    handleCheckAccount,
  } = useContext(PageContext);
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
            Reset Password
          </h2>
        </div>
        <Form
          labelCol={{ span: 8 }}
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
            hidden={isAvailable}
            label="Student ID"
            name="schoolId"
            rules={[
              { required: true, message: "Please input your school ID" },
              {
                pattern: new RegExp(/^\d{2}-\d{4}[0-9]$/i),
                message: "Accepted format is (xx-xxxxx) ex. 12-12345",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input
              value={studentId}
              placeholder="Ex: 12-34567"
              onChange={(e) => setStudentId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            hidden={isAvailable}
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email" },
              {
                pattern: new RegExp(
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
                ),
                message: "Please enter a valid email",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input
              value={email}
              placeholder="Email"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Button hidden={isAvailable} onClick={handleCheckAccount}>
            Check Account
          </Button>
          <Form.Item
            hidden={!isAvailable}
            label="Enter New Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
            style={{ width: "100%" }}
          >
            <Input.Password />
          </Form.Item>
          <Button
            hidden={!isAvailable}
            type="primary"
            htmlType="submit"
            style={{ width: "50%" }}
          >
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
