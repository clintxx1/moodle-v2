import React from "react";
import { Route, Routes } from "react-router-dom";
// import { AuthGuard, DashGuard } from "./modules";
// import HomeController from "../pages/dashboard";
import Dashboard from "../pages/dashboard";
import GuestLayout from "../layout/guest";
import Login from "../pages/login";
import ErrorPage from "../pages/error";

export default function App() {
  //TODO
  // const [client, setClient] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<GuestLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Dashboard />} errorElement={<ErrorPage />} />
        {/* <Route path="/home" element={<Dashboard />}  errorElement={<ErrorPage />} /> */}
      </Route>
      <Route path="/error-page" element={<ErrorPage />} errorElement={<ErrorPage />}/>
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />}/>
      {/**TODO - Remove Switch for now */}
        {/* <Switch> */}
          {/* <AuthGuard exact path="/" component={HomeController}/> */}
          {/* <DashGuard exact path="/dashboard" component={HomeController}/> */}
        {/* </Switch> */}
    </Routes>
  );
}
