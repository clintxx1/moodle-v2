import { Tooltip } from "antd";
import React from "react";

const CourseCard = ({ dept, subject, image }) => {
  const defBackgroundImage = require("../assets/nwssu.png");

  return (
    <div className="flex flex-row w-[250px] items-center justify-center border-gray-300 border-x-[1px] border-y-[1px] mr-4 overflow-hidden">
      <img
        src={image ?? defBackgroundImage}
        width={200}
        className="hover:scale-150 transform transition duration-500 cursor-pointer"
      />
      <div className="absolute mt-[136px] flex flex-col items-start bg-gray-300 bg-opacity-60 w-[250px] min-h-[66px] max-h-[66px] p-3">
        <div className="opacity-75">{dept}</div>
        <div className="hover:underline inline-block cursor-pointer min-w-[250px]">
          {subject.length > 32 ? (
            <Tooltip placement="bottomRight" title={subject}>
              <p>{subject.substring(0, 32 - 3) + "..."}</p>
            </Tooltip>
          ) : (
            <p>{subject}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
