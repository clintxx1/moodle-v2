import React, { useContext } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip } from "antd";
import { PageContext } from "../../lib/context";

const CreateExamView = () => {
  const { onFinish } = useContext(PageContext);
  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <p className="font-bold text-3xl m-5">Create Exam</p>
      <Form
        name="dynamic_form_item"
        // {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        style={{
          width: "100%",
          paddingLeft: "128px",
          paddingRight: "128px",
          paddingTop: "32px",
          paddingBottom: "32px",
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          name={"exam-title"}
          label={"Title"}
          rules={[{ required: true, message: "Please input your exams title" }]}
        >
          <Input placeholder="Enter exam title" />
        </Form.Item>
        <Form.Item
          name={"exam-description"}
          label={"Description"}
        >
          <Input placeholder="Enter exam description" />
        </Form.Item>
        <Form.List
          name="questions"
          // rules={[
          //   {
          //     validator: async (_, names) => {
          //       if (!names || names.length < 2) {
          //         return Promise.reject(new Error("At least 10 questions"));
          //       }
          //     },
          //   },
          // ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={`Question ${index + 1}`}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input your question or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder={`Question #${index + 1}`}
                      style={{ width: "97%", marginRight: 10 }}
                    />
                  </Form.Item>
                  {/* {fields.length > 1 ? ( */}
                  <Tooltip title="Remove a question" showArrow>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  </Tooltip>
                  {/* ) : null} */}
                </Form.Item>
              ))}
              <Form.Item
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "fit-content" }}
                  icon={<PlusOutlined />}
                >
                  Add question field
                </Button>
                {/* <Button
                  type="dashed"
                  onClick={() => {
                    add("The head item", 0);
                  }}
                  style={{ width: "100%", marginTop: "20px" }}
                  icon={<PlusOutlined />}
                >
                  Add an answer field
                </Button> */}
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateExamView;
