import React from 'react';
import { useOutletContext } from 'react-router-dom';

function Category() {
  const handleClick = useOutletContext();
    
  return (
    <div className='flex flex-col items-center justify-center'>
      <span className="text-[2.4rem] font-semibold text-stone-700 ">
        What defines you best ?
      </span>

      <div className="mt-8 flex w-fit justify-between space-x-4">
        <div
          className="cursor-pointer flex-col items-center rounded-md p-6 shadow-md"
          onClick={handleClick}
        >
          <img src="/doctor.svg" alt="doctor" />
          <span className="block text-center text-stone-600">Doctor</span>
        </div>

        <div
          className="cursor-pointer flex-col items-center rounded-md p-6 shadow-md"
          onClick={handleClick}
        >
          <img src="/user.svg" alt="doctor" />
          <span className="block text-center text-stone-600">Patient</span>
        </div>
      </div>
    </div>
  );
}

export default Category;
