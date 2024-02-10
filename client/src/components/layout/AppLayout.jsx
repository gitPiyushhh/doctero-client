import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import Authentication from "../ui/Authentication";

function AppLayout() {
  const navigate = useNavigate();

  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const isOnboard = user?.isOnboard;

  useEffect(
    function () {
      token && !isOnboard && navigate("/category");
    },
    [navigate, isOnboard, token]
  );

  return (
    <div className="flex fixed bottom-0 h-[100dvh] w-[100vw] bg-[#FAFAFA]">
      {token ? (
        isOnboard ? (
          <>
            <Sidebar />
            <Outlet />
          </>
        ) : (
            <Outlet />
        )
      ) : (
        <Authentication />
      )}
    </div>
  );
}

export default AppLayout;
