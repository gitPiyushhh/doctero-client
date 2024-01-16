import React from 'react';
import { Link } from 'react-router-dom';

function Wallet() {
  return (
    <Link>
      <div className="flex justify-center space-x-2 w-full  py-4">
        <span className="block text-stone-300">Logout</span>

        <img src="/logout.svg" alt="logout" className='block w-[20px] opacity-6'/>
      </div>
    </Link>
  );
}

// eslint-disable-next-line
{
  /* <div className="flex mx-auto w-[92%] items-center justify-between space-x-4 rounded-md bg-[transparent] p-2 px-3">
      <div className="bg-[#7f859590] p-2">
        <img src="/wallet.svg" alt="Wallet_icon" />
      </div>

      <div className="w-full flex-col">
        <span className="block w-full text-sm ">Remaining appt.</span>
        <span className="text-md font-semibold">7</span>
      </div>
    </div> */
}

export default Wallet;
