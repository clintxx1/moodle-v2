import React from "react";
import { Link } from "react-router-dom";

const CourseHeader = (props) => {
  const {
    schoolYear = "22-23",
    course = "BS in Agricuture",
    category: { name="" } = {},
    title,
    description,
  } = props;
  return (
    <div className="flex flex-col justify-between w-auto h-[180px] p-6 m-2 border-[1px] bg-white border-gray-300">
      <div className="font-normal text-3xl">
        {`${name ?? "#"} | ${course} | ${title ?? "#"} | ${schoolYear}`}
      </div>
      <div className="text-sm text-gray-400">
        {description ?? ""}
      </div>
      <div className="flex flex-row text-green-800 text-base">
        <Link to={"/dashboard"}>
          <div className="text-green-800 text-base">Dashboard</div>
        </Link>
        &nbsp; / &nbsp;
        <Link to={"/dashboard"}>
          <div className="text-green-800 text-base">Courses</div>
        </Link>
        &nbsp; / &nbsp;
      </div>
    </div>
  );
};

export default CourseHeader;
