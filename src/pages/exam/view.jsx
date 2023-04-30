import { Button, Divider, Input, Modal, Table } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const ExamView = () => {
  const {
    data,
    columns,
    loading,
    handleCreate,
    categoryData,
    categoryColumns,
    categoryLoading,
    handleCategoryCreate,
    isModalOpen,
    handleEditOk,
    handleEditCancel,
    editData,
    handleInputChange,
    optionType,
  } = useContext(PageContext);
  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Category</p>
        <div className="pr-4">
          <Button
            type="primary"
            size="large"
            onClick={handleCategoryCreate}
            style={{ width: "100%" }}
          >
            Create Category
          </Button>
        </div>
      </div>
      <Table
        loading={categoryLoading}
        dataSource={categoryData}
        columns={categoryColumns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
      <Divider />
      <Modal
        title={`${optionType} Category`}
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <div key={editData?.name}>
          <label>Category Name:</label>
          <Input
            required
            defaultValue={editData?.name || ""}
            onChange={handleInputChange}
          />
        </div>
      </Modal>
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Exam</p>
        <div className="pr-4">
          <Button
            type="primary"
            size="large"
            onClick={handleCreate}
            style={{ width: "100%" }}
          >
            Create Exam
          </Button>
        </div>
      </div>
      <Table
        loading={loading}
        dataSource={data ?? []}
        columns={columns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
    </div>
  );
};

export default ExamView;
