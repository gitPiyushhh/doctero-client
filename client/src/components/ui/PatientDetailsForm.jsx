import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { createPatient } from '../../services/apiPatient';

const inputStyles =
  'bg-stone-50 border-[1px] rounded-md p-2 flex-1 placeholder:text-sm text-stone-700 text-sm';

/*
  Regex to validate phone number
*/
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function PatientDetailsForm() {
  return (
    <Form method="POST" className="h-full w-full overflow-scroll">
      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Profile details
        </span>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Email</span>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Phone</span>
            <input
              type="text"
              placeholder="Enter phone number"
              name="phone"
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Personal details
        </span>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Age</span>
            <input
              type="text"
              placeholder="Enter age"
              name="age"
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Gender</span>
            <input
              type="text"
              placeholder="What is your health details"
              name="gender"
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Location details
        </span>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Address</span>
            <input
              type="text"
              placeholder="Enter your address"
              name="address"
              className={inputStyles}
            />
          </div>
          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">State</span>
            <input
              type="text"
              placeholder="Enter your state"
              name="state"
              className={inputStyles}
            />
          </div>
          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">City</span>
            <input
              type="text"
              placeholder="Enter your city"
              name="city"
              className={inputStyles}
            />
          </div>
        </div>
      </div>
      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Medical condition
        </span>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex w-[100%] items-center space-x-4">
            <span className="text-stone-700">Health condition</span>
            <textarea
              type="textarea"
              placeholder="What is your health details"
              name="health"
              className={`${inputStyles} w-full`}
            />
          </div>
        </div>
      </div>

      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Avatar
        </span>

        <div className="flex flex-wrap justify-between">
          <input type="file" name="avatar" />
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="align-center bg-stone-900 px-12 text-stone-50"
        >
          Create user
        </button>
      </div>
    </Form>
  );
}

/*
  Thunks
*/

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (!isValidPhone(data.phone)) {
    errors.phone =
      'Please give correct phone num, we might need to contact you';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  console.log(data)

  return redirect('/onboarding/just-there')
}

export default PatientDetailsForm;
