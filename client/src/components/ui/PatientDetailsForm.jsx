import React, { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { createPatient } from '../../services/apiPatient';
import { state_arr } from '../../../CONSTANTS';
import { CityDropdown, StateDropdown } from './StatesAndCities';
import store from '../../store';
import { updateUser } from '../../services/apiAuth';
import { patchUser } from '../../features/auth';
import { useSelector } from 'react-redux';


const inputStyles =
  'bg-stone-50 border-[1px] rounded-md p-2 flex-1 placeholder:text-stone-500 placholder:font-light text-stone-700 text-sm';

/*
  Regex to validate phone number
*/
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

let city = null;
let state = null;

function PatientDetailsForm() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const userObj = useSelector(state => state.auth.user) || JSON.parse(localStorage.getItem('user'));

  const handleStateSelect = (state) => {
    setSelectedState(state);
  };

  const handleCitySelect = (state) => {
    setSelectedCity(state);
  };

  [city, state] = [selectedCity, selectedState];

  return (
    <div className="flex h-[100bh] w-full items-center justify-center">
      <div className="relative flex h-[88%] w-[64%] flex-col items-center justify-center rounded-lg bg-stone-50 p-[2rem] shadow-lg">
        <div className="absolute left-0 top-0 h-4 w-full rounded-t-md bg-stone-200"></div>

        <div
          className="absolute left-0 top-0 h-4 rounded-r-md rounded-t-md bg-[#146EB4]"
          style={{
            transition: 'width 0.3s ease-in-out',
          }}
        ></div>

        <style>
          {`
            #slider::-webkit-slider-thumb {
              background-color: transparent; /* Transparent thumb color */
              transition: background-color 0.3s ease-in-out; /* Transition effect */
            }
            #slider::-moz-range-thumb {
              background-color: transparent; /* Transparent thumb color */
              transition: background-color 0.3s ease-in-out; /* Transition effect */
            }
          `}
        </style>

        <Form method="POST" className="h-full w-full overflow-scroll">
          <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
            <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
              Profile details
            </span>

            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Name</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  defaultValue={userObj.name}
                  className={`${inputStyles} !bg-stone-200 !cursor-pointer`}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Email</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter email"
                  value={userObj.email}
                  name="email"
                  disabled
                  className={`${inputStyles} !bg-stone-200 !cursor-pointer`}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Phone</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
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
                <div className="relative">
                  <span className="text-stone-700">Address</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your address"
                  name="address"
                  className={inputStyles}
                />
              </div>
              <div className="relative flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">State</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <StateDropdown
                  onSelect={handleStateSelect}
                  className={inputStyles}
                />
              </div>
              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">City</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <CityDropdown
                  onSelect={handleCitySelect}
                  className={inputStyles}
                  stateIndex={
                    state_arr.indexOf(selectedState) === -1
                      ? 0
                      : state_arr.indexOf(selectedState)
                  }
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
              <input type="file" name="avatar" className="text-stone-400" />
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
      </div>
    </div>
  );
}

/*
  Form actions
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
    alert(errors.phone);
    return errors;
  }

  /*
    custom object of patient
  */
  const nestedPatient = {
    name: data.name,
    gender: data.gender,
    contact: {
      phone: data.phone,
      address: data.address,
      city: city,
      state: state,
    },
  };

  // If new patient cretaed
  const newPatient = await createPatient(nestedPatient);

  if (!newPatient) {
    return redirect('/form-patient');
  }

  console.log("New patient: ", newPatient)

  const oldUser = JSON.parse(localStorage.getItem('user'));

  // Update remote state
  const updatedUser = await updateUser({
    ...oldUser,
    isDoctor: false,
    patient: newPatient.data.patient,
    isOnboard: true,
  });

  // Update the global state
  store.dispatch(patchUser(updateUser))

  // Update cache
  localStorage.setItem('user', JSON.stringify(updatedUser));

  return redirect(`${!updatedUser ? '/form-doctor' : '/just-there'}`);
}

export default PatientDetailsForm;
