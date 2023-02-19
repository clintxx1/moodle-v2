import React, { useContext } from "react";
import CourseCard from "../../components/accessedCourseCard";
import Course from "../../components/course";
import CourseOverview from "../../components/courseOverview";
import RecentlyAccessedCourse from "../../components/recentlyAccessedCourses";
import Timeline from "../../components/timeline";
import { PageContext } from "../../lib/context";

const DashboardView = () => {
  const { sampleData } = useContext(PageContext);

  return (
    <div className="flex m-0 h-full w-auto p-0">
      <div className="flex flex-col w-full h-full lg:mr-2 mr-4">
        <div className="flex w-full h-fit lg:mr-2 mr-4 min-h-[300px]">
          <RecentlyAccessedCourse key={1}>
            {sampleData.map((item) => {
              return (
                <CourseCard
                  dept={item.dept}
                  subject={item.subject}
                  key={item.key}
                  id={item.id}
                />
              );
            })}
          </RecentlyAccessedCourse>
        </div>
        <div className="flex w-full h-fit lg:mr-2 mr-4">
          <CourseOverview>
            {sampleData.map((item) => {
              return (
                <Course
                  dept={item.dept}
                  subject={item.subject}
                  progress={item.progress}
                  key={item.key}
                  id={item.id}
                />
              );
            })}
          </CourseOverview>
        </div>
        <div className="flex lg:hidden ml-2 mb-4 mt-0 p-0 h-fit min-h-[300px]">
          <Timeline />
        </div>
      </div>
      <div className="hidden lg:flex w-1/4 lg:h-fit lg:min-h-[794px] pr-2">
        <Timeline />
      </div>
      {/* <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Moodle V2!
          </p>
          <p className="mt-6 text-base lg:text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum
            pulvinar et feugiat blandit at. In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-sm lg:text-base font-semibold leading-7 text-gray-900">
                  {/* {feature.icon} 
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-sm lg:text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardView;
