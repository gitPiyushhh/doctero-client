import React, { Children, useState } from 'react';
import Category from '../ui/Category';
import { Outlet } from 'react-router-dom';

function Onboarding() {
  /*
    UI state
  */
  const [slideValue, setSlideValue] = useState(0);

  /*
    Event handlers
  */
  function handleClick() {
    setSlideValue(50);
  }

  return (
    <div className="flex h-[100bh] w-full items-center justify-center">
      <div className="relative flex h-[88%] w-[64%] flex-col items-center justify-center rounded-lg bg-stone-50 p-[2rem] shadow-lg">
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

        <Outlet context={handleClick} />
      </div>
    </div>
  );
}

export default Onboarding;
