import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Authentication from '../ui/Authentication';
import Onboarding from './Onboarding';

function AppLayout() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem('token');

  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem('user'));

  const aadharNumber = user?.aadharNumber;

  return (
    <div className="flex h-[100dvh] w-[100vw] bg-[#FAFAFA]">
      {token ? (
        aadharNumber ? (
          <>
            <Sidebar />
            <Outlet />
          </>
        ) : (
          <>
            <Onboarding />
          </>
        )
      ) : (
        <>
          <Authentication />
        </>
      )}
    </div>
  );
}

export default AppLayout;
