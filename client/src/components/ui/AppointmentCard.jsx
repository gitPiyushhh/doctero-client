import React from 'react';

function AppointmentCard({ data, isActive, handleCardClick }) {
  return (
    <div className={`my-2 flex w-full items-center justify-between px-4 py-4 ${isActive && 'bg-blue-50'} rounded-md cursor-pointer`} onClick={() => handleCardClick(data)}>
      <div className="flex items-center space-x-4">
        <img
          src="/User.png"
          alt="Patient_img"
          className=" block h-[2.4rem] w-[2.4rem]  rounded-full bg-center object-cover"
        />
        <div className="flex flex-col">
          <span className={`text-md font-semibold  ${isActive ? 'text-[#146EB4]' : 'text-stone-700'}  `}>
            {data?.patient.name || 'Name'}
          </span>
          <span className={`text-sm ${isActive ? 'text-[#146fb4d7]' : 'text-stone-400'}`}>
            {data?.notes || 'Notes here'}
          </span>
        </div>
      </div>

      <span className={`text-lg block font-bold ${isActive ? 'text-[#146EB4]' : 'text-stone-700'}`}>{data?.startTime > 12 ? `${Math.round(data.startTime % 12)}:00 PM` : `${data.startTime}:00 AM`}</span>
    </div>
  );
}

export default AppointmentCard;
