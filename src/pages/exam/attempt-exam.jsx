import { Button, Descriptions, Form, Radio, Tag, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseHeader from "../../components/course-page/courseHeader";
import { attemptExam, updateRecord, submitExam, getRecord } from "../../lib/api";

const AttemptExam = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const params = useParams();
  const timerRef = useRef(null);
  const [exam, setExam] = useState();
  // const [page, setPage] = useState();
  const [recordId, setRecordId] = useState();
  const [showResult, setShowResult] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [buttonText, setButtonText] = useState("Next");
  // const [buttonType, setButtonType] = useState("button");
  const [timer, setTimer] = useState("00:00:00");
  const [fetchTime, setFetchTime] = useState(0)

  // const handleNextQuestion = () => {
  //   if (currentPage === page) return;
  //   setCurrentPage((page) => page + 1);
  // };

  const updateCurrentRecord = async (question, answer) => {
    
    const payload = {
      exam: params?.id,
      question: question?._id,
      answer,
    };
    if (fetchTime.getTime() >= new Date().getTime()){
      const res = await updateRecord(payload);
      if (res.status === 201) {
        setRecordId(res.data.record?._id);
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const res = await submitExam({_id:exam.record._id});
    if (res.status === 200) {
      navigate(`/course/${exam?.exam?._id}`);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      async function attemptExamination() {
        // const testid = recordId
        try {
          const res = await attemptExam({ exam: params.id});
          // console.log(res.data.exam)
          setExam(res?.data);
          // setRecordId(res?.data.record._id)

          //TIME
          if (res?.data?.record) {
            let deadline = new Date(res?.data?.record?.timeStart);
            deadline.setHours(deadline.getHours() + res?.data?.exam?.duration);
            if(deadline.getTime() >= new Date().getTime()){
              setFetchTime(deadline);
              clearTimer(deadline);
            } else {
              handleSubmit();
            }
          }

          //PAGE
          // let maxPage = res?.data?.exam?.quetions?.length;
          // if (maxPage > 5) {
          //   setPage(Math.ceil(maxPage / 5));
          // } else {
          //   setPage(1);
          // }
        } catch (error) {
          if (error?.response?.status === 401) {
            notification.error({
              message: "Exam Progress",
              description: error?.response?.data?.message ?? "Something went wrong."
            })
            handleSubmit();
            setShowResult(true);
          }
          console.error("EXAM ERR: ", error);
        }
      }
      attemptExamination();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = async (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    timerRef.current = id;
  };

  // const handlePrevQuestion = () => {
  //   if (currentPage === 1) {
  //     return;
  //   }
  //   setCurrentPage((p) => p - 1);
  // };

  const getCurrentChoice = (questionId) => {
    let filteredQuestion = exam.record.answers.filter(
      (f) => f.question === questionId
    );

    if (!filteredQuestion) return null;
    return filteredQuestion[0]?.answer;
  };

  // useEffect(() => {
  //   if (currentPage === page) {
  //     setButtonText("Submit");
  //     setButtonType("submit");
  //   }
  // }, [currentPage, page]);

  return (
    <>
      <div className="w-full">
        <CourseHeader key={exam?.exam?._id} {...exam?.exam} />
      </div>
      <div className="flex flex-col m-2 border-gray-300 border-[1px] bg-white min-h-[300px] p-4">
        {!showResult ? (
          <>
            <p className="self-end text-base text-gray-500">{`Time Remaining: ${timer}`}</p>
            <div className="flex w-full justify-center mt-3">
              <Form
                style={{ width: "100%" }}
                onFinish={handleSubmit}
                form={form}
              >
                {exam &&
                  exam?.exam?.questions.map((q, index) => {
                    return (
                      <div
                        key={q?._id}
                        className="flex flex-col ml-5 justify-between"
                      >
                        <Form.Item
                          key={[index, "question"]}
                          name={[index, "question"]}
                          initialValue={q?._id}
                          style={{ margin: 0 }}
                        >
                          <p className="font-semibold">{`${index + 1}. ${
                            q?.question
                          }`}</p>
                        </Form.Item>
                        <Form.Item
                          key={[index, "choices"]}
                          name={[index, "answer"]}
                          initialValue={getCurrentChoice(q._id)}
                        >
                          <Radio.Group>
                            {q?.choices.map((c, index) => {
                              return (
                                <Radio
                                  key={[q?._id, index, "choice"]}
                                  value={c}
                                  onChange={(e) =>
                                    updateCurrentRecord(q, e.target.value)
                                  }
                                >
                                  {c}
                                </Radio>
                              );
                            })}
                          </Radio.Group>
                        </Form.Item>
                      </div>
                    );
                  })}
                <div className="flex flex-row items-center justify-between p-4">
                  <div>
                    {/* {currentPage > 1 && (
                      <Button type="primary" onClick={handlePrevQuestion}>
                        Previous
                      </Button>
                    )} */}
                    <Button
                      type="primary"
                      htmlType="submit"
                      // htmlType={`${buttonType}`}
                      // onClick={handleNextQuestion}
                    >
                      {/* {buttonText} */}
                      Submit
                    </Button>
                  </div>
                  {/* <span>{`Page ${currentPage} of ${page}`}</span> */}
                </div>
              </Form>
            </div>
          </>
        ) : (
          <div className="flex flex-col m-2 border-gray-300 border-[1px] bg-white min-h-[300px] p-4">
            <Descriptions title="Examination Result" bordered layout="vertical">
              <Descriptions.Item label="Attempt">
                {exam?.category?.name ?? 1}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {exam?.itemNumber ?? <Tag color={"error"}>Incomplete</Tag>}
              </Descriptions.Item>
              <Descriptions.Item label="Grade/100">
                {`${exam?.score ? exam?.score : "Not available"}`}
              </Descriptions.Item>
            </Descriptions>
            <div className="flex flex-row w-full justify-center mt-12">
              <Button type="primary" onClick={() => navigate("/dashboard")}>
                Go to dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttemptExam;
