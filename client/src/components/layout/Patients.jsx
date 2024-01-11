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
    name: 'Name',
  },
  {
    name: 'Gender',
  },
  {
    name: 'Problem',
  },
  {
    name: 'Start date',
  },
  {
    name: 'Contact',
    rightAlign: true,
  },
];

const cardMetaData = [
  {
    heading: 'Total Patients',
    value: '45',
    hasCta: true,
    ctaContent: 13,
    ctaContentType: 'Orders',
    isHighlighted: true,
    highlightContentKey: 'Next appointment date:',
    highlightContentValue: 'Today, 04:00PM',
  },
  {
    heading: 'Active patients',
    value: '35',
    hasCta: true,
    ctaContent: 23,
    ctaContentType: 'Orders',
    isHighlighted: false,
  },
  {
    heading: 'Dormat patients',
    value: '5',
    ctaContentType: false,
    isHighlighted: false,
  },
];

function Patients() {
  const data = useSelector((state) => state.patient.data);

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Header name="Patients" />
      <Overview cardMetaData={cardMetaData} />
      <Transactions
        isFor="Patient"
        tableHeadMetadata={tableHeadMetaData}
        data={data}
      />
    </div>
  );
}

export default Patients;
