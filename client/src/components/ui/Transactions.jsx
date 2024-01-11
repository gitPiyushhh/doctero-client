import React from 'react';
import Tab from './Tab';
import Table from '../layout/Table';
import { useSelector } from 'react-redux';

function Transactions() {
  const payouts = useSelector((state) => state.data.data);

  return (
    <div className="mt-4 w-full px-8 text-stone-800 ">
      <div>
        <span className="text-[18px] font-bold">Transactions | This Month</span>
      </div>

      <div className="mt-4 flex space-x-4 p-2">
        <Tab name="Payouts" isActive={false} items={22} />
        <Tab name="Refunds" isActive={true} items={payouts.length} />
      </div>

      <Table />
    </div>
  );
}

export default Transactions;
