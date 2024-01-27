import React from 'react';
import { Link } from 'react-router-dom';

function TableData({ data, type, width, alignRight, marginLeft }) {

  if (data?.toString().includes('#')) {
    return (
      <div
        className={`w-[${Math.floor(width)}%] flex justify-${alignRight ? 'end' : 'start'}`}
      >
        <Link>
          <span className={`text-sm font-semibold text-blue-500`}>{`${data.slice(0, 4)}...${data.slice(-4, data.length)}`}</span>
        </Link>
      </div>
    );
  }

  if (data === 'Successful' || data === 'Failed' || data === 'Pending') {
    return (
      <div
        className={`w-[${Math.floor(width)}%] flex items-center  gap-2 justify-${
          alignRight ? 'end' : 'start'
        }`}
      >
        <span
          className={`block h-2 w-2 rounded-full p-1 ${
            data === 'Successful'
              ? 'bg-[#17B31B]'
              : data === 'Failed'
                ? 'bg-[#ff6b5b]'
                : 'bg-stone-400'
          }`}
        >
          &nbsp;
        </span>
        <span>{data}</span>
      </div>
    );
  }

  return (
    <div
      className={`w-[${Math.floor(width)}%] flex text-sm justify-${alignRight ? 'end' : 'start'}`}
    >
      {data}
    </div>
  );
}

export default TableData;