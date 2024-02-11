import React from 'react';
import OverviewCard from './OverviewCard';
import Dropdown from './Dropdown';

function Overview({ cardMetaData, spanOptions, name }) {
  const handleSortOptionClick = (index) => {
    const selectedOption = spanOptions[index];
    if (selectedOption) {
      selectedOption.handler();
    }
  };

  return (
    <div className="relative w-full p-4 md:p-8 pt-6 text-stone-800">
      <span className="text-[18px] font-bold">Overview</span>

      <div className="mt-6 flex flex-wrap gap-2 flex-col md:flex-row w-full items-start justify-between md:pr-4">
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

      <div className="absolute right-4 md:right-12 top-4 md:top-8 flex cursor-pointer items-center justify-between space-x-2 rounded-md border mt-1 md:mt-0 bg-stone-50 px-4 py-1 md:py-2">
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
