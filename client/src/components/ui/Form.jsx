import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from './Input';
import { login, signup } from '../../features/auth';

function Form({ name, data }) {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  function handleSubmit() {
    // Input validation
    name === 'Sign up' ? dispatch(signup(formData)) : dispatch(login(formData));
  }

  return (
    <div className="flex-col rounded-lg p-8 shadow-md">
      {data?.map((item) => (
        <Input
          name={item.name}
          key={item.type}
          type={item.type}
          onChange={(e) => handleInputChange(item.name.toLocaleLowerCase(), e.target.value)}
        />
      ))}

      <button
        className="text-small w-full bg-[#146EB4] font-semibold text-stone-100"
        onClick={handleSubmit}
      >
        {name}
      </button>

      {name === 'Login' && (
        <div className="mt-6 flex space-x-2">
          <span>Need help?</span>
          <Link>
            <span className="font-semibold text-[#146EB4]">
              Forgot password
            </span>
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
