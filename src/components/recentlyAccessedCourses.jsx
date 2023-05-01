import React from "react";

const RecentlyAccessedCourse = ({ children }) => {
  return (
    <div className="flex flex-col bg-white p-4 m-2 border-gray-300 border-[1px] w-full">
      <div className="text-lg font-extralight">Recently accessed courses</div>
      <div className="flex flex-row my-4 overflow-x-auto max-w-[1300px]">{children}</div>
    </div>
  );
};

export default RecentlyAccessedCourse;
