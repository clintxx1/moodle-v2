import { Table } from "antd";
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
    setSelectedBatch
  } = useContext(PageContext);
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
        style={{ width: "100%", padding: 16 }}
      />
    </div>
  );
};

export default RecordsView;
