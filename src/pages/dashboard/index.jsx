/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import DashboardView from "./view";
import { fetchExamPercentage, getExam } from "../../lib/api";
import auth from "../../lib/services";

const Dashboard = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const fetchExams = async () => {
    try {
      const res = await getExam();
      let data = res.data.data;
      setData(data);
      setLoader(false);
      if (auth.getRole() === "student") {
        fetchStudentRecords();
      }
    } catch (error) {
      console.error("ERR: ", error);
      setLoader(false);
      setData([]);
    }
  };

  const fetchStudentRecords = async () => {
    try {
      const examPayload = data?.map((item) => item?._id);
      console.log("DATA: ", data);
      if (examPayload.length) {
        const res = await fetchExamPercentage({
          exam: examPayload,
          user: auth.getUserInfo().id,
        });
        if (res?.status === 200) {
          const result = res?.data?.data;
          if (result && result?.length > 0) {
            const temp = data.map((item) => {
              let progress = 0;
              const t2 = result.filter((e) => e.exam === item._id);
              if (t2.length > 0) {
                progress = t2.length > 2 ? 100 : (t2.length / 2) * 100;
              }
              return {
                ...item,
                progress,
              };
            });
            setData(temp);
          }
        }
      }
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  useEffect(() => {
    if (data) {
      fetchStudentRecords();
    }
  }, [data]);

  useEffect(() => {
    setLoader(true);
    fetchExams();
  }, []);

  const values = {
    data,
    loader,
  };

  return (
    <PageContext.Provider value={values}>
      <DashboardView />
    </PageContext.Provider>
  );
};

export default Dashboard;
