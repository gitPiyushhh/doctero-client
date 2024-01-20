import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../ui/Header';
import Overview from '../ui/Overview';
import Transactions from '../ui/Transactions';

const tableHeadMetaData = [
  {
    name: 'Patient ID',
  },
  {
    name: 'Status',
  },
  {
    name: 'Bill ID',
  },
  {
    name: 'Date',
  },
  {
    name: 'Amount',
    rightAlign: true,
  }
];

const cardMetaData = [
  {
    heading: 'Total Billings',
    value: '91,723.00',
    hasCta: true,
    ctaContent: 13,
    ctaContentType: 'Orders',
    isHighlighted: true,
    highlightContentKey: 'Next appointment date:',
    highlightContentValue: 'Today, 04:00PM',
  },
  {
    heading: 'Amount pending',
    value: '11,721.00',
    hasCta: true,
    ctaContent: 23,
    ctaContentType: 'Orders',
    isHighlighted: false,
  },
  {
    heading: 'Amount processed',
    value: '80,002.00',
    ctaContentType: false,
    isHighlighted: false,
  },
];

function Billings() {
  const data = useSelector((state) => state.billing.data);

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Header name="Billings" />
      <Overview cardMetaData={cardMetaData} data={[]}/>
      <Transactions isFor='Bill' tableHeadMetadata={tableHeadMetaData} data={data} key={Date.now()}/>
    </div>
  );
}

export default Billings;
