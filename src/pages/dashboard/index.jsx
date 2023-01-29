import React from "react";
import { PageContext } from "../../lib/context";
import DashboardView from "./view";

const Dashboard = () => {
  return (
    <PageContext.Provider value={{ text: "hello" }}>
      <DashboardView />
    </PageContext.Provider>
  );
};

export default Dashboard;
