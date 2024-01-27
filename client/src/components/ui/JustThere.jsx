import React, { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function JustThere() {
  const navigate = useNavigate();

  useEffect(function() {
    setTimeout(function() {
      console.log('Wait')
    }, 3 * 1000)

    navigate('/category')
  }, [])

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

export async function action({ request }) {
  const user = JSON.parse(localStorage.getItem('user'))

  setTimeout(function() {
    console.log('Wait')
  }, 3 * 1000)
  
  return redirect('/dashboard');
}

export default JustThere;
