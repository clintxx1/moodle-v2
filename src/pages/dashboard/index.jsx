import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import DashboardView from "./view";
import { getExam } from "../../lib/api";

const Dashboard = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  //   [
  //   {
  //     key: 1,
  //     dept: "CCIS",
  //     subject: "CS 404 | BSCS 4 | Test Subject",
  //     progress: 30,
  //     id: "63f0ef007b6eab776f0179c1",
  //   },
  //   {
  //     key: 2,
  //     dept: "COED",
  //     subject: "SCIENCE | BSSEd 4 | Test Subject",
  //     progress: 70,
  //     id: "63f0ef007b6eab776f0179c2",
  //   },
  //   {
  //     key: 3,
  //     dept: "COM",
  //     subject: "AGRARIAN REFORM | BSA 4 | Test Subject",
  //     progress: 100,
  //     id: "63f0ef007b6eab776f0179c3",
  //   },
  //   // {
  //   //   key: 4,
  //   //   dept: "CAS",
  //   //   subject: "SOC.SCI 4 | BSCrim | Test Subject",
  //   //   progress: 50,
  //   //   id: "63f0ef007b6eab776f0179c4"
  //   // },
  // ]);

  useEffect(() => {
    setLoader(true);
    async function fetchExams() {
      try {
        const res = await getExam();
        let data = res.data.data;
        // console.log("EXAM: ", data);
        // const examData = data.map((item, index) => {
        //   return {
        //     key: index + data.length + 1,
        //     dept: item.category.name,
        //     subject: item.category.name,
        //     progress: 0,
        //     id: item._id,
        //   };
        // });
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
