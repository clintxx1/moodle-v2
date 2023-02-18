import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContext } from "../../lib/context";
import { getCollectionDetails } from "../../lib/query";
import CourseView from "./view";

const Course = () => {
  const id = useParams();
  const [collectionData, setCollectionData] = useState();

  useEffect(() => {
    async function fetchCollectionDetail() {
      const res = await getCollectionDetails(id);
      setCollectionData(res.data.data[0]);
    }
    fetchCollectionDetail();
  }, [id]);

  const values = {
    collectionData,
  };
  return (
    <PageContext.Provider value={values}>
      <CourseView />
    </PageContext.Provider>
  );
};

export default Course;
