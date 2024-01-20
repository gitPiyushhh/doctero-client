import React from 'react';
import OverviewCard from './OverviewCard';


function Overview({cardMetaData, data}) {
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
        <span>This month</span>
        <span className="flex h-3 w-3 items-center">
          <img src="/down.svg" alt="icon" />
        </span>
      </div>
    </div>
  );
}

export default Overview;