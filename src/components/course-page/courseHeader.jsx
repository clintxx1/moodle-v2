import React from 'react'
import { Link } from 'react-router-dom';

const CourseHeader = ({subject, dept, course, schoolYear = "22-23"}) => {
  return (
    <div className='flex flex-col justify-between w-auto h-[180px] p-6 m-2 border-[1px] bg-white border-gray-300'>
      <div className='font-normal text-3xl'>
        {`${subject ?? '#'} | ${course} | ${dept} | ${schoolYear}`}
      </div>
      <div className='flex flex-row text-green-800 text-base'>
        <Link to={"/dashboard"}>
          <div className='text-green-800 text-base'>Dashboard</div>
        </Link>
        &nbsp; / &nbsp;
        <Link to={"/course"}>
          <div className='text-green-800 text-base'>Courses</div>
        </Link>
        &nbsp; / &nbsp;
      </div>
    </div>
  )
}

export default CourseHeader;