import React from "react";
import NoData from "../layout/NoData";
import AppointmentCard from "./AppointmentCard";
import { getTodayAppointentsForDoctor } from "../../services/apiAppointment";
import { useQuery } from "@tanstack/react-query";

function TodayAppointments() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { data: todayAppointments } = useQuery({
    queryKey: ["todayAppointments"],
    queryFn: () => getTodayAppointentsForDoctor({ doctor: user.doctor }),
  });

  return (
    <div className="flex h-[100%] w-full flex-col overflow-scroll rounded-md bg-white px-4 py-2 shadow-sm">
      {todayAppointments && todayAppointments.length > 0 ? (
        todayAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            isActive={true}
            isLive={true}
            data={appointment}
            handleCardClick={() => console.log("No click assinged")}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default TodayAppointments;
