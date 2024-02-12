import React from "react";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";

function Options({
  isFor,
  name,
  query,
  handleQueryChange,
  isFilterable,
  isDownloadable,
  sortOptions,
  filterOptions,
}) {
  /* 
    Global state
  */
  const mobileSidebarOpen = useSelector((state) => state.ui.mobileSidebarOpen);

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
    <div
      className={`${mobileSidebarOpen ? "hidden h-0" : "flex"} justify-between items-center`}
    >
      <input
        type="text"
        placeholder={`Enter ID`} // ${isFor} is having name for the placeholder
        value={query}
        onChange={(e) => handleQueryChange(e)}
        className={`bottom-1 h-[48%] w-[40%] md:w-[30%] rounded-md border bg-stone-100 py-3 pl-4 placeholder:text-[14px] placeholder:text-stone-500 ${!isFilterable && "w-full"}`}
      />

      <div className="flex items-center justify-between space-x-2 md:space-x-4">
        {isFilterable && (
          <div className="flex space-x-4">
            <div className="text-md flex w-fit cursor-pointer items-center space-x-1 rounded-md border border-stone-200 px-2 py-2">
              <Dropdown
                options={sortOptions}
                name={name}
                onSelect={handleSortOptionClick}
              />
            </div>
          </div>
        )}

        {isDownloadable && (
          <div className="flex w-fit cursor-pointer items-center rounded-md border border-stone-200 px-2 md:py-2 py-3">
            <img src="/download.svg" alt="icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Options;
