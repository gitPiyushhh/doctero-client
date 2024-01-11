import React from 'react';
import Header from '../ui/Header';
import Overview from '../ui/Overview';
import Transactions from '../ui/Transactions';

function Billings() {
  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Header name="Billings"/>
      <Overview />
      <Transactions />
    </div>
  );
}

export default Billings;