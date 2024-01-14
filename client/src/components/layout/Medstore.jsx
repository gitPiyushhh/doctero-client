import React from 'react';
import Header from '../ui/Header';
import MedHeader from './MedHeader';

function Medstore() {
  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Header name="Medstore" />
      <MedHeader />
    </div>
  );
}

export default Medstore;
