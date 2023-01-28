import React, { useState } from "react";
import { Route } from "react-router-dom";
import { AuthGuard, DashGuard } from "./modules";
import HomeController from "../pages/home";

export default function App() {
  //TODO
  const [client, setClient] = useState(null);

  return (
    <Route>
      {/**TODO - Remove Switch for now */}
        {/* <Switch> */}
          <AuthGuard exact path="/" component={HomeController}/>
          <DashGuard exact path="/dashboard" component={HomeController}/>
        {/* </Switch> */}
    </Route>
  );
}
