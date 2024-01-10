import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Authentication from '../ui/Authentication';

function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="flex h-[100dvh] w-[100vw] bg-[#FAFAFA]">
      {isAuthenticated ? (
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
