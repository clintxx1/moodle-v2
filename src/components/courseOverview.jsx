import { Select } from "antd";
import React from "react";
import {
  UnorderedListOutlined,
  TableOutlined,
  FunnelPlotFilled,
} from "@ant-design/icons";

const CourseOverview = ({children}) => {
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div className="flex flex-col bg-white p-4 mx-2 mb-2 w-full h-fit border-gray-300 border-[1px]">
    {/* <div className="flex flex-col bg-white p-4 mx-2 md:mb-2 mb-0 w-full h-fit border-gray-300 border-[1px]"> */}
      <div className="text-lg font-extralight">Course overview</div>
      <div className="flex flex-row justify-between">
        <div>
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { label: "All (except hidden)", value: "all" },
              { label: "In progress", value: "progress" },
              { label: "Future", value: "future" },
              { label: "Past", value: "past" },
              {
                label: "Starred",
                value: "starred",
              },
              {
                label: "Hidden",
                value: "hidden",
              },
            ]}
            suffixIcon={<FunnelPlotFilled />}
          />
        </div>
        <div>
          <Select
            defaultValue="course_name"
            style={{ width: 150, marginRight: 4 }}
            onChange={handleChange}
            options={[
              { value: "course_name", label: "Course name" },
              { value: "last_accessed", label: "Last accessed" },
            ]}
            suffixIcon={<UnorderedListOutlined />}
          />
          <Select
            defaultValue="list"
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              { value: "card", label: "Card" },
              { value: "list", label: "List" },
              { value: "summary", label: "Summary" },
            ]}
            suffixIcon={<TableOutlined />}
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CourseOverview;
