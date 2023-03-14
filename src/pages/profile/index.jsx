import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../lib/api";
import { PageContext } from "../../lib/context";
import ProfileView from "./view";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUserDetails() {
      const res = await getUser(params.id);
      setUser(res.data.data[0]);
    }
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = {
    user,
  };

  return (
    <PageContext.Provider value={values}>
      <ProfileView />
    </PageContext.Provider>
  );
};

export default Profile;
