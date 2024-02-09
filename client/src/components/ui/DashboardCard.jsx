import React from 'react';

function DashboardCard({ data }) {
  return (
    <div className="flex flex-col md:flex-row md:w-[24%] w-[49%] cursor-pointer items-start gap-2 md:gap-0 md:items-center justify-start md:space-x-6 rounded-md bg-stone-50 py-4 md:py-6 text-stone-700 shadow-md">
      <img
        src={`${data.icon}.svg`}
        alt="Data_icon"
        className="ml-2 md:ml-[12%] rounded-md  bg-[#146EB4] p-3"
      />

      <div className="flex md:flex-col items-center md:items-start w-full justify-between px-2 md:p-0">
        <span className="text-md md:text-[1.2rem] font-light md:ml-0">{data.name}</span>
        <span className="mt-0 text-[1rem] md:text-[1.6rem] font-bold">{data.value}</span>
      </div>
    </div>
  );
}

export default DashboardCard;
