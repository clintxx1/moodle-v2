import { Button, Col, Progress, Row } from "antd";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Course = (props) => {
  const {
    progress = 50,
    _id,
    category: { name: category },
    title,
  } = props;
  const navigate = useNavigate();

  const handleGoToCourse = () => {
    localStorage.setItem("currentExam", JSON.stringify(props));
    navigate(`/course/${_id}`);
  };

  return (
    <div className="flex flex-row items-center w-full border-gray-300 border-[1px] my-3 min-h-[80px]">
      <div className="hidden md:flex md:flex-row w-full ">
        <Col span={22}>
          <Row gutter={12}>
            <Col span={12}>
              <div className="opacity-75 pl-5 pt-3">{category}</div>
            </Col>
            <Col span={12}>
              <div className="mt-2 mr-5">
                <Progress percent={progress} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div
                onClick={handleGoToCourse}
                className="pl-5 pb-3 hover:underline inline-block cursor-pointer"
              >
                {title}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={2}>
          <div className="flex items-center h-full justify-center">
            <Button icon={<EllipsisOutlined rotate={90} />} />
          </div>
        </Col>
      </div>
      <div className="flex flex-row items-center w-full md:hidden">
        <Col span={22}>
          <Row>
            <Col span={12}>
              <div className="opacity-75 pl-5">{category}</div>
            </Col>
            <Col span={12}>
              <div className="pl-5 hover:underline inline-block cursor-pointer">
                {category}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="mt-2 mx-5">
                <Progress percent={progress} />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={2}>
          <div className="self-end m-1">
            <Button icon={<EllipsisOutlined rotate={90} />} />
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Course;
