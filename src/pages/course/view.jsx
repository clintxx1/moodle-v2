import { Button, Descriptions, Modal, Tooltip } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import CourseHeader from "../../components/course-page/courseHeader";
import { PageContext } from "../../lib/context";
import auth from "../../lib/services";

const CourseView = () => {
  const {
    exam,
    navigate,
    hasAttempted,
    buttonText,
    record,
    isNotOpen,
    fetchStudentsWithoutRec,
    isModalOpen,
    showModal,
    handleCancel,
    isTaken,
    isForecastOpen,
    setIsForecastOpen,
    handleOpenForecast,
  } = useContext(PageContext);
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
                {exam?.category.name ?? exam?.category}
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
              <Descriptions.Item label="Forecast" span={2}>
                <Button type="link" onClick={handleOpenForecast}>Show Forecast</Button>
              </Descriptions.Item>
              {hasAttempted && (
                <Descriptions.Item label="Score" span={24}>
                  {`${
                    record?.score
                      ? `${record?.score} out of ${exam?.itemNumber}`
                      : "Not available"
                  }`}
                </Descriptions.Item>
              )}
            </Descriptions>
            <div className="flex flex-row w-full justify-center mt-12">
              {isNotOpen ? (
                <p className="italic text-gray-400 mb-8">Exam is not open.</p>
              ) : (
                <>
                  {auth.getRole() === "student" && (
                    <Button
                      hidden={hasAttempted}
                      type="primary"
                      onClick={() => navigate(`/exam/${exam?._id}/attempt`)}
                    >
                      {buttonText}
                    </Button>
                  )}
                  {auth.getRole() === "admin" && (
                    <>
                      {!isTaken ? (
                        <Tooltip title="By clicking this button, it will force to start the exam timer on this current category for all students.">
                          <Button type="primary" onClick={showModal}>
                            Start Examination
                          </Button>
                        </Tooltip>
                      ) : (
                        <p className="italic text-gray-400 mb-8">
                          All students have started taking the examination.
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
              {hasAttempted && (
                <p className="italic text-gray-400 mb-8">
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
      <Modal
        title="Start Exam"
        open={isModalOpen}
        onOk={fetchStudentsWithoutRec}
        onCancel={handleCancel}
        width={350}
      >
        <p>Are you sure you want to start the examination for all students?</p>
      </Modal>
      <Modal
        title="Student Forecast"
        open={isForecastOpen}
        footer={[]}
        onCancel={() => setIsForecastOpen(false)}
      >
        {/**TODO */}
        <div className="flex flex-col items-center justify-between">
          {/**CHART */}
          <div>
            {/**BAR CHART HERE */}
          </div>
          {/**RECORD */}
          <div>
            <p>{`${auth.getUserInfo().firstName} ${auth.getUserInfo().middleName ? `${auth.getUserInfo().middleName[0]}.` : ''} ${auth.getUserInfo().lastName}`}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CourseView;
