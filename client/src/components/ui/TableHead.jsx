import React from 'react';

function TableHead({ name, width, rightAlign }) {
  const style = { width: `${width}%` };

  return (
    <div
      className={`flex ${rightAlign ? 'justify-end' : 'justify-start'}`}
      style={style}
    >
      {name}
    </div>
  );
}

export default TableHead;
