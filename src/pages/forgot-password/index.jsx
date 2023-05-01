import React, { useState } from "react";
import { PageContext } from "../../lib/context";
import LoginView from "./view";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { changePassword, checkIfAccountExist } from "../../lib/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [studentId, setStudentId] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const handleSubmit = async (e) => {
    try {
      const res = await changePassword(e);
      if (res?.status === 200) {
        notification.success({
          message: "Change Password",
          description: "Password successfully change",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log("ERR: ", error.message);
    }
  };

  const handleCheckAccount = async () => {
    try {
      const payload = {
        schoolId: studentId,
        email: email,
      };
      const res = await checkIfAccountExist(payload);
      if (res?.data?.isActive) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    } catch (error) {
      console.log("ERR: ", error.message);
    }
  };

  const values = {
    handleSubmit,
    navigate,
    email,
    setEmail,
    studentId,
    setStudentId,
    isAvailable,
    handleCheckAccount,
  };
  return (
    <PageContext.Provider value={values}>
      <LoginView />
    </PageContext.Provider>
  );
};

export default ForgotPassword;
