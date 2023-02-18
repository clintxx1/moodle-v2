import React, { useContext } from "react";
import CourseHeader from "../../components/course-page/courseHeader";
import { PageContext } from "../../lib/context";

const CourseView = () => {
  const { collectionData } = useContext(PageContext);
  return (
    <div>
      {collectionData && (
        <CourseHeader
          key={1}
          subject={collectionData.name}
          dept={"CCIS"}
          course={"BSCS"}
        />
      )}
    </div>
  );
};

export default CourseView;
