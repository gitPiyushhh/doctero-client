import React from 'react';
import OverviewCard from './OverviewCard';

const metaData = [
  {
    name: 'Total patients',
    price: '2,312.23',
    isOrders: true,
    orders: '23',
    isActive: true,
  },
  {
    name: 'Active Patients',
    price: '92,312.20',
    isOrders: true,
    orders: '13',
    isActive: false,
  },
  {
    name: 'Previous patients',
    price: '23,92,312.19',
    isOrders: false,
    isActive: false,
  },
];

function Overview() {
  return (
    <div className="relative w-full p-8 pt-6 text-stone-800">
      <span className="text-[18px] font-bold">Overview</span>

      <div className="mt-6 flex w-full items-start justify-between pr-4">
        {metaData.map((item) => (
          <OverviewCard
            key={item.name}
            name={item.name}
            price={item.price}
            isOrders={item.isOrders}
            orders={item.orders}
            isActive={item.isActive}
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