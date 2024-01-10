import React from 'react';
import { CiSearch, CiCircleQuestion } from 'react-icons/ci';

function Header() {
  return (
    <div className="flex h-[8%] p-8 w-full items-center justify-between bg-stone-50 shadow-md">
      <div className="flex items-center justify-between space-x-4 text-stone-900">
        <span className="text-[20px] font-medium tracking-[1px]">Payouts</span>
        <span className="flex items-center text-[14px]">
          <CiCircleQuestion size={24} />{' '}
          <span className="ml-1"> How it works</span>
        </span>
      </div>

      <input
        type="text"
        placeholder="Search features tutorials etc"
        className=" bottom-1 h-[64%] w-[30%] rounded-md border bg-[#f2f2f2] py-4 pl-4 placeholder:text-[14px] placeholder:text-stone-600"
      />

      <div className="flex items-center space-x-2">
        <div className="h-[80%] flex items-center justify-center rounded-full bg-stone-200 p-3">
          <img src="/message.svg" alt="icon_img" className='block w-[16px] h-[16px]'/>
        </div>

        <div className="flex h-[80%] items-center justify-center rounded-full bg-stone-200 p-3">
          <img src="/dropdown.svg" alt="icon_img" className='block w-[16px] h-[16px]' />
        </div>
      </div>
    </div>
  );
}

export default Header;