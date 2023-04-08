import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getExam,
  updateCategory,
} from "../../lib/api";
import { PageContext } from "../../lib/context";
import auth from "../../lib/services";
import ExamView from "./view";
import { Popconfirm, Space, Tooltip, message, notification } from "antd";
import { DeleteOutlined, EditOutlined, FolderOpenOutlined } from "@ant-design/icons";

const Exam = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState();
  const [name, setName] = useState();
  const [optionType, setOptionType] = useState();

  const handleEditOk = async () => {
    try {
      if (optionType === "Create") {
        const res = await createCategory({ name });
        if (res.status === 200) {
          notification.success({
            message: "Create Category",
            description: "Category successfully created.",
          });
          setEditData();
          fetchCategories();
          setIsModalOpen(false);
        } else {
          notification.error({
            message: "Create Category",
            description: "Create failed.",
          });
        }
      } else {
        const payload = {
          id: editData?.cat_id,
          name,
        };
        const res = await updateCategory(payload);
        if (res.status === 200) {
          notification.success({
            message: "Category Update",
            description: "Category successfully updated.",
          });
          setEditData();
          fetchCategories();
          setIsModalOpen(false);
        } else {
          notification.error({
            message: "Category Update",
            description: "Update failed.",
          });
        }
      }
    } catch (error) {
      message.error(
        {
          message: "Category Error",
          description: error,
        },
        3000
      );
    }
  };

  const handleEditCancel = () => {
    setEditData();
    setIsModalOpen(false);
  };

  const handleOk = async (e) => {
    try {
      setConfirmLoading(true);
      const res = await deleteCategory({ id: e.cat_id });
      if (res.status === 200) {
        notification.success({
          message: "Delete Category",
          description: "Category successfully deleted.",
        });
        setEditData();
        fetchCategories();
        setConfirmLoading(false);
      } else {
        notification.error({
          message: "Delete Category",
          description: "Deletion failed.",
        });
      }
    } catch (error) {
      message.error(
        {
          error,
        },
        3000
      );
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const handleCreate = () => {
    navigate("/create-exam");
  };

  const fetchExam = async () => {
    try {
      let id = {};
      if (auth.getRole() === "student") id = auth.getUserInfo()?._id;
      const res = await getExam(id);
      let data = res.data.data;
      if (data.length > 0) {
        const tempData = data.map((val, index) => {
          return {
            ...val,
            no: index + 1,
            id: val?._id,
            time_start: moment(val?.dateTimeStart).format("LLL"),
            time_end: moment(val?.dateTimeEnd).format("LLL"),
            duration: val?.duration,
            item_number: val?.itemNumber,
            category: val?.category?.name,
            questions: val?.questions,
            date_modified: moment(val?.log.pop()?.createdAt).format("LLL"),
          };
        });
        setData(tempData);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Start",
      dataIndex: "time_start",
      key: "time_start",
    },
    {
      title: "End",
      dataIndex: "time_end",
      key: "time_end",
    },
    {
      title: "Duration (hours)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Date modified",
      dataIndex: "date_modified",
      key: "date_modified",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Exam Details">
            <FolderOpenOutlined onClick={handleGoToCourse} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const categoryColumns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Last modified",
      dataIndex: "date_modified",
      key: "date_modified",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit Profile">
            <EditOutlined onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Delete Category" key={record.id} trigger={["hover"]}>
            <Popconfirm
              title="Delete Category"
              description="Are you sure you want to delete?"
              onConfirm={() => handleOk(record)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                loading: confirmLoading,
              }}
            >
              <DeleteOutlined />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const fetchCategories = async () => {
    const res = await getCategories();
    let data = res.data.data;
    if (data.length) {
      const tempData = data.map((val, index) => {
        return {
          id: index + 1,
          name: val.name,
          date_modified: moment(val.log.pop().createdAt ?? "").format("LLL"),
          cat_id: val._id,
          key: val._id,
        };
      });
      setCategoryData(tempData);
      setCategoryLoading(false);
    }
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    setEditData(data);
    setOptionType("Edit");
  };

  const handleCategoryCreate = () => {
    setEditData();
    setOptionType("Create");
    setIsModalOpen(true);
  };

  const handleGoToCourse = () => {
    localStorage.setItem("currentExam", JSON.stringify(data[0]));
    navigate(`/course/${data[0]?.id}`);
  };

  useEffect(() => {
    setLoading(true);
    fetchExam();

    setCategoryLoading(true);
    fetchCategories();
  }, []);

  const values = {
    onFinish,
    categoryData,
    categoryColumns,
    categoryLoading,
    handleCategoryCreate,
    data,
    loading,
    handleCreate,
    columns,
    isModalOpen,
    handleEditOk,
    handleEditCancel,
    editData,
    handleInputChange,
    optionType,
  };
  return (
    <PageContext.Provider value={values}>
      <ExamView />
    </PageContext.Provider>
  );
};

export default Exam;
