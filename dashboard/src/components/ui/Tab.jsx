import React from 'react';

function Tab({ isActive, name, items }) {
  if (isActive) {
    return (
      <div className="rounded-full bg-[#146EB4] text-stone-50 px-4 py-2 text-sm font-semibold cursor-pointer">
        {name}{" "}({items})
      </div>
    );
  }

  return (
    <div className="rounded-full bg-stone-200 px-4 py-2 text-sm font-semibold cursor-pointer">
      {name}{" "}({items})
    </div>
  );
}

export default Tab;