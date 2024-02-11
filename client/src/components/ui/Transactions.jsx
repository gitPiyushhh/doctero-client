import React from 'react';
import Table from '../layout/Table';

function Transactions({ isFor, name, sortOptions, tableHeadMetadata, data, keyName, isFilterable, isDownloadable }) {
  return (
    <div className="mt-4 w-full px-4 md:px-8 text-stone-800 ">
      <Table
        isFor={isFor}
        tableHeadMetaData={tableHeadMetadata}
        data={data}
        key={keyName}
        isFilterable={isFilterable}
        isDownloadable={isDownloadable}
        sortOptions={sortOptions}
        name={name}
      />
    </div>
  );
}

export default Transactions;
