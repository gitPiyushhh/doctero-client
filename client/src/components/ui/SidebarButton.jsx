import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarButton({ icon, name, to }) {
  return (
    <NavLink to={to} key={to}>
      <div
        role="button"
        className="flex gap-6 bg-transparent px-4 py-[0.6rem] text-stone-200"
      >
        <img src={`/${icon}.svg`} alt="Icon_img" className="text-stone-200" />

        <span className='md:block hidden'>{name}</span>
      </div>
    </NavLink>
  );
}

export default SidebarButton;