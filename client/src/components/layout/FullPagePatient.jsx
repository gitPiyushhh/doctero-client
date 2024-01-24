import React from 'react';

const patients = [
  {
    contact: {
      location: {
        type: 'Point',
        cordinates: [],
      },
      phone: '6666777788',
      address: 'Flat-501, Darshan R Nilaya, Roopena Agrahara ',
      city: 'Alipur',
      state: 'Andaman & Nicobar',
    },
    billing: {
      invoices: [],
    },
    _id: '65afbf511750d5d8bde59dc9',
    name: 'Samupatient',
    gender: 'Female',
    numberOfAppointments: 0,
    problems: ['Asthama', 'Hyperension', 'Khasi'],
    amountPaid: 0,
    dob: '03-09-2000',
    amountRemaining: 0,
    __v: 0,
  },
];

function FullPagePatient() {
  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="col-span-4 flex items-center space-x-4">
        <img
          src="/User.png"
          alt="Patient_img"
          className="block h-[3.2rem] w-[3.2rem] rounded-full  bg-center object-cover"
        />

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-stone-700">
            {patients[0].name}
          </span>
          <span className="text-sm text-stone-400">
            {patients[0].contact.address}
          </span>
          <span className="text-sm text-stone-400">
            {patients[0].contact.city}, {patients[0].contact.state}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex w-[30%] flex-col ">
          <span className="text-stone-600">DOB</span>
          <span className="text-md text-stone-400">
            {patients[0]?.dob || 'NA'}
          </span>
        </div>

        <div className="flex w-[30%] flex-col">
          <span className="text-stone-600">Gender</span>
          <span className="text-md text-stone-400">
            {patients[0]?.gender || 'NA'}
          </span>
        </div>

        <div className="flex w-[30%] flex-col">
          <span className="text-stone-600">Weight</span>
          <span className="text-md text-stone-400">
            {patients[0]?.weight || 'NA'}
          </span>
        </div>

        <div className="flex w-[30%] flex-col">
          <span className="text-stone-600">Height</span>
          <span className="text-md text-stone-400">
            {patients[0]?.height || 'NA'}
          </span>
        </div>

        <div className="flex w-[30%] flex-col">
          <span className="text-stone-600">Last appointment</span>
          <span className="text-md text-stone-400">
            {patients[0]?.activeTill || 'NA'}
          </span>
        </div>

        <div className="flex w-[30%] flex-col">
          <span className="text-stone-600">Started from</span>
          <span className="text-md text-stone-400">
            {patients[0]?.startedFrom || 'NA'}
          </span>
        </div>
      </div>

      <div className='flex space-x-4'>
        {patients[0].problems.map((problem) => (
          <span className="px-2 rounded-sm py-1 text-sm bg-stone-100 text-stone-500">{problem}</span>
        ))}
      </div>

      <div className='flex space-x-4'>
        <div className='bg-[#146EB4] px-4 py-3 items-center w-fit flex space-x-2 rounded-md cursor-pointer'>
          <img src="/phone.svg" alt="phone_icon" className=''/>

          <span className='text-sm'>{patients[0]?.contact.phone}</span>
        </div>
        
        <div className='border-[#146EB4] border-[1px] items-center px-4 py-3 w-fit flex space-x-2 rounded-md cursor-pointer'>
          <img src="/document.svg" alt="phone_icon" className='w-[1rem] h-[1rem]'/>

          <span className='text-sm text-[#146EB4]'>Documents</span>
        </div>
      </div>
    </div>
  );
}

export default FullPagePatient;
