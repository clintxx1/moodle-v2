import { CheckCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";

const ProfileView = () => {
  const { firstName, middleName, lastName, email, age, gender, status } =
    useContext(PageContext);

  return (
    <div className="w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Account Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and additional details.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">First name:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {firstName ?? "N/A"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Middle name:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {middleName ?? "N/A"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Lastname:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {lastName ?? "N/A"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {email ?? "N/A"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Age</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {age ?? "N/A"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
                {gender ?? "N/A"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Account Status:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    {status ?? "N/A"}
                  </Tag>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
