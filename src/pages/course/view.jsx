import React, { useContext } from "react";
import CourseHeader from "../../components/course-page/courseHeader";
import { PageContext } from "../../lib/context";

const CourseView = () => {
  const { collectionData } = useContext(PageContext);
  return (
    <>
      <div className="w-full">
        {collectionData && (
          <CourseHeader
            key={1}
            subject={collectionData.name}
            dept={"CCIS"}
            course={"BSCS"}
          />
        )}
      </div>
      <div className="flex flex-row items-center justify-center m-2 border-gray-300 border-[1px] bg-white min-h-[300px]">
        <p className="text-3xl italic text-gray-400">No information found.</p>
      </div>
    </>
  );
};

export default CourseView;
