import React from "react";

function TimeAvailability({ doctorPropToBeTakenm, occupiedToBeTaken }) {
  const occupied = [12, 14, 17]; //Fetch this from all the appointments for today, tomorrow and the day after tomorrow, and the just push to array the times you find

  const doctor = {
    startTime: 11,
    endTime: 18,
  };

  let timeSlots = [];

  for (let i = doctor.startTime; i < doctor.endTime; i++) {
    timeSlots.push(i);
  }

  return (
    <div className="text-stone-500 flex flex-col gap-2">
      <span className="text-sm">Today</span>

      <div className="flex flex-wrap justify-start items-center gap-2">
        {timeSlots.map((timeSlot) => (
          <span
            className={`${occupied.includes(timeSlot) ? 'bg-stone-200' : 'bg-[#7C51C2]'} ${occupied.includes(timeSlot) ? 'text-stone-700' : 'text-stone-50'}  w-[4rem] p-1 flex justify-center items-center text-sm rounded-full ${occupied.includes(timeSlot) ? 'cursor-not-allowed' : 'cursor-pointer'} `}
          >
            {timeSlot > 12 ? `${timeSlot % 12} pm` : `${timeSlot} am`}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TimeAvailability;
