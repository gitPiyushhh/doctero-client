import React from 'react';

const styles = {
    fontFamily: 'Josefin Sans',
    fontSize: '3.6rem',
    fontWeight: 'bold',
    opacity: '64%'
}

function NoData() {
  return (
    // <div className={`w-full h-[10rem] flex justify-center items-center border-[1px]`} style={styles}>
    //     No data found 
    // </div>
    
    <div className={`w-auto h-full flex justify-center items-center border-[1px] bg-[#FDFDFD]`} style={styles}>
        <img src="/noDataDog.png" alt="no-data" className='h-full w-auto'/>
    </div>
  )
}

export default NoData