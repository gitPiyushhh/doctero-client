import React from 'react';
import Tab from './Tab';
import Table from '../layout/Table';

import { v4 as uuidv4 } from 'uuid';

function Transactions({ isFor, tabOptions, tableHeadMetadata, data, keyName }) {
  console.log(data)

  return (
    <div className="mt-4 w-full px-8 text-stone-800 ">
      <Table
        isFor={isFor}
        tableHeadMetaData={tableHeadMetadata}
        data={data}
        key={keyName}
      />
    </div>
  );
}

export default Transactions;
