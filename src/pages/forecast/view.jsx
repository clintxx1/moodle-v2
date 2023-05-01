import { Table } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const ForecastView = () => {
  const {
    passData,
    failData,
    columns,
    loadingPassedData,
    loadingFailedData,
    batchPassingRate,
  } = useContext(PageContext);
  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Forecast Records</p>
      </div>
      <div className="flex items-center justfiy-between my-3 self-end border border-gray-300 px-5 py-2 mr-5">
        <p className="text-lg">Batch Passing Rate: &nbsp;</p>
        {batchPassingRate && (
          <div className="text-lg rounded-full bg-gray-300 border-1 border-gray-500 p-5">{`${batchPassingRate}%`}</div>
        )}
      </div>
      <p className="font-semibold text-2xl mx-5 mt-5">Passing Students</p>
      <Table
        key={crypto.randomUUID()}
        loading={loadingPassedData}
        dataSource={passData ?? []}
        columns={columns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
      <p className="font-semibold text-2xl mx-5 mt-5">Failing Students</p>
      <Table
        key={crypto.randomUUID()}
        loading={loadingFailedData}
        dataSource={failData ?? []}
        columns={columns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
    </div>
  );
};

export default ForecastView;
