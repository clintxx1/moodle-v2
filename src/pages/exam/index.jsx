import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExam } from "../../lib/api";
import { PageContext } from "../../lib/context";
import auth from "../../lib/services";
import ExamView from "./view";

const Exam = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const handleCreate = () => {
    navigate("/create-exam");
  };

  const fetchExam = async () => {
    try {
      let id = {};
      if (auth.getRole() === "student") id = auth.getUserInfo()?._id;
      const res = await getExam(id);
      let data = res.data.data;
      if (data.length) {
        const tempData = data.map((val, index) => {
          return {
            no: index + 1,
            id: val?._id,
            time_start: moment(val?.dateTimeStart).format("LLL"),
            time_end: moment(val?.dateTimeEnd).format("LLL"),
            duration: val?.duration,
            item_number: val?.itemNumber,
            category: val?.category?.name,
            questions: val?.questions,
            date_modified: moment(val?.log.pop()?.createdAt).format("LLL"),
          };
        });
        setData(tempData);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Start",
      dataIndex: "time_start",
      key: "time_start",
    },
    {
      title: "End",
      dataIndex: "time_end",
      key: "time_end",
    },
    {
      title: "Duration (hours)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Date modified",
      dataIndex: "date_modified",
      key: "date_modified",
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetchExam();
  }, []);

  const values = {
    onFinish,
    data,
    loading,
    handleCreate,
    columns,
  };
  return (
    <PageContext.Provider value={values}>
      <ExamView />
    </PageContext.Provider>
  );
};

export default Exam;
