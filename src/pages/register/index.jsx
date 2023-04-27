import { Form, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../lib/api";
import { PageContext } from "../../lib/context";
import RegisterView from "./view";
import { PlusOutlined } from "@ant-design/icons";
// import { S3 } from "aws-sdk";
// import axios from "axios";

// const s3 = new S3({
//   apiVersion: "2006-03-01",
//   signatureVersion: "v4",
//   region: "ap-southeast-2",
//   credentials: {
//     accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//     secretAccessKey: process.env.REACT_APP_SECRET_KEY,
//   },
// });

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = () => setPreviewOpen(true);

  const profilePhotoRequest = ({ file, onSuccess }) => {
    getBase64(file, (url) => {
      setPreviewImage(url);
      onSuccess("ok");
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="mt-2">Upload</div>
    </div>
  );

  const handleBeforeUpload = (value) => {
    console.log("PROP?: ", value);
    if (value.fileList.length === 0) {
      return true;
    }
    const isJpgOrPng =
      value.file.type === "image/jpeg" || value.file.type === "image/png";
    const isLt2M = value.file.size / 1024 / 1024 < 2;
    return isJpgOrPng && isLt2M;
  };

  const handlePhotoRemove = () => {
    setPreviewImage("");
  };

  const handleSubmit = async (e) => {
    try {
      // let Key = "";
      // if (e.profilePic) {
      //   const imageExt = e?.profilePic?.file.type.split("/")[1];
      //   Key = `${crypto.randomUUID()}.${imageExt}`;
      //   const s3Params = {
      //     Bucket: "thesisss-bucket",
      //     Key,
      //     Expires: 60,
      //     ContentType: `image/${imageExt}`,
      //   };

      //   const uploadUrl = s3.getSignedUrl("putObject", s3Params);
      //   await axios.put(uploadUrl, e?.profilePic?.file);
      // }
      // delete e?.profilePic;

      // const payload = {
      //   ...e,
      //   profileImage: Key,
      // };
      const res = await register(e);
      if (res.status === 400) {
        notification.error({
          message: "Account Registration",
          description: "Creating an account failed.",
        });
      } else if (res.status === 401) {
        notification.error({
          message: "Account Registration",
          description: "Email is already taken",
        });
      } else {
        notification.success({
          message: "Account Registration",
          description: "Registration successful. Waiting for approval.",
        });
        navigate("/login");
      }
    } catch (error) {
      notification.error({
        message: "Account Registration",
        description: error.response.data.message,
      });
    }
  };

  // useEffect(() => {
  //   console.log(previewImage);
  // }, [previewImage])

  const values = {
    handleSubmit,
    form,
    handleCancel,
    handlePreview,
    handleBeforeUpload,
    previewImage,
    previewOpen,
    uploadButton,
    profilePhotoRequest,
    handlePhotoRemove,
  };
  return (
    <PageContext.Provider value={values}>
      <RegisterView />
    </PageContext.Provider>
  );
};

export default Register;
