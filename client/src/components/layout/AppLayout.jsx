import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './Sidebar';
import Authentication from '../ui/Authentication';

function AppLayout() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem('token');
  
  return (
    <div className="flex h-[100dvh] w-[100vw] bg-[#FAFAFA]">
      {token ? (
        <>
          <Sidebar />
          <Outlet />
        </>
      ) : (
        <>
          <Authentication />
        </>
      )}
    </div>
  );
}

export default AppLayout;
