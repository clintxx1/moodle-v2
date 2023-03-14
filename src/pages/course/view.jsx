import { Button, Descriptions } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import CourseHeader from "../../components/course-page/courseHeader";
import { PageContext } from "../../lib/context";

const CourseView = () => {
  const { exam, navigate, hasAttempted, buttonText, record } =
    useContext(PageContext);
  return (
    <>
      {exam ? (
        <>
          <div className="w-full">
            <CourseHeader key={exam?._id} {...exam} />
          </div>
          <div className="flex flex-col m-2 border-gray-300 border-[1px] bg-white min-h-[300px] p-4">
            <Descriptions title="Examination details" bordered>
              <Descriptions.Item label="Exam name">
                {exam?.category.name}
              </Descriptions.Item>
              <Descriptions.Item label="No. of items">
                {exam?.itemNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Duration">{`${exam?.duration}${
                exam?.duration === 1 ? "hr" : "hrs"
              }`}</Descriptions.Item>
              <Descriptions.Item label="Exam start date" span={2}>
                {moment(exam?.dateTimeStart).format("LLL")}
              </Descriptions.Item>
              <Descriptions.Item label="Exam end date" span={2}>
                {moment(exam?.dateTimeEnd).format("LLL")}
              </Descriptions.Item>
              {hasAttempted && (
                <Descriptions.Item label="Score" span={24}>
                  {`${record?.score} out of ${exam?.itemNumber}`}
                </Descriptions.Item>
              )}
            </Descriptions>
            <div className="flex flex-row w-full justify-center mt-12">
              <Button
                hidden={hasAttempted}
                type="primary"
                onClick={() => navigate(`/exam/${exam?._id}/attempt`)}
              >
                {buttonText}
              </Button>
              {hasAttempted && (
                <p className="italic text-gray-400">
                  No additional attempts allowed.
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row items-center justify-center m-2 border-gray-300 border-[1px] bg-white min-h-[300px]">
          <p className="text-3xl italic text-gray-400">No information found.</p>
        </div>
      )}
    </>
  );
};

export default CourseView;
