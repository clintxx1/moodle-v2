import React from "react";
import { Route, redirect } from "react-router-dom";
import GuestLayout from "../layout/guest";

export const AuthGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem(process.env.REACT_APP_LS_TOKEN) ? (
          <Component {...props} />
        ) : (
          redirect("/home")
        )
      }
    />
  );
};

export const DashGuard = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem(process.env.REACT_APP_LS_TOKEN) ? (
            <GuestLayout>
              <Component {...props} />
            </GuestLayout>
        ) : (
          redirect("/")
        )
      }
    />
  );
};
