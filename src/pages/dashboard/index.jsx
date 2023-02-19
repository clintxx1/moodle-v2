import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import DashboardView from "./view";
import {
  CloudFilled,
  LockFilled,
  SyncOutlined,
  SecurityScanFilled,
} from "@ant-design/icons";
import { getCollections } from "../../lib/query";

const Dashboard = () => {
  const [sampleData, setSampleData] = useState([
    {
      key: 1,
      dept: "CCIS",
      subject: "CS 404 | BSCS 4 | Test Subject",
      progress: 30,
      id: "63f0ef007b6eab776f0179c1",
    },
    {
      key: 2,
      dept: "COED",
      subject: "SCIENCE | BSSEd 4 | Test Subject",
      progress: 70,
      id: "63f0ef007b6eab776f0179c2",
    },
    {
      key: 3,
      dept: "COM",
      subject: "AGRARIAN REFORM | BSA 4 | Test Subject",
      progress: 100,
      id: "63f0ef007b6eab776f0179c3",
    },
    // {
    //   key: 4,
    //   dept: "CAS",
    //   subject: "SOC.SCI 4 | BSCrim | Test Subject",
    //   progress: 50,
    //   id: "63f0ef007b6eab776f0179c4"
    // },
  ]);
  const features = [
    {
      name: "Sample #1",
      description:
        "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
      icon: <CloudFilled style={{ color: "white" }} />,
    },
    {
      name: "Sample #2",
      description:
        "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
      icon: <LockFilled style={{ color: "white" }} />,
    },
    {
      name: "Sample #3",
      description:
        "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
      icon: <SyncOutlined style={{ color: "white" }} />,
    },
    {
      name: "Sample #4",
      description:
        "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
      icon: <SecurityScanFilled style={{ color: "white" }} />,
    },
  ];

  useEffect(() => {
    async function fetchCollections() {
      const res = await getCollections();
      let data = res.data.data;
      // eslint-disable-next-line
      data.map((item, index) => {
        let tempData = {
          key: index + sampleData.length + 1,
          dept: "CCIS",
          subject: item.name,
          progress: 10,
          id: item._id,
        };
        setSampleData([...sampleData, tempData]);
      });
    }
    fetchCollections();
    // eslint-disable-next-line
  }, []);

  const values = {
    features,
    sampleData,
  };

  return (
    <PageContext.Provider value={values}>
      <DashboardView />
    </PageContext.Provider>
  );
};

export default Dashboard;
