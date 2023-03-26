import React from "react";

const RecentlyAccessedCourse = ({ children }) => {
  return (
    <div className="flex flex-col bg-white p-4 m-2 w-full border-gray-300 border-[1px] overflow-auto">
      <div className="text-lg font-extralight">Recently accessed courses</div>
      <div className="flex flex-row my-4">{children}</div>
    </div>
  );
};

export default RecentlyAccessedCourse;
