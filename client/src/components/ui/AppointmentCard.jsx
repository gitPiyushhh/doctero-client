import React from "react";

function AppointmentCard({ data, patient, isActive, handleCardClick }) {
  const now = new Date().getHours();

  /*
    State
  */
    const isLive =
    data?.startTime >= now && data?.startTime <= now + 1;

  /*
    Event handlers
  */
  function handleChangeAppointment(appointmentId) {
    handleCardClick(appointmentId);
  }

  return (
    <div
      className={`my-0 md:my-2 flex w-full items-center justify-between p-2 md:px-4 md:py-4 ${isActive && (patient ? "bg-[#bd93fc18]" : "bg-blue-50")} rounded-md cursor-pointer relative`}
      onClick={() => handleChangeAppointment(data?._id)}
    >
      {isLive && (
        <div className="absolute right-0 top-0">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <img
          src="/User.png"
          alt="Patient_img"
          className=" block h-[2.4rem] w-[2.4rem]  rounded-full bg-center object-cover"
        />
        <div className="flex flex-col">
          <span
            className={`text-md font-semibold  ${isActive ? (patient ? "text-[#7C51C2]" : "text-[#146EB4]") : "text-stone-700"}  `}
          >
            {(patient ? data?.therapist.name : data?.patient.name) || "Name"}
          </span>
          <span
            className={`text-sm md:block hidden ${isActive ? patient ? "text-[#9B6DE2]" : "text-[#146fb4d7]" : "text-stone-400"}`}
          >
            {data?.notes ||
              data?.problem.slice(0, 25).concat("...") || 
              "Notes here"}
          </span>
        </div>
      </div>

      <span
        className={`flex md:text-lg font-bold ${isActive ? (patient ? "text-[#9B6DE2]" : "text-[#146EB4]") : "text-stone-700"}`}
      >
        {data?.startTime > 12
          ? `${Math.round(data.startTime % 12)}:00 PM`
          : `${data.startTime}:00 AM`}
      </span>
    </div>
  );
}

export default AppointmentCard;
