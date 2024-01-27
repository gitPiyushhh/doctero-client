import React from "react";
import { Form } from "react-router-dom";
import TimeAvailability from "./TimeAvailability";

const inputStyles =
  "bg-stone-50 border-[1px] w-[100%] border-stone-200 rounded-md p-3 flex-1 placeholder:text-stone-400 placholder:font-light text-stone-700 text-sm focus:outline-none";

function Booking() {
  return (
      <Form method="POST" className="h-fit w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            name="name"
            required
            className={`${inputStyles} !bg-white`}
          />
          
          <textarea
            type="text"
            placeholder="Your problem"
            name="problem"
            required
            rows={6}
            className={`${inputStyles} !bg-white`}
          />

          <TimeAvailability />
          <TimeAvailability />
          <TimeAvailability />

          <button type="submit" className="bg-[#7C51C2] mt-4 shadow-lg active:shadow-sm active:outline-none">Make an appointment</button>
      </Form>
  );
}

export default Booking;
