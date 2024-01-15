import React from 'react';
import { useSelector } from 'react-redux';

import Owner from '../ui/Owner';
import SidebarButton from '../ui/SidebarButton';
import Wallet from '../ui/Wallet';

const metaData = [
  { icon: 1, name: 'Home', to: '/dashboard' },
  { icon: 2, name: 'Appointments', to: '/appointments' },
  { icon: 3, name: 'Patients ', to: '/patients' },
  { icon: 4, name: 'Billing', to: '/billings' },
  { icon: 5, name: 'Videos', to: '/videos' },
  { icon: 7, name: 'Tele-consultancy', to: '/tele-consultancy' },
  { icon: 6, name: 'Medstore', to: '/medstore' },
];

function Sidebar() {
  const  user  = useSelector((state) => state.auth.user?.name) || JSON.parse(localStorage.getItem('user')).name;

  return (
    <div className="absolute left-0 top-0 flex h-[100dvh] w-[16%] flex-col bg-[#1E2640]">
      <Owner name={user}/>

      {metaData.map((item) => (
        <SidebarButton
          icon={item.icon}
          name={item.name}
          to={item.to}
          key={item.icon}
        />
      ))}

      <div className="absolute bottom-4 w-[100%]">
        <Wallet />
      </div>
    </div>
  );
}

export default Sidebar;
