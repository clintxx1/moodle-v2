import React from "react";
import { Route, Routes } from "react-router-dom";
// import { AuthGuard, DashGuard } from "./modules";
// import HomeController from "../pages/dashboard";
import Dashboard from "../pages/dashboard";
import GuestLayout from "../layout/guest";
import Login from "../pages/login";

export default function App() {
  //TODO
  // const [client, setClient] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route path="/home" element={<Dashboard />}/>
      </Route>
      <Route path="/login" element={<Login />} />
      {/**TODO - Remove Switch for now */}
        {/* <Switch> */}
          {/* <AuthGuard exact path="/" component={HomeController}/> */}
          {/* <DashGuard exact path="/dashboard" component={HomeController}/> */}
        {/* </Switch> */}
    </Routes>
  );
}
