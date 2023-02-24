import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import GuestLayout from "../layout/guest";
import auth from "../lib/services";

export const PublicLayout = () => {
  const outlet = useOutlet();
  if (auth.isAuthenticated()) {
    return <Navigate replace to={"/dashboard"} />;
  }

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {outlet}
    </div>
  );
};

export const PrivateLayout = () => {
  if (!auth.isAuthenticated()) {
    return <Navigate replace to={"/login"} />;
  }
  if (auth.getExpiration() * 1000 < Date.now()) {
    auth.clear();
  }

  return <GuestLayout />;
};
