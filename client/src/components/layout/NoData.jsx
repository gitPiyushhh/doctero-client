import React from 'react';

const styles = {
    fontFamily: 'Foldit',
    fontSize: '4.8rem',
    fontWeight: 'bold'
}

function NoData() {
  return (
    <div className={`w-full h-[10rem] flex justify-center items-center border-[1px]`} style={styles}>
        No data found 
    </div>
  )
}

export default NoData