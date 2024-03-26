import React from 'react'

function PatientDashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='w-full bg-[#7C51C2] flex relative p-12 items-center rounded-lg'>
        <div className='flex flex-col'>
        <span className='text-stone-50 text-[2rem] font-semibold'>{`Welcome back ${user?.name}`}!</span>
        <span className='text-stone-50 text-[1rem] font-light'>Search the doctor you need</span>
        </div>

        <img src="/patient_dash_banner.png" alt="banner_img" className='h-[12rem] w-auto absolute right-[10%] bottom-0'/>
    </div>
  )
}

export default PatientDashboardHeader