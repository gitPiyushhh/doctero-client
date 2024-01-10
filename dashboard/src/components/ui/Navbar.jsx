import React from 'react'

function Navbar() {
  return (
    <div className='w-full bg-stone-300 py-4 shadow-md'>
      <div className='flex w-[80vw] justify-between items-center mx-auto'>
        <div>
          <img src="/KiddyLogo.png" alt="Kiddy doctero logo" className='block h-8'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar