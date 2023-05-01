import { LockFilled } from "@ant-design/icons";
import { Input, Select, Form } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const RegisterView = () => {
  const {
    handleSubmit,
    form,
    isTeacher,
    // handleCancel,
    // handlePreview,
    // previewImage,
    // previewOpen,
    // uploadButton,
    // profilePhotoRequest,
    // handlePhotoRemove,
  } = useContext(PageContext);
  return (
    <div className="flex w-full items-center justify-center h-full bg-white m-2 p-5">
      <div className="w-full max-w-md space-y-8">
        <img
          className="mx-auto h-24 w-auto"
          src={require("../../assets/nwssu.png")}
          alt=""
        />
        {isTeacher ? (
          <div>
            <p className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Create a Teacher account
            </p>
            <p className="italic text-center text-sm text-gray-600">
              NOTE: After creating an account you will receive a request for
              approval in the notification settings.
            </p>
          </div>
        ) : (
          <div>
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
        )}
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <div className="rounded-md shadow-sm mt-8 space-y-6">
            <div className="my-4">
              {/* <Form.Item name={"profilePic"} label={"Profile Picture"}>
                <Upload
                  name="profile-pic"
                  listType="picture-card"
                  onPreview={handlePreview}
                  showUploadList={uploadButton}
                  accept="image/png, image/jpeg"
                  maxCount={1}
                  customRequest={profilePhotoRequest}
                  onRemove={handlePhotoRemove}
                >
                  {previewImage ? null : uploadButton}
                </Upload>
              </Form.Item> */}
              <Form.Item
                name={"schoolId"}
                label={"School ID"}
                rules={[
                  { required: true, message: "Please input your school ID" },
                  {
                    pattern: new RegExp(/^\d{2}-\d{4}[0-9]$/i),
                    message: "Accepted format is (xx-xxxxx) ex. 12-12345",
                  },
                ]}
              >
                <Input placeholder="School ID (00-00000)" />
              </Form.Item>
              <Form.Item
                name="firstName"
                label="First name"
                rules={[
                  { required: true, message: "Please input your first name" },
                  {
                    pattern: new RegExp(/^[a-zA-Z.\s]+$/i),
                    message: "Numbers are not valid to use in this field",
                  },
                ]}
              >
                <Input id="firstName" placeholder="First name" />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item
                name="middleName"
                label="Middle name"
                rules={[
                  {
                    pattern: new RegExp(/^[a-zA-Z.\s]+$/i),
                    message: "Numbers are not valid to use in this field",
                  },
                ]}
              >
                <Input id="middleName" placeholder="Middle name" />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item
                name="lastName"
                label="Lastname"
                rules={[
                  { required: true, message: "Please input your lastname" },
                  {
                    pattern: new RegExp(/^[a-zA-Z.\s]+$/i),
                    message: "Numbers are not valid to use in this field",
                  },
                ]}
              >
                <Input id="lastName" placeholder="Lastname" />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item
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
              >
                <Input placeholder="Email" id="email" type="email" />
              </Form.Item>
            </div>
            <div className="my-4">
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password" },
                ]}
              >
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
              <Form.Item name="role" label="Role" initialValue={"student"} hidden>
                <Select
                  id="role"
                  disabled
                  placeholder="Choose Role"
                  style={{ width: "100%" }}
                  options={[
                    { label: "Teacher", value: "admin" },
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
      {/* <Modal
        open={previewOpen}
        title={"Profile Picture"}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal> */}
    </div>
  );
};

export default RegisterView;
