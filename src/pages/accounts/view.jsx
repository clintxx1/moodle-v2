import { Button, Table } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const AccountsView = () => {
  const { columns, loading, data, navigate } = useContext(PageContext);
  return (
    <div className="flex flex-col w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-bold text-3xl m-5">Accounts</p>
      </div>
      <div className="self-end mr-4">
        <Button onClick={() => navigate("/register-teacher")} type="primary">
          Create Teacher
        </Button>
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

export default AccountsView;
