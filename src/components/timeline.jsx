import { UnorderedListOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";

const Timeline = () => {
  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div className="flex flex-col bg-white p-4 m-2 w-full h-full border-gray-300 border-x-[1px] border-y-[1px]">
      <div className="text-lg font-extralight">Timeline</div>
      <div className="flex flex-row items-center justify-between mt-2">
        <Select
          dropdownStyle={{
            width: "100px",
          }}
          dropdownMatchSelectWidth={false}
          onChange={handleChange}
          options={[
            { value: "all", label: "All" },
            { value: "overdue", label: "Overdue" },
          ]}
          suffixIcon={<FieldTimeOutlined />}
        />
        <Select
          dropdownStyle={{
            width: "150px",
          }}
          dropdownMatchSelectWidth={false}
          onChange={handleChange}
          options={[
            { value: "by_dates", label: "Sort by dates" },
            { value: "by_courses", label: "Sort by courses" },
          ]}
          suffixIcon={<UnorderedListOutlined />}
        />
      </div>
    </div>
  );
};

export default Timeline;
