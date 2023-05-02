import { Button, Descriptions, Input, Modal, Tooltip } from "antd";
import moment from "moment";
import React, { useContext } from "react";
import CourseHeader from "../../components/course-page/courseHeader";
import { PageContext } from "../../lib/context";
import auth from "../../lib/services";

const CourseView = () => {
  const {
    exam,
    handleAttemptExam,
    hasAttempted,
    buttonText,
    record,
    isNotOpen,
    fetchStudentsWithoutRec,
    isModalOpen,
    showModal,
    handleCancel,
    isTaken,
    isClose,
    checkExamKey,
    setCheckExamKey,
    handleGoToExam,
    handleExamKeyChange,
    examKeyChange,
    errorMsg,
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
              {hasAttempted && record?.length > 0 && (
                <>
                  <Descriptions.Item label="Pretest Score">
                    {`${
                      record[0]?.score >= 0
                        ? `${record[0]?.score} out of ${exam?.itemNumber}`
                        : "Not available"
                    }`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Posttest Score">
                    {`${
                      record[1]?.score >= 0
                        ? `${record[1]?.score} out of ${exam?.itemNumber}`
                        : "Not available"
                    }`}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
            <div className="flex flex-row w-full justify-center mt-12">
              {isNotOpen ? (
                <p className="italic text-gray-400 mb-8">Exam is not open.</p>
              ) : isClose ? (
                <p className="italic text-gray-400 mb-8">Exam is close.</p>
              ) : (
                <>
                  {auth.getRole() === "student" && (
                    <Button
                      hidden={hasAttempted}
                      type="primary"
                      onClick={handleAttemptExam}
                    >
                      {buttonText}
                    </Button>
                  )}
                  {["admin", "superadmin"].includes(auth.getRole()) && (
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
        title="Attempt Exam"
        open={checkExamKey}
        onOk={handleGoToExam}
        onCancel={() => setCheckExamKey(false)}
        width={350}
      >
        <p>Please enter exam key</p>
        <Input.Password
          value={examKeyChange}
          onChange={handleExamKeyChange}
          autoFocus={true}
        />
        {errorMsg && (
          <div className="italic text-xs ml-1 text-red-600">{errorMsg}</div>
        )}
      </Modal>
    </>
  );
};

export default CourseView;
