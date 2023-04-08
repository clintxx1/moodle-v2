import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import DashboardView from "./view";
import { getExam } from "../../lib/api";

const Dashboard = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoader(true);
    async function fetchExams() {
      try {
        const res = await getExam();
        let data = res.data.data;
        setData(data);
        setLoader(false);
      } catch (error) {
        console.error("ERR: ", error);
        setLoader(false);
        setData([]);
      }
    }
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
