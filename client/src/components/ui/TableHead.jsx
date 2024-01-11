import React from 'react';

function TableHead({ name, width, rightAlign }) {
  return (
    <div
      className={`w-[${Math.floor(width)}%] flex ${
        rightAlign ? 'justify-end' : 'justify-start'
      }`}
    >
      {name}
    </div>
  );
}

export default TableHead;
