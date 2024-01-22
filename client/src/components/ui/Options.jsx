import React from 'react';
import Dropdown  from './Dropdown';

function Options({
  isFor,
  name,
  query,
  handleQueryChange,
  isDownloadable,
  sortOptions,
  filterOptions,
}) {
  const handleSortOptionClick = (index) => {
    const selectedOption = sortOptions[index];
    if (selectedOption) {
      selectedOption.handler();
    }
  };

  const handleFilterOptionClick = (index) => {
    const selectedOption = filterOptions[index];
    if (selectedOption) {
      selectedOption.handler();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        placeholder={`Enter ${isFor} id`}
        value={query}
        onChange={(e) => handleQueryChange(e)}
        className=" bottom-1 h-[48%] w-[30%] rounded-md border bg-stone-100 py-3 pl-4 placeholder:text-[14px] placeholder:text-stone-500"
      />

      <div className="flex items-center justify-between space-x-4">
        <div className="flex space-x-4">
          <div className="text-md flex w-fit cursor-pointer items-center space-x-1 rounded-sm border border-stone-400 px-2 py-1">
            <Dropdown options={sortOptions} name={name} onSelect={handleSortOptionClick} />
          </div>
        </div>

        {isDownloadable && (
        <div className="flex w-fit cursor-pointer py-[6px] items-center rounded-sm border border-stone-400 px-1.5">
          <img src="/download.svg" alt="icon" />
        </div>
      )}
      </div>
    </div>
  );
}

export default Options;
