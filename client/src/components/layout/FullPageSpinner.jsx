import React from 'react'

function FullPageSpinner() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='w-full flex justify-center items-center h-full mt-8 animate-spin'>
        <img src={`${user.doctor ? '/spinDoctor.svg' : '/spinPatient.svg'}`} alt="spinDoctor" className='block h-16 w-auto'/>
    </div>
  )
}

export default FullPageSpinner