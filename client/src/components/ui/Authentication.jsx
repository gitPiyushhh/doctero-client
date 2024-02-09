import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Navbar from "./Navbar";
import Form from "./Form";

const metaData = [
  [
    { name: "Name", type: "text" },
    { name: "Email", type: "email" },
    { name: "Password", type: "password" },
  ],
  [
    { name: "Email", type: "email" },
    { name: "Password", type: "password" },
  ],
];

function Authentication() {
  const [signup, setSignUp] = useState(true);

  const dispatch = useDispatch();

  return (
    <div className=" w-[100vw] overflow-y-scroll">
      <Navbar />

      <div className="flex md:hidden text-stone-600 mt-10 justify-center w-full items-center">
          <span
            className={`cursor-pointer mx-auto mb-4 block  w-fit text-[1.6rem] font-semibold text-[${
              signup ? "#146EB4" : "#D9D9D9"
            }]`}
            onClick={() => setSignUp(true)}
          >
            Signup
          </span>

          <span>or</span>

          <span
            className={`cursor-pointer mx-auto mb-4 block w-fit text-[1.6rem] font-semibold text-[${
              !signup ? "#146EB4" : "#D9D9D9"
            }]`}
            onClick={() => setSignUp(false)}
          >
            Login
          </span>
        </div>

      <div className="mt:4 md:mt-10 md:flex items-start justify-center md:space-x-16 transition-all duration-300 p-4 md:p-0">
        <div className="w-full md:w-[28%] flex-col items-center text-stone-600">
          <span
            className={`cursor-pointer mx-auto mb-4  w-fit text-[1.6rem] hidden md:block font-semibold text-[${
              signup ? "#146EB4" : "#D9D9D9"
            }]`}
            onClick={() => setSignUp(true)}
          >
            Signup
          </span>
          {signup ? (
            <Form name="Sign up" data={metaData[0]} />
          ) : (
            <div className="h-[32rem] rounded-lg bg-stone-900 opacity-[10%] hidden md:block">
              &nbsp;
            </div>
          )}
        </div>

        <div className="w-full md:w-[28%] flex-col text-stone-600">
          <span
            className={`cursor-pointer mx-auto mb-4 hidden md:block w-fit text-[1.6rem] font-semibold text-[${
              !signup ? "#146EB4" : "#D9D9D9"
            }]`}
            onClick={() => setSignUp(false)}
          >
            Login
          </span>

          {!signup ? (
            <Form name="Login" data={metaData[1]} />
          ) : (
            <div className="h-[28rem] rounded-lg bg-stone-900 opacity-[10%] hidden md:block">
              &nbsp;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
