import React from "react";
import NoData from "../layout/NoData";
import AppointmentCard from "./AppointmentCard";
import FullPageSpinner from "../layout/FullPageSpinner";

function TodayAppointments({
  isLoading,
  todayAppointments,
  patient,
  activeAppointmentId,
  handleActiveAppointmentId,
}) {
  /*
    Conditional rendering
  */
  if (isLoading) {
    return (
      <div className="flex h-[100%] w-full flex-col overflow-scroll rounded-md bg-white px-4 py-2 shadow-sm">
        <span className="text-md text-stone-500">Today appointments</span>
        <FullPageSpinner />
      </div>
    );
  }

  /*
    JSX
  */
  return (
    <div className="flex h-[100%] w-full gap-2 md:gap-0 flex-col overflow-scroll rounded-md bg-white px-4 py-2 shadow-sm pt-3">
      <span className="text-md text-stone-500">Today appointments</span>
      {todayAppointments && todayAppointments.length > 0 ? (
        todayAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            isActive={appointment?._id === activeAppointmentId}
            patient={patient}
            data={appointment}
            handleCardClick={handleActiveAppointmentId}
          />
        ))
      ) : (
        <div className="w-full h-[100%] flex justify-start items-start">
          <div className="w-fit h-fit pt-4">
            <NoData />
          </div>
        </div>
      )}
    </div>
  );
}

export default TodayAppointments;
