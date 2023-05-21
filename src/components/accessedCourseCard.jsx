import { Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = (props) => {
  const {
    _id,
    category: { name: category },
  } = props;
  const navigate = useNavigate();
  const defBackgroundImage = require("../assets/nwssu.png");

  let image = null;

  switch (props.category.name) {
    case "SOIL SCIENCE":
      image = require("../assets/soilScience.png");
      break;
    case "ANIMAL SCIENCE":
      image = require("../assets/animalScience.jpg");
      break;
    case "CROP PROTECTION":
      image = require("../assets/cropProtection.jpg");
      break;
    case "CROP SCIENCE":
      image = require("../assets/cropScience.jpg");
      break;
    case "ECONOMICS, AGRICULTURAL AND MARKETING":
      image = require("../assets/agriMarket.jpg");
      break;
    case "AGRICULTURAL EXTENSION AND COMMUNICATION":
      image = require("../assets/com.jpg");
      break;
    default:
      image = defBackgroundImage;
      break;
  }

  const handleGoToCourse = () => {
    localStorage.setItem("currentExam", JSON.stringify(props));
    navigate(`/course/${_id}`);
  };

  return (
    <div className="flex flex-row min-w-[250px] w-[250px] max-w-[250px] items-center justify-center border-gray-300 border-[1px] mr-4 overflow-hidden relative">
      <div className="boxImage h-full w-full">
        <img
          onClick={handleGoToCourse}
          alt="img"
          src={image ?? defBackgroundImage}
          className="hover:scale-150 duration-500 cursor-pointer"
        />
      </div>
      <div className="absolute mt-[183px] flex flex-col items-start bg-gray-300 bg-opacity-70 w-[250px] min-h-[66px] max-h-[66px] p-3">
        <p className="opacity-75 text-ellipsis w-[250px] whitespace-nowrap overflow-hidden max-w-[225px]">
          {category}
        </p>
        <div
          onClick={handleGoToCourse}
          className="hover:underline inline-block cursor-pointer min-w-[250px]"
        >
          <Tooltip placement="bottomLeft" title={category}>
            <p className="font-semibold text-ellipsis w-[250px] whitespace-nowrap overflow-hidden max-w-[225px]">
              {category}
            </p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
