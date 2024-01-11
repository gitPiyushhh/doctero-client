import React from 'react'

function Input({name, type, onChange}) {
  return (
    <div className='w-full flex flex-col justify-between items-start'>
        <label>{name}</label>
        <input type={type} placeholder={`Enter your ${name}`} className='w-full rounded-md mt-2 p-4 mb-4 bg-stone-100 focus:outline-none focus:border-1 focus:border-stone-200 ' onChange={onChange}/>
    </div>
  )
}

export default Input