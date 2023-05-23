/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Tooltip,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import {
  createExam,
  createQuestion,
  getCategories,
  getQuestions,
  updateQuestion,
} from "../../lib/api";
import { useLocation, useNavigate } from "react-router-dom";
import { updateExam } from "../../lib/api";

const CreateExam = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [reviewDuration, setReviewDuration] = useState([])
  let selectedExam = JSON.parse(localStorage.getItem("currentExam"));
  const answerType = "multiple";
  const location = useLocation();

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
      const category =
        tempData &&
        selectedExam &&
        tempData?.filter((e) => e.label === selectedExam.category)[0]?.value;
      form.setFieldsValue({ examCategory: category });
      setData(tempData);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    // console.log("DATA: ", values);
    // return;
    try {
      const newVal = {
        title: values.examTitle,
        description: values.examDescription ?? null,
        category: values.examCategory,
        duration: values.examDuration,
        reviewDuration: values.reviewDuration,
        dateTimeStart: moment(dayjs(values.startEndTime[0]).format()).format(
          "LLL"
        ),
        dateTimeEnd: moment(dayjs(values.startEndTime[1]).format()).format(
          "LLL"
        ),
        password: values.examPassword,
        itemNumber: values.questions.length,
      };
      if (!location.pathname.includes("update-exam")) {
        if (values.questions && values.questions.length) {
          const examRes = await createExam(newVal);
          let examResult = examRes.data.data;
          if (examResult) {
            if (values?.questions && values?.questions.length) {
              const questionPayload = values?.questions.map((q) => {
                let answer = q?.choices.filter((a) => a.answer)[0]?.choice;
                let type = q?.choices.filter((a) => a.answer)[0]?.type;
                let choices = q?.choices.map((a) => a.choice);
                return {
                  question: q.question,
                  answer,
                  choices,
                  type,
                };
              });
              const questionRes = await createQuestion({
                exam: examResult._id,
                questions: questionPayload,
              });
              if (questionRes.status === 200) {
                notification.success({
                  message: "Exam Creation",
                  description: "Exam created successfully.",
                });
                navigate("/exam");
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
      } else {
        const res = await updateExam({ ...newVal, exam: selectedExam.id });
        if (res.status === 200) {
          const questionPayload = values?.questions.map((q) => {
            let answer = q?.choices.filter((a) => a.answer)[0]?.choice;
            let type = q?.choices.filter((a) => a.answer)[0]?.type;
            let choices = q?.choices.map((a) => a.choice);
            return {
              id: q.questionID,
              question: q.question,
              answer,
              choices,
              type,
            };
          });
          let updateQuestions = [];
          let createQuestions = [];
          questionPayload.forEach((item) => {
            if (item.id) {
              updateQuestions.push(item);
            } else {
              createQuestions.push(item);
            }
          });

          const updateQ = await updateQuestion({
            exam: selectedExam.id,
            updateQuestions,
            createQuestions,
          });
          if (updateQ.status === 200) {
            notification.success({
              message: "Exam Update",
              description: "Exam updated successfully.",
            });
            navigate("/exam");
          } else {
            notification.error({
              message: "Exam Update",
              description: "Exam error",
            });
          }
        }
      }
    } catch (error) {
      console.log("ERR: ", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await getQuestions({ exam: selectedExam.id });
      if (res?.data?.data?.length > 0) {
        const questionsData = res?.data?.data;
        const formattedQuestions = questionsData.map((item, index) => {
          const formattedChoices = item.choices.map((c) => {
            return {
              choice: c,
              type: "multiple",
              answer: item.answer === c ? true : false,
            };
          });
          return {
            question: item.question,
            questionID: item._id,
            choices: formattedChoices,
          };
        });
        form.setFieldsValue({ questions: formattedQuestions });
      }
    } catch (error) {
      console.log("ERR: ", error);
    }
  };

  const handleCalendarChange = (a, b) => {
    if (b[1] !== ''){
      const days = moment(b[1]).diff(moment(b[0]), 'days')
      if (days > 0) {
        const data = []
        for (let i = 1; i <= days; i++) {
          data.push({
            value: i,
            label: i
          });
        }
        setReviewDuration(data)
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("update-exam")) {
      form.setFieldsValue({
        examTitle: selectedExam.title,
        examDescription: selectedExam.description,
        examDuration: selectedExam.duration,
        reviewDuraton: selectedExam.reviewDuration,
        startEndTime: [
          dayjs(selectedExam.time_start),
          dayjs(selectedExam.time_end),
        ],
      });
      fetchQuestions();
    }
  }, [location]);

  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <p className="font-bold text-3xl m-5">
        {!location.pathname.includes("update-exam") ? "Create" : "Update"} Exam
      </p>
      <Form
        form={form}
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
          name={"examTitle"}
          label={"Title"}
          rules={[{ required: true, message: "Please add an exam title" }]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name={"examCategory"}
          label={"Category"}
          rules={[{ required: true, message: "Please choose a category" }]}
        >
          <Select loading={loading} options={data} />
        </Form.Item>
        <Form.Item name={"examDescription"} label={"Description"}>
          <TextArea
            showCount
            maxLength={200}
            style={{ height: 120 }}
            placeholder="Enter exam description"
          />
        </Form.Item>
        <Form.Item
          name="startEndTime"
          label={"Timing"}
          rules={[{ required: true, message: "Please add a deadline" }]}
        >
          <RangePicker
            showTime={{
              hideDisabledOptions: true,
            }}
            format="YYYY-MM-DD hh:mm a"
            style={{ width: "100%" }}
            onCalendarChange={handleCalendarChange}
          />
        </Form.Item>
        <Form.Item
          name={"examDuration"}
          label={"Duration (hours)"}
          rules={[
            { required: true, message: "Please add a valid exam duration" },
          ]}
        >
          <InputNumber
            placeholder="Enter exam duration (ex. 1)"
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name={"reviewDuration"}
          label={"Review Duration (days)"}
          rules={[
            { required: true, message: "Please choose a review duration" },
          ]}
        >
          <div className="flex items-center gap-4">
            <Select
              placeholder="Choose a review duration"
              disabled={!reviewDuration?.length}
              options={reviewDuration}
              // style={{ width: "100%" }}
            />
            <Tooltip title="Review duration is the number of days an instructor will take to review the examination. Students can retake the exam after the review duration expires">
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        </Form.Item>
        <Form.Item
          name={"examPassword"}
          label={"Exam Key"}
          rules={[{ required: true, message: "Please add an exam key" }]}
        >
          <Input.Password />
        </Form.Item>
        {/* <Form.List name="sections">
            {(sections, {add, remove}, {errors}) => (
              <>
              {sections.map((section, index) => (
                <>
                <Form.Item
                  {...sections}
                  label="Section"
                  name={[section.name, "section"]}
                  key={[section.key, "sec"]}
                >
                  <Input />
                </Form.Item>
                <Tooltip title="Remove this section" showArrow>
                      <MinusCircleOutlined onClick={() => remove(section.name)} />
                    </Tooltip>
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
                  Add section field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
              </>
            )}
        </Form.List> */}
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
                <div
                  key={field.key}
                  className="border-gray-300 border-[1px] rounded-lg my-5 p-2 min-w-[250px]"
                >
                  <div className="flex flex-row items-center">
                    <Form.Item
                      {...field}
                      hidden
                      name={[field.name, "questionID"]}
                      key={[field.key, "t1"]}
                    >
                      <Input />
                    </Form.Item>
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
                              new Error("Please add at least 2 choices")
                            );
                          }
                        },
                      },
                    ]}
                    style={{ alignSelf: "center" }}
                  >
                    {(answers, { add, remove }, { errors }) => {
                      if (answerType !== "multiple") {
                        answers.map((item) => remove(item.name));
                        answers = [
                          {
                            fieldKey: 0,
                            isListField: true,
                            key: 0,
                            name: 0,
                          },
                        ];
                      }
                      return (
                        <div className="border-gray-300 border-[1px] rounded-lg my-5 p-2 min-w-[250px]">
                          {answers.map((ans, index) => (
                            <div
                              className="flex flex-row items-center"
                              key={ans.key}
                            >
                              {answerType === "multiple" ? (
                                <div
                                  key={ans.key}
                                  className="flex flex-row items-start justify-center w-full"
                                >
                                  <Form.Item
                                    {...ans}
                                    hidden
                                    name={[ans.name, "type"]}
                                    key={[ans.key, "t1"]}
                                    initialValue={"MultipleChoice"}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    {...ans}
                                    name={[ans.name, "answer"]}
                                    key={[ans.key, "a"]}
                                    valuePropName="checked"
                                  >
                                    <Checkbox>Answer</Checkbox>
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
                                  <Tooltip
                                    title="Remove this choice field"
                                    showArrow
                                  >
                                    <div className="mt-1">
                                      <MinusCircleOutlined
                                        onClick={() => remove(ans.name)}
                                      />
                                    </div>
                                  </Tooltip>
                                </div>
                              ) : answerType === "trulse" ? (
                                <div
                                  key={ans.key}
                                  className="flex flex-row items-center justify-center w-full"
                                >
                                  <Form.Item
                                    {...ans}
                                    hidden
                                    name={[ans.name, "type"]}
                                    key={[ans.key, "t2"]}
                                    initialValue={"TrueOrFalse"}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    {...ans}
                                    name={[ans.name, "answer"]}
                                    key={[ans.key, "tof"]}
                                    style={{ margin: 0 }}
                                    wrapperCol={{ span: 24 }}
                                  >
                                    <Radio.Group
                                      size="large"
                                      style={{ width: "100%", marginRight: 10 }}
                                    >
                                      <Radio.Button value={true}>
                                        True
                                      </Radio.Button>
                                      <Radio.Button value={false}>
                                        False
                                      </Radio.Button>
                                    </Radio.Group>
                                  </Form.Item>
                                  <Tooltip
                                    title="Remove this choice field"
                                    showArrow
                                  >
                                    <MinusCircleOutlined
                                      onClick={() => remove(ans.name)}
                                    />
                                  </Tooltip>
                                </div>
                              ) : (
                                <div
                                  key={ans.key}
                                  className="flex flex-row items-center w-full"
                                >
                                  <Form.Item
                                    {...ans}
                                    hidden
                                    name={[ans.name, "type"]}
                                    key={[ans.key, "t3"]}
                                    initialValue={"FillInTheBlank"}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    {...ans}
                                    name={[ans.name, "answer"]}
                                    key={[ans.key, "f"]}
                                    label={`Answer`}
                                    validateTrigger={["onChange", "onBlur"]}
                                    rules={[
                                      {
                                        required: true,
                                        whitespace: true,
                                        message:
                                          "Please input your answer or delete this field.",
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
                                      placeholder={`Answer`}
                                      style={{ width: "100%", marginRight: 10 }}
                                    />
                                  </Form.Item>
                                  <Tooltip title="Remove this field" showArrow>
                                    <MinusCircleOutlined
                                      onClick={() => remove(ans.name)}
                                    />
                                  </Tooltip>
                                </div>
                              )}
                              {/* <Dropdown
                                menu={{ items }}
                                placement="bottomRight"
                                trigger={"click"}
                              >
                                <div className="flex items-center justify-center mb-1">
                                  <Button
                                    icon={<EllipsisOutlined rotate={90} />}
                                    type="ghost"
                                  />
                                </div>
                              </Dropdown> */}
                            </div>
                          ))}
                          {answerType === "multiple" ? (
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
                                icon={<PlusOutlined />}
                              >
                                Add choices
                              </Button>
                              <Form.ErrorList errors={errors} />
                            </Form.Item>
                          ) : (
                            () => form.resetFields()
                          )}
                        </div>
                      );
                    }}
                  </Form.List>
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
