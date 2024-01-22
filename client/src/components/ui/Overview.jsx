import React from 'react';
import OverviewCard from './OverviewCard';
import Dropdown from './Dropdown';

function Overview({ cardMetaData, data, spanOptions, name }) {
  const handleSortOptionClick = (index) => {
    const selectedOption = spanOptions[index];
    if (selectedOption) {
      selectedOption.handler();
    }
  };

  return (
    <div className="relative w-full p-8 pt-6 text-stone-800">
      <span className="text-[18px] font-bold">Overview</span>

      <div className="mt-6 flex w-full items-start justify-between pr-4">
        {cardMetaData.map((item) => (
          <OverviewCard
            key={item.heading}
            heading={item.heading}
            value={item.value}
            hasCta={item.hasCta}
            ctaContent={item.ctaContent}
            ctaContentType={item.ctaContentType}
            isHighlighted={item.isHighlighted}
            highlightContentKey={item.highlightContentKey}
            highlightContentValue={item.highlightContentValue}
          />
        ))}
      </div>

      <div className="absolute right-12 top-8 flex cursor-pointer items-center justify-between space-x-2 rounded-md border bg-stone-50 px-4 py-2">
        <Dropdown
          options={spanOptions}
          name={name}
          onSelect={handleSortOptionClick}
        />
      </div>
    </div>
  );
}

export default Overview;
