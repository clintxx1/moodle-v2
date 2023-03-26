import React from "react";
import { PageContext } from "../../lib/context";
import auth from "../../lib/services";
import ProfileView from "./view";

const Profile = () => {
  const { firstName, middleName, lastName, email, age, gender, status } =
    auth.getUserInfo();

  const values = {
    firstName,
    middleName,
    lastName,
    email,
    age,
    gender,
    status,
  };

  return (
    <PageContext.Provider value={values}>
      <ProfileView />
    </PageContext.Provider>
  );
};

export default Profile;
