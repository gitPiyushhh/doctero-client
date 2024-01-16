import React from 'react';
import { redirect } from 'react-router-dom';

function JustThere() {

  return (
    <div className="clear-start flex w-full flex-col items-center justify-center text-stone-800">
      <img
        src="/doctor3.svg"
        alt="icon"
        className="block h-auto w-[24%] animate-[fadeIn_1s_ease-out_3s_forwards] duration-100"
      />

      <span>Taking you to clinic ..</span>
    </div>
  );
}

export default JustThere;
