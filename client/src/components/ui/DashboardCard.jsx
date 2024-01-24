import React from 'react';

function DashboardCard({ data }) {
  return (
    <div className="flex w-[24%] cursor-pointer  items-center justify-start space-x-6 rounded-md bg-stone-50 py-6 text-stone-700 shadow-md">
      <img
        src={`${data.icon}.svg`}
        alt="Data_icon"
        className="ml-[12%] rounded-md  bg-[#146EB4] p-3"
      />

      <div className="flex flex-col items-start">
        <span className="text-[1.2rem] font-light">{data.name}</span>
        <span className="mt-0 text-[1.6rem] font-bold">{data.value}</span>
      </div>
    </div>
  );
}

export default DashboardCard;
