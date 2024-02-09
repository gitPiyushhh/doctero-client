import React from "react";

function Owner({ name }) {
  return (
    <div className="mb-2 flex h-fit w-full items-center md:justify-start justify-center  md:space-x-4 p-0 md:p-4">
      <div className="md:w-[20%] w-full flex justify-center">
        <img
          src="/Owner.avif"
          alt="Owner_image"
          className="block h-[2.4rem] w-[2.4rem] rounded-md  bg-center object-cover"
        />
      </div>

      <div className="flex flex-col items-start justify-between">
        <span className="font-semibold text-stone-50 hidden md:block">
          {name}
        </span>
      </div>
    </div>
  );
}

export default Owner;
