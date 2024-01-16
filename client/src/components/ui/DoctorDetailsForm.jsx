import React from 'react';
import { Form, redirect } from 'react-router-dom';
import { createDoctor } from '../../services/apiPatient';

const inputStyles =
  'bg-stone-50 border-[1px] rounded-md p-2 flex-1 placeholder:text-sm text-stone-700 text-sm';

function DoctorDetailsForm() {
  return (
    <Form method="POST" className="h-full w-full overflow-scroll">
      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Profile details
        </span>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex w-[24rem] items-center space-x-4">
            <div className='relative'>
              <span className="text-stone-700">Name</span>
              <span className="text-red-400 absolute right-[-8px] top-[-5px]">*</span>
            </div>
            <input
              type="text"
              placeholder="What is your name"
              name="name"
              required
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
          <div className='relative'>
              <span className="text-stone-700">Email</span>
              <span className="text-red-400 absolute right-[-8px] top-[-5px]">*</span>
            </div>
            <input
              type="email"
              placeholder="What is your email"
              name="email"
              required
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
          <div className='relative'>
              <span className="text-stone-700">Phone</span>
              <span className="text-red-400 absolute right-[-8px] top-[-5px]">*</span>
            </div>
            <input
              type="text"
              placeholder="What is your phone number"
              name="phone"
              required
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
          <div className='relative'>
              <span className="text-stone-700">Address</span>
              <span className="text-red-400 absolute right-[-8px] top-[-5px]">*</span>
            </div>
            <input
              type="text"
              placeholder="What is your address"
              name="address"
              required
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
          <div className='relative'>
              <span className="text-stone-700">Aadhar number</span>
              <span className="text-red-400 absolute right-[-8px] top-[-5px]">*</span>
            </div>
            <input
              type="text"
              placeholder="What is your aadhar number"
              name="aadharNumber"
              required
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Professional details
        </span>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Education</span>
            <input
              type="text"
              placeholder="What is your education"
              name="education"
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Experience</span>
            <input
              type="text"
              placeholder="What is your experience in years"
              name="gender"
              className={inputStyles}
            />
          </div>

          <div className="flex w-[24rem] items-center space-x-4">
            <span className="text-stone-700">Specialisation</span>
            <input
              type="text"
              placeholder="What are you good at"
              name="specialisation"
              className={inputStyles}
            />
          </div>
        </div>
      </div>

      <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
        <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
          Avatar
        </span>

        <div className="flex flex-wrap justify-between">
          <input type="file" name="avatar" className='text-stone-500'/>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="align-center bg-stone-900 px-12 text-stone-50"
        >
          Create clinic
        </button>
      </div>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // If OK create new doctor
  const newDoctor = await createDoctor(data);

  // localStorage.setItem('doctor', JSON.stringify(newDoctor.data.therapist));

  return redirect(`/onboarding/${newDoctor ? 'just-there' : 'form-doctor'}`);
}

export default DoctorDetailsForm;
