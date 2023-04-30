import { CheckCircleOutlined } from "@ant-design/icons";
import { Descriptions, Image, Tag } from "antd";
import React, { useContext } from "react";
import { PageContext } from "../../lib/context";
import auth from "../../lib/services";
import person from "../../assets/person.jpg";

const ProfileView = () => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    age,
    gender,
    status,
    image = person,
  } = useContext(PageContext);

  return (
    <div className="w-auto items-start min-h-[500px] bg-white border-[1px] border-gray-300 m-2">
      <div className="overflow-hidden bg-white sm:rounded-lg">
        <div className="flex items-center justify-between py-5 px-20">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Account Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and additional details.
            </p>
          </div>
          {/* <Image
            src={image}
            alt="a-person"
            preview={false}
            height={170}
            width={170}
            // style={{ borderRadius: 80 }}
          /> */}
        </div>
        <div className="flex items-center justify-center py-5 px-20">
          <Descriptions bordered style={{ width: "100%" }}>
            <Descriptions.Item label="First name">
              {firstName ?? "--"}
            </Descriptions.Item>
            <Descriptions.Item label="Middle name">
              {middleName ?? "--"}
            </Descriptions.Item>
            <Descriptions.Item label="Last name">
              {lastName ?? "--"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {email ?? "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Age">{age ?? "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Gender">
              {gender ?? "N/A"}
            </Descriptions.Item>
            {auth.getRole() !== "superadmin" && (
              <Descriptions.Item label="Account Status">
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {status ?? "N/A"}
                </Tag>
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
