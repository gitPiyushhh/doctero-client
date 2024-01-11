import React from 'react';
import { FaAngleDown } from 'react-icons/fa';

function Owner({name}) {
  return (
    <div className="flex h-fit w-full items-center justify-start space-x-4 p-4 mb-2">
      <div className="w-[20%]">
        <img
          src="Owner.png"
          alt="Owner_image"
          className="block h-full w-auto rounded-sm"
        />
      </div>

      <div className="flex flex-col items-start justify-between">
        <span className="font-semibold text-stone-50">{name}</span>

        <span className="font-underline text-sm text-stone-400 underline decoration-stone-10 decoration-[0.5px] underline-offset-4">
          Visit store
        </span>
      </div>

      <div className="flex flex-1 justify-end pr-1">
        <FaAngleDown size={24} />
      </div>
    </div>
  );
}

export default Owner;