import { Descriptions, Table } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";
import { Input, Button, Select } from "antd";

const RecordsView = () => {
  const {
    columns,
    loading,
    categoryData,
    categoryLoading,
    handleSearch,
    setSearchData,
    filteredData,
    setSelectedCategory,
    batchData,
    setSelectedBatch,
  } = useContext(PageContext);

  const testResult = (record) => {
    if (record?.preTest && record?.postTest) {
      return (
        <div key={record?.key}>
          <Descriptions title={"Pretest"} bordered>
            <Descriptions.Item label="Score" span={4}>
              {record?.preTest?.score}
            </Descriptions.Item>
            <Descriptions.Item label="Percentage" span={4}>
              {(Number(record?.preTest?.score) / Number(record?.numOfItems)) *
                100}
              %
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title={"Posttest"} bordered>
            <Descriptions.Item label="Score" span={4}>
              {record?.postTest?.score}
            </Descriptions.Item>
            <Descriptions.Item label="Percentage" span={4}>
              {(Number(record?.postTest?.score) / Number(record?.numOfItems)) *
                100}
              %
            </Descriptions.Item>
          </Descriptions>
        </div>
      );
    } else if (record?.preTest) {
      return (
        <Descriptions title={"Pretest"} bordered key={record?.key}>
          <Descriptions.Item label="Score" span={4}>
            {record?.preTest?.score}
          </Descriptions.Item>
          <Descriptions.Item label="Percentage" span={4}>
            {(Number(record?.preTest?.score) / Number(record?.numOfItems)) *
              100}
            %
          </Descriptions.Item>
        </Descriptions>
      );
    } else if (record?.postTest) {
      return (
        <Descriptions title={"Posttest"} bordered key={record?.key}>
          <Descriptions.Item label="Score" span={4}>
            {record?.postTest?.score}
          </Descriptions.Item>
          <Descriptions.Item label="Percentage" span={4}>
            {(Number(record?.postTest?.score) / Number(record?.numOfItems)) *
              100}
            %
          </Descriptions.Item>
        </Descriptions>
      );
    } else {
      return (
        <p className="text-gray-500 italic text-center">No Record Found</p>
      );
    }
  };

  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Student Records</p>
      </div>
      <div className="flex flex-row w-full items-center justify-start gap-3 m-5">
        <p className="font-semibold text-base">Search: </p>
        <Input
          placeholder="Enter Student Name"
          style={{ width: "30%" }}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <Select
          loading={categoryLoading}
          options={categoryData}
          defaultValue={null}
          style={{ width: "10%" }}
          onChange={(e) => setSelectedCategory(e)}
        />
        <Select
          // loading={selectedBatch}
          options={batchData}
          defaultValue={null}
          style={{ width: "10%" }}
          onChange={(e) => setSelectedBatch(e)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Table
        loading={loading}
        dataSource={filteredData}
        columns={columns}
        bordered
        expandable={{
          expandedRowRender: (record) => testResult(record),
        }}
        style={{ width: "100%", padding: 16 }}
      />
    </div>
  );
};

export default RecordsView;
