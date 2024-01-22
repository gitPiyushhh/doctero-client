import React from 'react';
import Table from '../layout/Table';

function Transactions({ isFor, name, sortOptions, tableHeadMetadata, data, keyName, isDownloadable }) {
  return (
    <div className="mt-4 w-full px-8 text-stone-800 ">
      <Table
        isFor={isFor}
        tableHeadMetaData={tableHeadMetadata}
        data={data}
        key={keyName}
        isDownloadable={isDownloadable}
        sortOptions={sortOptions}
        name={name}
      />
    </div>
  );
}

export default Transactions;
