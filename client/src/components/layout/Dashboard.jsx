import React from 'react';
import Header from '../ui/Header';
import DashboardCard from '../ui/DashboardCard';
import AppointmentCard from '../ui/AppointmentCard';
import PatientFullPage from './FullPagePatient';

function Dashboard() {
  /*
    Meta data
  */
  const cardsMetaData = [
    {
      icon: 3,
      name: 'Patients',
      value: '666',
    },
    {
      icon: 4,
      name: 'Income',
      value: '$2,111',
    },
    {
      icon: 2,
      name: 'Appointments',
      value: '211',
    },
    {
      icon: 5,
      name: 'Videos',
      value: '7',
    },
  ];

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Header name="Dashboard" />

      {/* Cards */}
      <div className="my-8 flex items-center justify-between px-8">
        {cardsMetaData.map((card) => (
          <DashboardCard data={card} />
        ))}
      </div>

      {/* Today appointments */}
      <div className="mt-12 flex w-full items-stretch justify-between pl-8">
        <div className=" flex w-[40%] flex-col items-start justify-between gap-2">
          <span className="text-md text-stone-500">Today appointments</span>
          <div className="flex h-[23rem] w-full flex-col overflow-scroll rounded-md bg-white px-4 py-2 shadow-sm">
            {cardsMetaData.map((appointment) => (
              <>
                <AppointmentCard isActive={true}/>
                <AppointmentCard />
              </>
            ))}
          </div>
        </div>

        <div className=" flex w-[64%] flex-col items-start justify-between gap-2 px-8">
          <span className="text-md text-stone-500">Patient details</span>
          <div className="flex h-full w-full flex-col rounded-md bg-white px-8 py-4 shadow-sm">
            <PatientFullPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
