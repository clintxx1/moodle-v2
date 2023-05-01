import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import { fetchAllUsers } from "../../lib/api";
import RecordsView from "./view";
import { useNavigate } from "react-router-dom";

const Accounts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "School ID",
      dataIndex: "schoolId",
      key: "schoolId",
      sorter: (a, b) => (a.schoolId > b.schoolId ? 1 : -1),
    },
    {
      title: "Account Name",
      dataIndex: "studentName",
      key: "studentName",
      sorter: (a, b) =>
        a.studentName.toLowerCase() > b.studentName.toLowerCase() ? 1 : -1,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) =>
        a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => (a.role.toLowerCase() > b.role.toLowerCase() ? 1 : -1),
    },
    {
      title: "Account Created",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => (moment(a.createdAt) > moment(b.createdAt) ? 1 : -1),
    },
  ];

  const getAllRecords = async () => {
    try {
      const res = await fetchAllUsers();
      if (res?.status === 200) {
        const temp = res?.data?.data
          .map((item) => {
            return {
              ...item,
              key: item?._id,
              role: item?.role === "admin" ? "teacher" : item?.role,
              studentName: `${item?.lastName}, ${item?.firstName} ${
                item?.middleName ? `${item?.middleName[0]}.` : ""
              } `,
              createdAt: moment(item?.createdAt).format("LLL"),
            };
          })
          .sort((a, b) =>
            a.studentName.toLowerCase() > b.studentName.toLowerCase() ? 1 : -1
          );
        setData(temp);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("RES ERR: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllRecords();
  }, []);

  const values = {
    data,
    columns,
    loading,
    navigate,
  };

  return (
    <PageContext.Provider value={values}>
      <RecordsView />
    </PageContext.Provider>
  );
};

export default Accounts;
