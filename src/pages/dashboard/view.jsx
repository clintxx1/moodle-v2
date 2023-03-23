import { Spin } from "antd";
import React, { useContext } from "react";
import CourseCard from "../../components/accessedCourseCard";
import Course from "../../components/course";
import CourseOverview from "../../components/courseOverview";
import RecentlyAccessedCourse from "../../components/recentlyAccessedCourses";
import Timeline from "../../components/timeline";
import { PageContext } from "../../lib/context";

const DashboardView = () => {
  const { data, loader } = useContext(PageContext);
  return (
    <div className="flex m-0 h-full w-auto p-0">
      <div className="flex flex-col w-full h-full lg:mr-2 mr-4">
        <div className="flex w-full h-fit lg:mr-2 mr-4 min-h-[300px]">
          {loader ? (
            <div className="flex flex-row w-full bg-white items-center justify-center border-gray-300 border-[1px] overflow-hidden m-2">
              <Spin tip="Fetching recently accessed courses..." size="large" />
            </div>
          ) : (
            <RecentlyAccessedCourse>
              {data && data.length > 0 ? (
                data.map((item) => {
                  return <CourseCard key={item._id} {...item} />;
                })
              ) : (
                <div className="flex flex-row items-center justify-center m-2 pt-20 w-full">
                  <p className="text-base italic text-gray-400">
                    No recent course accessed.
                  </p>
                </div>
              )}
            </RecentlyAccessedCourse>
          )}
        </div>
        <div className="flex w-full h-fit lg:mr-2 mr-4">
          {loader ? (
            <div className="flex flex-row w-full min-h-[300px] bg-white items-center justify-center border-gray-300 border-[1px] overflow-hidden m-2">
              <Spin tip="Fetching data..." size="large" />
            </div>
          ) : (
            <CourseOverview>
              {data && data.length > 0 ? (
                data.map((item) => {
                  return <Course {...item} key={item._id} />;
                })
              ) : (
                <div className="flex flex-row items-center justify-center p-36 w-full">
                  <p className="text-base italic text-gray-400">
                    No courses available
                  </p>
                </div>
              )}
            </CourseOverview>
          )}
        </div>
        <div className="flex lg:hidden ml-2 mb-4 mt-0 p-0 h-fit min-h-[300px]">
          <Timeline />
        </div>
      </div>
      <div className="hidden lg:flex w-1/4 lg:h-fit lg:min-h-[794px] pr-2">
        <Timeline>
          <div className="flex flex-row items-center justify-center m-2 mt-5">
            <p className="text-base italic text-gray-400">
              No information found.
            </p>
          </div>
        </Timeline>
      </div>
    </div>
  );
};

export default DashboardView;
