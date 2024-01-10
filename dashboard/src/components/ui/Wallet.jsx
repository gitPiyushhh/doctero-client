import React from 'react';

function Wallet() {
  return (
    <div className="flex mx-auto w-[92%] items-center justify-between space-x-4 rounded-md bg-[#353C53] p-2 px-3">
      <div className="bg-[#7f859590] p-2">
        <img src="/wallet.svg" alt="Wallet_icon" />
      </div>

      <div className="w-full flex-col">
        <span className="block w-full text-sm ">Remaining appt.</span>
        <span className="text-md font-semibold">7</span>
      </div>
    </div>
  );
}

export default Wallet;