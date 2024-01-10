import React from 'react';
import { Link } from 'react-router-dom';

import Input from './Input';

function Form({ name, data }) {
  return (
    <div className="flex-col rounded-lg p-8 shadow-md">
      {data?.map((item) => (
        <Input name={item.name} key={item.type} type={item.type} />
      ))}

      <button className="text-small w-full bg-[#146EB4] font-semibold text-stone-100">
        {name}
      </button>

      {name === 'Login' && (
        <div className='flex space-x-2 mt-6'>
          <span>Need help?</span>
          <Link>
            <span className='text-[#146EB4] font-semibold'>Forgot password</span>
          </Link>
        </div>
      )}

      <span className="my-4 block text-center">OR</span>

      <button className="text-small flex w-full items-center justify-center space-x-2 bg-stone-100 font-semibold text-stone-700">
        <img
          src="/google.svg"
          alt="icon"
          className="focus:border-1 mr-4 block h-4 w-4 focus:border-none"
        />
        {name} with google
      </button>
    </div>
  );
}

export default Form;
