import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div>
      <Navbar />

      {/* // Get all the children routes here */}
      <Outlet />
    </div>
  );
}

export default AppLayout;
