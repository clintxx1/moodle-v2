import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, notification, Popconfirm, Space, Tooltip } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import {
  createCategory,
  deleteCategory,
  fetchAllRecords,
  getCategories,
  updateCategory,
} from "../../lib/api";
import RecordsView from "./view";

const Records = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editData, setEditData] = useState();
  // const [name, setName] = useState();
  // const [optionType, setOptionType] = useState();

  // const handleEditOk = async () => {
  //   try {
  //     if (optionType === "Create") {
  //       const res = await createCategory({ name });
  //       if (res.status === 200) {
  //         notification.success({
  //           message: "Create Category",
  //           description: "Category successfully created.",
  //         });
  //         setEditData();
  //         fetchCategories();
  //         setIsModalOpen(false);
  //       } else {
  //         notification.error({
  //           message: "Create Category",
  //           description: "Create failed.",
  //         });
  //       }
  //     } else {
  //       const payload = {
  //         id: editData?.cat_id,
  //         name,
  //       };
  //       const res = await updateCategory(payload);
  //       if (res.status === 200) {
  //         notification.success({
  //           message: "Category Update",
  //           description: "Category successfully updated.",
  //         });
  //         setEditData();
  //         fetchCategories();
  //         setIsModalOpen(false);
  //       } else {
  //         notification.error({
  //           message: "Category Update",
  //           description: "Update failed.",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     message.error(
  //       {
  //         error,
  //       },
  //       3000
  //     );
  //   }
  // };

  // const handleEditCancel = () => {
  //   setEditData();
  //   setIsModalOpen(false);
  // };

  // const handleOk = async (e) => {
  //   try {
  //     setConfirmLoading(true);
  //     const res = await deleteCategory({ id: e.cat_id });
  //     if (res.status === 200) {
  //       notification.success({
  //         message: "Delete Category",
  //         description: "Category successfully deleted.",
  //       });
  //       setEditData();
  //       fetchCategories();
  //       setConfirmLoading(false);
  //     } else {
  //       notification.error({
  //         message: "Delete Category",
  //         description: "Deletion failed.",
  //       });
  //     }
  //   } catch (error) {
  //     message.error(
  //       {
  //         error,
  //       },
  //       3000
  //     );
  //   }
  // };

  // const handleInputChange = (e) => {
  //   setName(e.target.value);
  // };

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Subject Name",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "No. of Items",
      dataIndex: "numOfItems",
      key: "numOfItems",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Exam Started",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Exam Ended",
      dataIndex: "endDate",
      key: "endDate",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space>
    //       <Tooltip title="Edit Profile">
    //         <EditOutlined onClick={() => showModal(record)} />
    //       </Tooltip>
    //       <Tooltip title="Delete Category" key={record.id} trigger={["hover"]}>
    //         <Popconfirm
    //           title="Delete Category"
    //           description="Are you sure you want to delete?"
    //           onConfirm={() => handleOk(record)}
    //           okText="Yes"
    //           cancelText="No"
    //           okButtonProps={{
    //             loading: confirmLoading,
    //           }}
    //         >
    //           <DeleteOutlined />
    //         </Popconfirm>
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];

  // const fetchCategories = async () => {
  //   const res = await getCategories();
  //   let data = res.data.data;
  //   if (data.length) {
  //     const tempData = data.map((val, index) => {
  //       return {
  //         id: index + 1,
  //         name: val.name,
  //         date_modified: moment(val.log.pop().createdAt ?? "").format("LLL"),
  //         cat_id: val._id,
  //         key: val._id,
  //       };
  //     });
  //     setData(tempData);
  //     setLoading(false);
  //   }
  // };

  // const handleCreate = () => {
  //   setEditData();
  //   setOptionType("Create");
  //   setIsModalOpen(true);
  // };

  // const showModal = (data) => {
  //   setIsModalOpen(true);
  //   setEditData(data);
  //   setOptionType("Edit");
  // };

  const getAllRecords = async () => {
    try {
      const res = await fetchAllRecords();
      if (res?.status === 200) {
        const temp = res?.data?.data.map((item) => {
          return {
            studentId: item?.student?.schoolId,
            studentName: `${item?.student?.firstName} ${
              item?.student?.middleName ?? ""
            } ${item?.student?.lastName}`,
            subject: item?.exam?.title,
            numOfItems: item?.exam?.itemNumber,
            score: item?.score,
            startDate: moment(item?.timeStart).format("LLL"),
            endDate: moment(item?.timeEnd).format("LLL"),
          };
        });
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
    // fetchCategories();
  }, []);

  const values = {
    data,
    columns,
    loading,
    // editData,
    // isModalOpen,
    // handleEditOk,
    // handleEditCancel,
    // handleInputChange,
    // optionType,
    // handleCreate,
  };

  return (
    <PageContext.Provider value={values}>
      <RecordsView />
    </PageContext.Provider>
  );
};

export default Records;
