import { Table } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const RecordsView = () => {
  const { data, columns, loading } = useContext(PageContext);
  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Student Records</p>
      </div>
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
    </div>
  );
};

export default RecordsView;
