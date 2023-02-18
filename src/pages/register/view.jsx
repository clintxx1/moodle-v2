import { LockFilled } from "@ant-design/icons";
import { Input, Select, Form } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const RegisterView = () => {
  const { handleSubmit, form } = useContext(PageContext);
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
            Register
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or go to&nbsp;
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              login page
            </a>
            &nbsp;if you already have an account.
          </p>
        </div>
        <Form form={form} onFinish={handleSubmit} labelCol={{span: 6}} wrapperCol={{span: 18}}>
          <div className="rounded-md shadow-sm mt-8 space-y-6">
            <div className="my-4">
              <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username' }]}>
                <Input id="username" placeholder="Username" />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email' }]}>
                <Input placeholder="Email" id="email" type="email" />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password' }]}>
                <Input.Password placeholder="Password" id="password" />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item name="gender" label="Gender" initialValue={"male"}>
                <Select
                  id="gender"
                  placeholder="Choose gender"
                  style={{ width: "100%" }}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item name="role" label="Role" initialValue={"student"}>
                <Select
                  id="role"
                  placeholder="Choose Role"
                  style={{ width: "100%" }}
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Student", value: "student" },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <div
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                >
                  <LockFilled style={{ color: "white" }} />
                </div>
              </span>
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterView;
