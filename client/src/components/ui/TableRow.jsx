import React from 'react';
import TableData from './TableData';

function TableRow({ data, width, handleRowClick }) {
  return (
    <div className="flex flex-wrap max-w-full justify-between border-b-[1px] p-4 cursor-pointer" onClick={() => handleRowClick(data)}>
      {Object.keys(data).map((item, index) => (
        <TableData
          key={Math.random()}
          data={data[item]}
          width={width}
          alignLeft={index === 0 ? true : false}
          alignRight={index === Object.keys(data).length - 1 ? true : false}
        />
      ))}
    </div>
  );
}

export default TableRow;
