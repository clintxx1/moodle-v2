import React from "react";
import { PageContext } from "../../lib/context";
import DashboardView from "./view";
import {
  CloudFilled,
  LockFilled,
  SyncOutlined,
  SecurityScanFilled,
} from "@ant-design/icons";

const Dashboard = () => {
  const features = [
    {
      name: "Sample #1",
      description:
        "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
      icon: <CloudFilled style={{color: 'white'}} />,
    },
    {
      name: "Sample #2",
      description:
        "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
      icon: <LockFilled style={{color: 'white'}} />,
    },
    {
      name: "Sample #3",
      description:
        "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
      icon: <SyncOutlined style={{color: 'white'}} />,
    },
    {
      name: "Sample #4",
      description:
        "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
      icon: <SecurityScanFilled style={{color: 'white'}} />,
    },
  ];

  const values = {
    features,
  };

  return (
    <PageContext.Provider value={values}>
      <DashboardView />
    </PageContext.Provider>
  );
};

export default Dashboard;
