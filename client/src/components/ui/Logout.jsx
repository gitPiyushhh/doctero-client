import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { deleteUser } from '../../features/auth';

function Logout() {
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(deleteUser())
    redirect('/');
  }

  return (
    <Link>
      <div
        className="flex w-full justify-center space-x-2  py-4"
        onClick={handleLogout}
      >
        <span className="block text-stone-300 md:block hidden">Logout</span>

        <img
          src="/logout.svg"
          alt="logout"
          className="opacity-6 block w-[20px]"
        />
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

export default Logout;
