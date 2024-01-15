import React, { useState } from 'react';

function Onboarding() {
  /*
    UI state
  */
  const [slideValue, setSlideValue] = useState(0);

  console.log("Vardhan onboarded..")
  console.log("Vardhan onboarded..")

  /*
    Event handlers
  */
  function handleClick() {
    setSlideValue(50);
  }

  return (
    <div className="flex h-[100bh] w-full items-center justify-center">
      <div className="relative flex h-[88%] w-[64%] flex-col items-center justify-center rounded-lg bg-stone-50 p-[4rem] shadow-lg">
        <div className="absolute left-0 top-0 h-4 w-full rounded-t-md bg-stone-200"></div>

        <div
          className="absolute left-0 top-0 h-4 rounded-r-md rounded-t-md bg-[#146EB4]"
          style={{
            width: `${slideValue}%`,
            transition: 'width 0.3s ease-in-out',
          }}
        ></div>

        <style>
          {`
            #slider::-webkit-slider-thumb {
              background-color: transparent; /* Transparent thumb color */
              transition: background-color 0.3s ease-in-out; /* Transition effect */
            }
            #slider::-moz-range-thumb {
              background-color: transparent; /* Transparent thumb color */
              transition: background-color 0.3s ease-in-out; /* Transition effect */
            }
          `}
        </style>

        <span className="text-[2.4rem] font-semibold text-stone-700 ">
          What defines you best ?
        </span>

        <div className="mt-8 flex w-fit justify-between space-x-4">
          <div
            className="cursor-pointer flex-col items-center rounded-md p-6 shadow-md"
            onClick={handleClick}
          >
            <img src="doctor.svg" alt="doctor" />
            <span className="block text-center text-stone-600">Doctor</span>
          </div>

          <div
            className="cursor-pointer flex-col items-center rounded-md p-6 shadow-md"
            onClick={handleClick}
          >
            <img src="user.svg" alt="doctor" />
            <span className="block text-center text-stone-600">Patient</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
