import React from 'react';
import TableData from './TableData';

function TableRow({ data, width }) {
  return (
    <div className="flex w-full justify-between border-b-[1px] p-4 ">
      {Object.keys(data).map((item) => (
        <TableData
          key={Math.random()}
          data={data[item]}
          width={width}
          alignRight={item === 'orderAmount'  ? true : false}
        />
      ))}
    </div>
  );
}

export default TableRow;