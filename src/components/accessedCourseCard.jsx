import { Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = (props) => {
  const {
    image,
    _id,
    category: { name: category },
  } = props;
  const navigate = useNavigate();
  const defBackgroundImage = require("../assets/nwssu.png");

  return (
    <div className="flex flex-row w-[250px] items-center justify-center border-gray-300 border-[1px] mr-4 overflow-hidden">
      <img
        onClick={() => navigate(`/course/${_id}`, { state: { ...props } })}
        alt="img"
        src={image ?? defBackgroundImage}
        width={200}
        className="hover:scale-150 transform transition duration-500 cursor-pointer"
      />
      <div className="absolute mt-[136px] flex flex-col items-start bg-gray-300 bg-opacity-60 w-[250px] min-h-[66px] max-h-[66px] p-3">
        <div className="opacity-75">{category}</div>
        <div
          onClick={() => navigate(`/course/${_id}`, { state: { ...props } })}
          className="hover:underline inline-block cursor-pointer min-w-[250px]"
        >
          {category.length > 32 ? (
            <Tooltip placement="bottomRight" title={category}>
              <p>{category.substring(0, 32 - 3) + "..."}</p>
            </Tooltip>
          ) : (
            <p>{category}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
