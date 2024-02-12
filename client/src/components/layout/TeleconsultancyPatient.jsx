import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import {
  getAppointment,
  getTodayRemoteAppointentsForPatient,
} from "../../services/apiAppointment";
import toast, { Toaster } from "react-hot-toast";
import Header from "../ui/Header";
import FullPageSpinner from "./FullPageSpinner";
import { useNavigate } from "react-router-dom";
import TodayAppointments from "../ui/TodayAppointments";
import { useSocket } from "../../contexts/SocketProvider";
import NoData from "./NoData";
import { useSelector } from "react-redux";

function TeleconsultancyPatient() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const now = new Date().getHours();

  const navigate = useNavigate();

  const room = 1; // Hardcoded, this will come with every appointment

  /*
    Local state
  */
  const [activeAppointmentId, setActiveAppointmentId] = useState(null);

  /* 
    Global state
  */
  const mobileSidebarOpen = useSelector((state) => state.ui.mobileSidebarOpen);

  /*
    React query(fetching)
  */
  const { isLoading: isLoadingTodayAppointments, data: todayAppointments } =
    useQuery({
      queryKey: ["todayAppointmentsPatient"],
      queryFn: () =>
        getTodayRemoteAppointentsForPatient({ patient: user?.patient }),
    });

  const { isLoading: isLoadingAppointment, data: appointment } = useQuery({
    queryKey: ["appointment", activeAppointmentId],
    queryFn: () => getAppointment(activeAppointmentId),
  });

  /*
    Derived state
  */
  const isLive =
    appointment?.startTime >= now && appointment?.startTime <= now + 1;

  /*
    UI effects
  */
  useEffect(() => {
    if (todayAppointments?.length)
      setActiveAppointmentId(todayAppointments?.[0]?._id);
  }, [todayAppointments]);

  useEffect(() => {
    setTimeout(() => {
      if (todayAppointments?.length) {
        toast.success(
          `You have ${todayAppointments?.length} appointments today`
        );
      }
    }, 0);
  }, [todayAppointments?.length]);

  /*
    UI event handlers
  */
  const handleActiveAppointmentChange = useCallback((appointmentId) => {
    setActiveAppointmentId(appointmentId);
  }, []);

  /*
    Socket events
  */
  const socket = useSocket();

  /*
    Event handlers
  */
  function handleJoinMeet() {
    socket.emit("room:join", { userId, room });
  }

  const handleJoinRoom = useCallback(
    function (data) {
      const { userId, room } = data;

      console.log(userId, room);
      navigate("/tele-consultancy/doctor/meet");
    },
    [navigate]
  );

  /*
    Socket events
  */
  useEffect(() => {
    socket.on("room:join", (data) => {
      handleJoinRoom(data);

      return () => socket.off("room:join");
    });
  }, [handleJoinRoom, socket]);

  return (
    <>
      <Toaster position="top-right" />
      <div
        className={`absolute ${mobileSidebarOpen ? "left-[16%] w-[84%] md:left-[16%]" : "left-0 w-full"} md:left-[16%] top-0 z-10 h-[100dvh] md:w-[84%] overflow-y-auto`}
      >
        <Header name="Tele-consult" />

        <div className="flex flex-col-reverse md:flex-row h-fit mt-16">
          <div className="h-full w-full md:w-[64%] flex flex-col justify-start items-start px-4 md:px-8 py-5">
            {isLoadingAppointment ? (
              <div className="h-[91vh] w-full flex justify-center items-center">
                <FullPageSpinner />
              </div>
            ) : todayAppointments?.length ? (
              <div className="flex flex-col gap-6 outline outline-[1px] w-[100%] outline-stone-200 p-4 h-full rounded-sm">
                <img
                  src="/Owner.avif"
                  alt="patient_img"
                  className="h-[12rem] w-full md:h-[24rem] bg-black rounded-md bg-cover object-contain border-[1px]"
                />

                <div className="text-stone-700 flex flex-col items-start md:flex-row gap-2 md:gap-0 md:space-x-4 md:items-end">
                  <span className="text-xl font-semibold">
                    {appointment?.therapist.name}
                  </span>
                  <span className="text-sm font-semibold text-stone-500">
                    {appointment?.patient?.age &&
                      `Specialised in ${appointment?.therapist?.specialization} with ${appointment?.therapist?.experience} YOE`}
                  </span>
                </div>

                <span className="text-stone-700 w-full">
                  {appointment?.problem}
                </span>

                {!isLive ? (
                  <button
                    className={`bg-stone-400 text-stone-50 w-full md:w-fit px-4 md:px-16 py-2 rounded-md`}
                    disabled
                  >
                    {now > appointment?.startTime
                      ? `Completed at
                      ${
                        appointment?.startTime > 12
                          ? `${Math.round(appointment?.startTime % 12)}:00 PM`
                          : `${appointment?.startTime}:00 AM`
                      }`
                      : `Scheduled at
                        ${
                          appointment?.startTime > 12
                            ? `${Math.round(appointment?.startTime % 12)}:00 PM`
                            : `${appointment?.startTime}:00 AM`
                        }, Today`}
                  </button>
                ) : (
                  <button
                    className={`${user.doctor ? "bg-[#136DB4]" : "bg-[#7C51C2]"} text-stone-50 w-fit px-16 py-2 rounded-md`}
                    onClick={handleJoinMeet}
                  >
                    Join now
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8">
                <NoData />
                <div className="w-full flex flex-col items-center gap-4">
                  <span className="text-stone-700">
                    You dont have any appointments today
                  </span>
                  <button
                    className={`${user.doctor ? "bg-[#136DB4]" : "bg-[#7C51C2]"}`}
                    onClick={() =>
                      navigate(
                        user.doctor ? "/dashboard" : "/patient/dashboard"
                      )
                    }
                  >
                    Create a new appointment
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-[16rem] md:h-[91vh] p-4 w-full md:w-[36%] flex justify-center items-center">
            <TodayAppointments
              todayAppointments={todayAppointments}
              patient={true}
              isLoading={isLoadingTodayAppointments}
              activeAppointmentId={activeAppointmentId}
              handleActiveAppointmentId={(appointmentId) =>
                handleActiveAppointmentChange(appointmentId)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TeleconsultancyPatient;
