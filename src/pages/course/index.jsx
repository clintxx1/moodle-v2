import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecord } from "../../lib/api";
import { PageContext } from "../../lib/context";
import CourseView from "./view";

const Course = () => {
  const navigate = useNavigate();
  const [exam, setExam] = useState();
  const [buttonText, setButtonText] = useState("Attempt Exam");
  const [hasAttempted, setHasAttempted] = useState(false);
  const [isNotOpen, setIsNotOpen] = useState(false);
  const [record, setRecord] = useState()

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
            setButtonText("Continue last attempt");
            setHasAttempted(false);
          }
        } else {
          setButtonText("Attempt Exam");
          setHasAttempted(false);
        }
      }
    } catch (error) {
      console.error("REC ERR: ", error);
    }
  };
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentExam"));
    let today = new Date();
    if (new Date(data.dateTimeStart) < today) {
      setExam(data);
      fetchCurrentRecord(data._id);
      setIsNotOpen(false);
    } else {
      setIsNotOpen(true);
    }
  }, []);

  const values = {
    exam,
    navigate,
    hasAttempted,
    buttonText,
    record,
    isNotOpen,
  };
  return (
    <PageContext.Provider value={values}>
      <CourseView />
    </PageContext.Provider>
  );
};

export default Course;
