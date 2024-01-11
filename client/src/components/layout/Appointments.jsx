import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../ui/Header';
import Overview from '../ui/Overview';
import Transactions from '../ui/Transactions';

const tableHeadMetaData = [
  {
    name: 'Appointment ID',
  },
  {
    name: 'Patient ID',
  },
  {
    name: 'Name',
  },
  {
    name: 'Date',
  },
  {
    name: 'Problem',
  },
  {
    name: 'Type',
    rightAlign: true,
  },
];

const cardMetaData = [
  {
    heading: 'Total Appointments',
    value: '91',
    hasCta: true,
    ctaContent: 13,
    ctaContentType: 'Orders',
    isHighlighted: true,
    highlightContentKey: 'Next appointment date:',
    highlightContentValue: 'Today, 04:00PM',
  },
  {
    heading: 'Today appointments',
    value: '5',
    hasCta: true,
    ctaContent: 23,
    ctaContentType: 'Orders',
    isHighlighted: false,
  },
  {
    heading: 'Upcoming appointments',
    value: '14',
    ctaContentType: false,
    isHighlighted: false,
  },
];

function Appointments() {
  const data = useSelector((state) => state.appointment.data);

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Header name="Appointments" />
      <Overview cardMetaData={cardMetaData} />
      <Transactions isFor='Appointment' tableHeadMetadata={tableHeadMetaData} data={data} />
    </div>
  );
}

export default Appointments;
