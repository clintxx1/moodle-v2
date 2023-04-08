import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import { fetchAllRecords } from "../../lib/api";
import RecordsView from "./view";

const Records = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Subject Name",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "No. of Items",
      dataIndex: "numOfItems",
      key: "numOfItems",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Exam Started",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Exam Ended",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];

  const getAllRecords = async () => {
    try {
      const res = await fetchAllRecords();
      if (res?.status === 200) {
        const temp = res?.data?.data
          .filter((e) => e.isComplete)
          .map((item) => {
            return {
              studentId: item?.student?.schoolId,
              studentName: `${item?.student?.firstName} ${
                item?.student?.middleName ?? ""
              } ${item?.student?.lastName}`,
              subject: item?.exam?.title,
              numOfItems: item?.exam?.itemNumber,
              score: item?.score,
              startDate: moment(item?.timeStart).format("LLL"),
              endDate: moment(item?.timeEnd).format("LLL"),
            };
          });
        setData(temp);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("RES ERR: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllRecords();
  }, []);

  const values = {
    data,
    columns,
    loading,
  };

  return (
    <PageContext.Provider value={values}>
      <RecordsView />
    </PageContext.Provider>
  );
};

export default Records;
