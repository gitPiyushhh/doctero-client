import React from "react";

function Message({ type, text, time }) {
    const user = JSON.parse(localStorage.getItem('user'))

  if (type === "local") {
    return (
      <div className="bg-stone-200 text-stone-700 self-end  p-3 rounded-xl rounded-tr-none w-fit flex justify-between space-x-4 items-end ">
        <span>{text}</span>
        <span className="text-sm block mb-[1.6px]">{time}</span>
      </div>
    );
  }

  return (
    <div className={`${user?.doctor ? `bg-[#136DB4]` : 'bg-[#7C51C2]'} text-stone-100  p-3 rounded-xl rounded-tl-none w-fit flex justify-between space-x-4 items-end `}>
      <span>{text}</span>
      <span className="text-sm block mb-[1.6px]">{time}</span>
    </div>
  );
}

export default Message;
