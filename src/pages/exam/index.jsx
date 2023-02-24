import React from "react";
import { PageContext } from "../../lib/context";
import CreateExamView from "./view";

const CreateExam = () => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const values = {
    onFinish,
    formItemLayout,
    formItemLayoutWithOutLabel,
  };
  return (
    <PageContext.Provider value={values}>
      <CreateExamView />
    </PageContext.Provider>
  );
};

export default CreateExam;
