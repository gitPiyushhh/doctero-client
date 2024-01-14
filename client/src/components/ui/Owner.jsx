import React from 'react';

function Owner({name}) {
  return (
    <div className="flex h-fit w-full items-center justify-start space-x-4 p-4 mb-2">
      <div className="w-[20%]">
        <img
          src="Owner.avif"
          alt="Owner_image"
          className="blockrounded-sm w-[2.4rem] h-[2.4rem] rounded-md object-cover bg-center"
        />
      </div>

      <div className="flex flex-col items-start justify-between">
        <span className="font-semibold text-stone-50">{name}</span>
      </div>
    </div>
  );
}

export default Owner;