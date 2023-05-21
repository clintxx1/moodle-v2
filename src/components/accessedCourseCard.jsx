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
  
  let image = null
  
  switch (props.category.name) {
    case "SOIL SCIENCE":
      image = require("../assets/soilScience.png")
      break;
    case "ANIMAL SCIENCE":
      image = require("../assets/animalScience.jpg")
      break;
    case "CROP PROTECTION":
      image = require("../assets/cropProtection.jpg")
    break;
    case "CROP SCIENCE":
      image = require("../assets/cropScience.jpg")
      break;
    case "ECONOMICS, AGRICULTURAL AND MARKETING":
      image = require("../assets/agriMarket.jpg")
        break;
    case "AGRICULTURAL EXTENSION AND COMMUNICATION":
      image = require("../assets/com.jpg")
      break;
    default:
      image = defBackgroundImage
      break;
  }

  const handleGoToCourse = () => {
    localStorage.setItem("currentExam", JSON.stringify(props));
    navigate(`/course/${_id}`);
  };

  return (
    <div className="flex flex-row min-w-[250px] w-[250px] items-center justify-center border-gray-300 border-[1px] mr-4 overflow-hidden relative">
      <img
        onClick={handleGoToCourse}
        alt="img"
        src={image ?? defBackgroundImage}
        width={200}
        className="hover:scale-150 transform transition duration-500 cursor-pointer"
      />
      <div className="absolute mt-[136px] flex flex-col items-start bg-gray-300 bg-opacity-60 w-[250px] min-h-[66px] max-h-[66px] p-3">
        <p className="opacity-75">
          {category.length > 30 ? (
            <p>{category.substring(0, 30 - 3) + "..."}</p>
          ) : (
            <p>{category}</p>
          )}
        </p>
        <div
          onClick={handleGoToCourse}
          className="hover:underline inline-block cursor-pointer min-w-[250px]"
        >
          {category.length > 30 ? (
            <Tooltip placement="bottomRight" title={category}>
              <p>{category.substring(0, 30 - 3) + "..."}</p>
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
