import React from "react";

function TimeAvailability({ name, data, schedule, selected, handleTimeTaken }) {
  /*
    Data manipulation
  */
  const occupied = [];
  for (let i = 0; i < schedule?.length; i++) {
    occupied.push(schedule[i]?.startTime);
  }

  let timeSlots = [];
  for (
    let i = data?.operationalTime.startTime;
    i < data?.operationalTime.closeTime;
    i++
  ) {
    timeSlots.push(i);
  }

  return (
    <div className="text-stone-500 flex flex-col gap-2">
      <span className="text-sm">{name}</span>

      <div className="flex flex-wrap justify-start items-center gap-2">
        {timeSlots.map((timeSlot) => (
          <span
            className={`${occupied.includes(timeSlot) || (name === selected?.split(',')[0] && Number(selected?.split(',')[1])) === timeSlot ? "bg-stone-200" : "bg-[#7C51C2]"} ${occupied.includes(timeSlot) || (name === selected?.split(',')[0] && Number(selected?.split(',')[1])) === timeSlot ? "text-stone-700" : "text-stone-50"} w-[4rem] p-1 flex justify-center items-center text-sm rounded-full ${occupied.includes(timeSlot) || (name === selected?.split(',')[0] && Number(selected?.split(',')[1])) === timeSlot ? "cursor-not-allowed" : "cursor-pointer"} `}
            key={timeSlot}
            onClick={() => handleTimeTaken(`${name},${timeSlot}`)}
          >
            {timeSlot > 12 ? `${timeSlot % 12} pm` : `${timeSlot} am`}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TimeAvailability;
