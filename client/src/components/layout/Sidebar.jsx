import React from 'react';

import Owner from '../ui/Owner';
import SidebarButton from '../ui/SidebarButton';
import Logout from '../ui/Logout';

const metaDataDoctor = [
  { icon: 1, name: 'Home', to: '/dashboard' },
  { icon: 2, name: 'Appointments', to: '/appointments' },
  { icon: 3, name: 'Patients ', to: '/patients' },
  { icon: 4, name: 'Billing', to: '/billings' },
  { icon: 5, name: 'Videos', to: '/videos' },
  { icon: 7, name: 'Tele-consultancy', to: '/tele-consultancy' },
  { icon: 6, name: 'Medstore', to: '/medstore' },
  { icon: 15, name: 'AI diagnose', to: '/ai-med-help' },
];

const metaDataPatient = [
  { icon: 1, name: 'Home', to: '/patient/dashboard' },
  { icon: 2, name: 'Appointments', to: '/appointments' },
  { icon: 4, name: 'Billing', to: '/billings' },
  { icon: 5, name: 'Videos', to: '/videos' },
  { icon: 7, name: 'Tele-consultancy', to: '/patient/tele-consultancy' },
  { icon: 6, name: 'Medstore', to: '/medstore' },
  { icon: 15, name: 'AI diagnose', to: '/ai-med-help' },
];

function Sidebar() {
  const userObj = JSON.parse(localStorage.getItem('user'));
  const  user  = userObj?.name;
  const isDoctor = userObj.isDoctor;

  return (
    <div className={`absolute left-0 top-0 flex h-[100dvh] w-[16%] flex-col ${isDoctor ? 'bg-[#082F4F]' : 'bg-[#7C51C2]'}`}>
      <Owner name={user}/>

      
      {isDoctor ? metaDataDoctor.map((item) => (
        <SidebarButton
          icon={item.icon}
          name={item.name}
          to={item.to}
          key={item.to}
        />
      )) : metaDataPatient.map(item  => <SidebarButton icon={item.icon} name={item.name} to={item.to} key={item.to}/>)}

      <div className="absolute bottom-4 w-[100%]">
        <Logout />
      </div>
    </div>
  );
}

export default Sidebar;
