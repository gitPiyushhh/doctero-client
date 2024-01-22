import React from 'react';
import { cities, state_arr } from '../../../CONSTANTS';

export const StateDropdown = ({ onSelect, className }) => {
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    onSelect(selectedState);
  };

  return (
    <select onChange={handleStateChange} className={`font-light text-stone-400 ${className}`}>
      <option value="">Select State</option>
      {state_arr.map((state, index) => (
        <option key={index} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
};

export const CityDropdown = ({ stateIndex, className, onSelect }) => {
  const cityArr =  cities[stateIndex+1].split("|");

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    onSelect(selectedCity);
  };

  return (
    <select className={`font-light ${className}`} onChange={handleCityChange}>
      <option value="" className='text-stone-400'>Select City</option>
      {cityArr.map((city, index) => (
        <option key={index} value={city.trim()}>
          {city.trim()}
        </option>
      ))}
    </select>
  );
};
