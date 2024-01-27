import React from "react";

function CategoryCard({ data }) {
  return (
    <div className={`w-[10rem] h-[10rem] rounded-md flex flex-col  justify-end gap-2 pb-4 pl-2 cursor-pointer ${data.isActive ? 'bg-[#BE93FD] shadow-lg' : 'bg-stone-100 shadow-md'}`}>
      <div className={`w-12 h-12 p-2 rounded-full flex justify-center items-center ${!data.isActive ? 'bg-transparent' : 'bg-stone-100'}`}>
        {data.isActive ? <img src={`/${data.icon}-white.svg`} alt="" className={`text-stone-400 w-[80%] h-[80%]`}/> : <img src={`/${data.icon}.svg`} alt="" className={`text-stone-400 w-[80%] h-[80%]`}/>}
      </div>
      <span className={`${data.isActive ? "text-stone-50" : "text-stone-700"}`}>{data.name}</span>
    </div>
  );
}

export default CategoryCard;
