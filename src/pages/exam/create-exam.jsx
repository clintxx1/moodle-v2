import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  Tooltip,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { createExam, createQuestion, getCategories } from "../../lib/api";

const CreateExam = () => {
  const { RangePicker } = DatePicker;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const res = await getCategories();
    let data = res.data.data;
    if (data.length) {
      const tempData = data.map((val) => {
        return {
          label: val.name,
          value: val._id,
        };
      });
      setData(tempData);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    if (values.questions && values.questions.length) {
      const newVal = {
        category: values.examCategory,
        duration: values.examDuration,
        dateTimeStart: moment(dayjs(values.startEndTime[0]).format()).format(
          "LLL"
        ),
        dateTimeEnd: moment(dayjs(values.startEndTime[1]).format()).format(
          "LLL"
        ),
        itemNumber: values.questions.length,
      };

      const examRes = await createExam(newVal);
      let examResult = examRes.data.data;
      if (examResult) {
        if (values?.questions && values?.questions.length) {
          const questionPayload = values?.questions.map((q) => {
            let answer = q?.choices.filter((a) => a.answer)[0]?.choice;
            let choices = q?.choices.map((a) => a.choice);
            return {
              exam: examResult._id,
              question: q.question,
              answer: answer,
              choices: choices,
              type: "MultipleChoice",
            };
          });
          const questionRes = await createQuestion(...questionPayload);
          if (questionRes.status === 200) {
            notification.success({
              message: "Exam Creation",
              description: "Exam created successfully.",
            });
          } else {
            notification.error({
              message: "Exam Creation",
              description: "Exam error",
            });
          }
        }
      }
    } else {
      notification.error({
        message: "Creation Failed",
        description: "Please input at least 1 question",
        duration: 2,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <p className="font-bold text-3xl m-5">Create Exam</p>
      <Form
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
          name={"examCategory"}
          label={"Category"}
          rules={[{ required: true, message: "Please choose a category" }]}
        >
          <Select loading={loading} options={data} />
        </Form.Item>
        <Form.Item
          name={"examDuration"}
          label={"Duration"}
          rules={[
            { required: true, message: "Please add a valid exam duration" },
          ]}
        >
          <InputNumber
            placeholder="Enter exam duration"
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="startEndTime"
          label={"Select time of exam"}
          rules={[{ required: true, message: "Please add a deadline" }]}
        >
          <RangePicker
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [
                moment("00:00", "hh:mm a"),
                moment("11:59", "hh:mm a"),
              ],
            }}
            format="YYYY-MM-DD hh:mm a"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.List
          name="questions"
          // rules={[
          //   {
          //     validator: async (_, names) => {
          //       if (!names || names.length < 5) {
          //         return Promise.reject(
          //           new Error("Please input atleast 5 questions.")
          //         );
          //       }
          //     },
          //   },
          // ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <>
                  <Divider />
                  <div className="flex flex-row items-center" key={field.key}>
                    <Form.Item
                      {...field}
                      label={`Question ${index + 1}`}
                      name={[field.name, "question"]}
                      key={[field.key, "q"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input your question or delete this field.",
                        },
                      ]}
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                      style={{ margin: 0, marginRight: 10, width: "100%" }}
                    >
                      <Input
                        placeholder={`Question #${index + 1}`}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    <Tooltip title="Remove this question" showArrow>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Tooltip>
                  </div>
                  <Form.List
                    name={[field.name, "choices"]}
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(
                              new Error("Please input at least 2 choices")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(answers, { add, remove }, { errors }) => (
                      <div className="border-gray-300 border-[1px] rounded-lg my-5 p-2">
                        {answers.map((ans, index) => (
                          <div
                            className="flex flex-row items-center"
                            key={ans.key}
                          >
                            <Form.Item
                              {...ans}
                              name={[ans.name, "answer"]}
                              key={[ans.key, "a"]}
                              valuePropName="checked"
                            >
                              {/* <Tooltip title="Choose as answer"> */}
                              <Checkbox />
                              {/* </Tooltip> */}
                            </Form.Item>
                            <Form.Item
                              {...ans}
                              name={[ans.name, "choice"]}
                              key={[ans.key, "c"]}
                              label={`Choice ${index + 1}`}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Please input your choice or delete this field.",
                                },
                              ]}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 18 }}
                              style={{
                                margin: 0,
                                marginRight: 10,
                                marginBottom: 10,
                                width: "100%",
                              }}
                            >
                              <Input
                                placeholder={`Choice #${index + 1}`}
                                style={{ width: "100%", marginRight: 10 }}
                              />
                            </Form.Item>
                            <Tooltip title="Remove this choice field" showArrow>
                              <MinusCircleOutlined
                                onClick={() => remove(ans.name)}
                              />
                            </Tooltip>
                          </div>
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
                            Add choices
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </>
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
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateExam;
