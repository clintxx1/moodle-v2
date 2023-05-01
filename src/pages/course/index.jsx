import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkExam, forceStartExam, getRecord } from "../../lib/api";
import { PageContext } from "../../lib/context";
import CourseView from "./view";
import { notification } from "antd";

const Course = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState();
  const [buttonText, setButtonText] = useState("Attempt Exam");
  const [hasAttempted, setHasAttempted] = useState(false);
  const [isNotOpen, setIsNotOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [record, setRecord] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [isForecastOpen, setIsForecastOpen] = useState(false);
  const [checkExamKey, setCheckExamKey] = useState(false);
  const [examKeyChange, setExamKeyChange] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchCurrentRecord = async (data) => {
    try {
      const res = await getRecord({ exam: data });
      if (res.status === 200) {
        let data = res.data.data;
        setRecord(data);
        if (data) {
          if (data.isComplete) {
            setHasAttempted(true);
          } else {
            setButtonText(res.data.message);
            setHasAttempted(false);
          }
        } else {
          setButtonText(res.data.message);
          setHasAttempted(false);
        }
      }
    } catch (error) {
      console.error("REC ERR: ", error);
    }
  };

  const handleAttemptExam = () => {
    try {
      if (exam?.password) {
        setCheckExamKey(true);
      }
    } catch (error) {
      console.log("ERR: ", error.message);
    }
  };

  const fetchStudentsWithoutRec = async () => {
    try {
      const res = await forceStartExam({ examId: exam?._id });
      if (res.status === 200) {
        notification.success({
          message: "Start Examination",
          description: "Examination has force started",
        });
        setIsModalOpen(false);
        checkExamProgress(exam?._id);
      }
    } catch (error) {
      console.err("FETCH ERR: ", error);
    }
  };

  const checkExamProgress = async (id) => {
    try {
      const res = await checkExam({ examId: id });
      if (res.status === 200) {
        setIsTaken(res?.data?.isTakenByAll);
      }
    } catch (error) {
      console.error("ERR: ", error);
    }
  };

  const handleGoToExam = () => {
    if (examKeyChange && examKeyChange === exam?.password) {
      setErrorMsg("")
      navigate(`/exam/${exam?._id}/attempt`);
    } else {
      setErrorMsg("Invalid exam key")
    }
  };

  const handleExamKeyChange = (e) => setExamKeyChange(e.target.value);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentExam"));
    let today = new Date();
    setExam(data);
    if (new Date(data.dateTimeStart) < today) {
      fetchCurrentRecord(data._id);
      checkExamProgress(data._id);
      setIsNotOpen(false);
    } else {
      setIsNotOpen(true);
    }

    if (today > new Date(data.dateTimeEnd)) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
  }, []);

  const values = {
    exam,
    navigate,
    hasAttempted,
    buttonText,
    record,
    isNotOpen,
    fetchStudentsWithoutRec,
    isModalOpen,
    showModal,
    handleCancel,
    isTaken,
    isForecastOpen,
    setIsForecastOpen,
    isClose,
    handleAttemptExam,
    checkExamKey,
    setCheckExamKey,
    handleGoToExam,
    handleExamKeyChange,
    examKeyChange,
    errorMsg,
  };
  return (
    <PageContext.Provider value={values}>
      <CourseView />
    </PageContext.Provider>
  );
};

export default Course;
