import React, { useState } from 'react';
import TableHead from '../ui/TableHead';
import TableRow from '../ui/TableRow';
import { useDispatch } from 'react-redux';
import { filter } from '../../features/billing';
import NoData from './NoData';
import Options from '../ui/Options';

function Table({ isFor, name, tableHeadMetaData, data, isDownloadable, sortOptions }) {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const width = 100 / tableHeadMetaData.length;

  function handleQueryChange(e) {
    const targetValue = e.target.value;
    setQuery(targetValue);
    dispatch(filter(targetValue));
  }

  return (
    <div className="w-full bg-stone-50 p-4 shadow-md">
      <Options isFor={isFor} name={name} query={query} handleQueryChange={handleQueryChange} isDownloadable={isDownloadable} sortOptions={sortOptions}/>

      {/* Table here */}
      <div role="table" className="mt-4">
        <div className="flex justify-between bg-stone-200 p-3 text-sm font-semibold">
          {tableHeadMetaData.map((item) => (
            <TableHead
              key={item.name}
              name={item.name}
              width={width}
              rightAlign={item.rightAlign}
            />
          ))}
        </div>

        {data.length ? (
          <div>
            {data.map((item) => (

              <TableRow key={`${JSON.stringify(item)}`} data={item} width={width} />
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}

export default Table;
