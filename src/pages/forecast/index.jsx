import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import { getPassingRate } from "../../lib/api";
import ForecastView from "./view";

const Forecast = () => {
  const [passData, setPassData] = useState();
  const [failData, setFailedData] = useState();
  const [loadingPassedData, setLoadingPassedData] = useState(false);
  const [loadingFailedData, setLoadingFailedData] = useState(false);
  const [batchPassingRate, setBatchPassingRate] = useState();

  const columns = [
    {
      title: "STUDENT NAME",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "PASSING RATE",
      dataIndex: "passingRate",
      key: "passingRate",
    },
    {
      title: "PREDICTED SCORE PERCENTAGE",
      dataIndex: "prediction",
      key: "prediction",
    },
  ];

  const getAllRecords = async () => {
    try {
      const res = await getPassingRate();
      if (res?.status === 200) {
        const forecastData = res?.data?.data;
        setBatchPassingRate(res?.data?.rate);
        if (forecastData?.passedStudent.length > 0) {
          const temp = forecastData.passedStudent.map((item) => {
            return {
              key: item?.schoolId,
              studentId: item?.schoolId,
              studentName: `${item?.firstName} ${item?.middleName ?? ""} ${
                item?.lastName
              }`,
              passingRate: item?.passingRate,
              prediction: item?.forecast?.score
                ? `${item?.forecast?.score}%`
                : "",
            };
          });
          setPassData(temp);
        }
        if (forecastData?.failedStudent.length > 0) {
          const temp1 = forecastData.failedStudent.map((item) => {
            return {
              key: item?.schoolId,
              studentId: item?.schoolId,
              studentName: `${item?.firstName} ${item?.middleName ?? ""} ${
                item?.lastName
              }`,
              passingRate: item?.passingRate,
              prediction: item?.forecast?.score
                ? `${item?.forecast?.score}%`
                : "",
            };
          });
          setFailedData(temp1);
        }
        setLoadingPassedData(false);
        setLoadingFailedData(false);
      }
    } catch (error) {
      setLoadingPassedData(true);
      setLoadingFailedData(true);
      console.error("RES ERR: ", error);
    }
  };

  useEffect(() => {
    setLoadingPassedData(true);
    setLoadingFailedData(true);
    getAllRecords();
  }, []);

  const values = {
    passData,
    failData,
    columns,
    loadingPassedData,
    loadingFailedData,
    batchPassingRate,
  };

  return (
    <PageContext.Provider value={values}>
      <ForecastView />
    </PageContext.Provider>
  );
};

export default Forecast;
