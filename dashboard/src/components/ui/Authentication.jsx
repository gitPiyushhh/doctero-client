import React, { useState } from 'react';
import Navbar from './Navbar';
import Form from './Form';

const metaData = [
  [
    { name: 'Name', type: 'text' },
    { name: 'Email', type: 'email' },
    { name: 'Password', type: 'password' },
  ],
  [
    { name: 'Email', type: 'email' },
    { name: 'Password', type: 'password' },
  ],
];

function Authentication() {
  const [signup, setSignUp] = useState(true);

  return (
    <div className=" w-full overflow-y-scroll">
      <Navbar />

      <div className="mt-10 flex items-start justify-center space-x-16 transition-all duration-300">
        <div className=" w-[28%] flex-col items-center text-stone-600">
          <span
            className={`cursor-pointer mx-auto mb-4 block  w-fit text-[1.6rem] font-semibold text-[${
              signup ? '#146EB4' : '#D9D9D9'
            }]`}
            onClick={() => setSignUp(true)}
          >
            Signup
          </span>
          {signup ? (
            <Form name="Sign up" data={metaData[0]} />
          ) : (
            <div className="h-[32rem] rounded-lg bg-stone-900 opacity-[10%]">
              &nbsp;
            </div>
          )}
        </div>

        <div className=" w-[28%] flex-col text-stone-600">
          <span
            className={`cursor-pointer mx-auto mb-4 block w-fit text-[1.6rem] font-semibold text-[${
              !signup ? '#146EB4' : '#D9D9D9'
            }]`}
            onClick={() => setSignUp(false)}
          >
            Login
          </span>

          {!signup ? (
            <Form name="Login" data={metaData[1]} />
          ) : (
            <div className="h-[28rem] rounded-lg bg-stone-900 opacity-[10%]">
              &nbsp;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
