import React, { useState } from 'react';

function MedHeader() {
  const [query, setQuery] = useState('');

  return (
    <div className="mt-12 flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <span className="text-[2rem] font-bold text-[#1E2640]">
          Buy medicines, Free Delivery with premium
        </span>
        <span className="text-semibold mt-2 text-lg text-[#1E2640]">
          Explore a vast array of high-quality pharmaceuticals, supplements and
          healthcare products
        </span>

        <div className="mt-8 flex w-full items-center justify-between rounded-lg border-2 bg-stone-50 shadow-lg px-2">
          <input
            type="text"
            className="w-[72%] bg-transparent p-4 text-stone-700 placeholder:text-stone-400 focus:outline-none "
            placeholder="Serach medicines, medical products"
          />

          <div className="h-[25%] w-[2px] rounded-sm bg-[#1E2640]">&nbsp;</div>

          <button className="px-8">Search</button>
        </div>
      </div>
    </div>
  );
}

export default MedHeader;
