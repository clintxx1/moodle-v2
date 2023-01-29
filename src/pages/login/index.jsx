import React, { useRef } from "react";
import { PageContext } from "../../lib/context";
import LoginView from "./view";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO - Add auth function to pass payload
    console.log("email: ", emailRef.current.value);
    console.log("password: ", passwordRef.current.value);
  };

  const values = {
    handleSubmit,
    emailRef,
    passwordRef,
  };
  return (
    <PageContext.Provider value={values}>
      <LoginView />
    </PageContext.Provider>
  );
};

export default Login;
