import React from 'react'

function FullPageSpinner() {
  return (
    <div className='w-full flex justify-center items-center h-full mt-8 animate-spin'>
        <img src="/spinDoctor.svg" alt="spinDoctor" className='block h-16 w-auto'/>
    </div>
  )
}

export default FullPageSpinner