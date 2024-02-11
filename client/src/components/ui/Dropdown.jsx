import React from 'react';

function Dropdown({ name, options, onSelect }) {
  function handleChange(e) {
    onSelect(e.target.value);
  }

  return (
    <select onChange={handleChange} className='bg-stone-50 text-stone-600  md:w-fit rounded-sm cursor-pointer py-[1px] focus:outline-none'>
      <option key="default" value="default">
        {name}
      </option>
      {options?.map((option, index) => (
        option.name !== name && (<option key={index} value={index}>
          {option.name}
        </option>)
      ))}
    </select>
  );
};

export default Dropdown;
