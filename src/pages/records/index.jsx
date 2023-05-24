import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { PageContext } from "../../lib/context";
import { fetchAllRecords, getCategories } from "../../lib/api";
import RecordsView from "./view";

const Records = () => {
  const [data, setData] = useState();
  const [categoryData, setCategoryData] = useState();
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [searchData, setSearchData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [batchData, setBatchData] = useState([
    {
      label: "All Batch",
      value: null,
    },
    {
      label: "2023",
      value: 2023,
    },
    {
      label: "2024",
      value: 2024,
    },
    {
      label: "2025",
      value: 2025,
    },
  ])
  const columns = [
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
    // {
    //   title: "Score",
    //   dataIndex: "score",
    //   key: "score",
    //   sorter: (a, b) => a.score - b.score,
    // },
    // {
    //   title: "Percentage",
    //   dataIndex: "percentage",
    //   key: "percentage",
    //   render: (text) => <p>{`${text}%`}</p>,
    //   sorter: (a, b) => a.percentage - b.percentage,
    // },
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
  ];

  const getAllRecords = async () => {
    try {
      const res = await fetchAllRecords({year: selectedBatch ?? 2023});
      if (res?.status === 200) {
        const temp = res?.data?.data
          .filter((e) => e.isComplete)
          .map((item) => {
            return {
              key: item?._id,
              studentId: item?.student?.schoolId,
              studentName: `${item?.student?.firstName} ${
                item?.student?.middleName ?? ""
              } ${item?.student?.lastName}`,
              subject: item?.exam?.title,
              numOfItems: item?.exam?.itemNumber,
              score: item?.score,
              percentage:
                (Number(item?.score) / Number(item?.exam?.itemNumber)) * 100,
              startDate: moment(item?.timeStart).format("LLL"),
              endDate: moment(item?.timeEnd).format("LLL"),
              category: item?.exam?.category,
              preTest: item?.preTest,
              postTest: item?.postTest,
            };
          })
          .sort((a, b) => (a.percentage > b.percentage ? -1 : 1));
        setData(temp);
        setFilteredData(temp);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("RES ERR: ", error);
    }
  };

  const fetchCategories = async () => {
    const res = await getCategories();
    let data = res.data.data;
    if (data.length) {
      const tempData = data.map((val) => {
        return {
          label: val.name,
          value: val._id,
        };
      });
      setCategoryData([{ label: "All Category", value: null }, ...tempData]);
      setCategoryLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    if (searchData) {
      let temp = [];
      if (selectedCategory) {
        temp = data.filter(
          (e) =>
            e.category === selectedCategory &&
            e.studentName.toLowerCase().includes(searchData.toLowerCase())
        );
      } else {
        temp = data.filter((e) =>
          e.studentName.toLowerCase().includes(searchData.toLowerCase())
        );
      }
      setLoading(false);
      setFilteredData(temp);
    } else {
      let temp = [];
      if (selectedCategory) {
        temp = data.filter((e) => e.category === selectedCategory);
      } else {
        temp = data;
      }
      setLoading(false);
      setFilteredData(temp);
    }
  };

  useEffect(() => {
    setLoading(true);
    setCategoryLoading(true);
    getAllRecords();
    fetchCategories();
  }, []);

  useEffect(() => {
    if(selectedBatch){
      getAllRecords();
    }
  }, [selectedBatch])
  

  const values = {
    data,
    columns,
    loading,
    categoryData,
    categoryLoading,
    handleSearch,
    setSearchData,
    filteredData,
    setSelectedCategory,
    batchData,
    setSelectedBatch
  };

  return (
    <PageContext.Provider value={values}>
      <RecordsView />
    </PageContext.Provider>
  );
};

export default Records;
