import { Button, Input, Modal, Table } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const CategoryView = () => {
  const {
    data,
    columns,
    loading,
    isModalOpen,
    handleEditOk,
    handleEditCancel,
    editData,
    handleInputChange,
    optionType,
    handleCreate,
  } = useContext(PageContext);
  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Category</p>
        <div className="pr-4">
          <Button type="primary" size="large" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </div>
      <Table
        // rowKey={data?.cat_id}
        loading={loading}
        dataSource={data}
        columns={columns}
        bordered
        style={{ width: "100%", padding: 16 }}
      />
      <Modal
        title={`${optionType} Category`}
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <label>Category Name:</label>
        <Input defaultValue={editData?.name} onChange={handleInputChange} />
      </Modal>
    </div>
  );
};

export default CategoryView;
