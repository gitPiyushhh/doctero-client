import React from 'react';

function Tab({ isActive, name, items, handleChange }) {
  const handleClick = () => {
    handleChange(name.toLocaleLowerCase());
  };

  if (isActive) {
    return (
      <div
        className="block w-fit cursor-pointer rounded-full bg-[#146EB4] px-4 py-2 text-sm font-semibold text-stone-50"
        onClick={handleClick}
      >
        {name} ({items})
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer rounded-full bg-stone-200 px-4 py-2 text-sm font-semibold"
      onClick={handleClick}
    >
      {name} ({items})
    </div>
  );
}

export default Tab;
