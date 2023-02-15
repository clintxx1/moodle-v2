import { Col } from "antd";
import { Row } from "antd";
import React, { useContext } from "react";
import CourseOverview from "../../components/courseOverview";
import RecentlyAccessedCourse from "../../components/recentlyAccessedCourses";
import Timeline from "../../components/timeline";
import { PageContext } from "../../lib/context";

const DashboardView = () => {
  const { features } = useContext(PageContext);
  return (
    <div className="flex m-0 h-full w-auto p-0">
      <div className="flex flex-col w-full h-full md:mr-2 mr-4">
        <div className="flex flex-col w-full h-full md:mr-2 mr-4 min-h-[300px]">
          <RecentlyAccessedCourse />
        </div>
        <div className="flex flex-col w-full h-full md:mr-2 mr-4 min-h-[300px]">
          <CourseOverview />
        </div>
        <div className="block md:hidden mb-4 mt-0 p-0 h-full min-h-[300px]">
          <Timeline />
        </div>
      </div>
      <div className="hidden md:flex flex-col w-1/5 h-full pr-4">
        <Timeline />
      </div>
      {/* <Row gutter={12}>
        <Col>1</Col>
        <Col>2</Col>
      </Row>
      <Row gutter={12}>
        <Col>3</Col>
        <Col>4</Col>
      </Row>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
