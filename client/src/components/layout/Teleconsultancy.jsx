import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import TodayAppointments from "../ui/TodayAppointments";
import Header from "../ui/Header";
import { useSocket } from "../../contexts/SocketProvider";

function Teleconsultancy() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const navigate = useNavigate();

  const room = 1;

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

  const handleJoinRoom = useCallback(function (data) {
    const { userId, room } = data;

    console.log(userId, room)
    navigate("/tele-consultancy/doctor/meet");
  }, [navigate]);

  /*
    Socket events
  */
  useEffect(() => {
    socket.on("room:join", (data) => {
      handleJoinRoom(data);

      return () => socket.off("room:join");
    });
  }, [handleJoinRoom, socket]);

  /*
    JSX
  */

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Toaster position="top-right" />

      <Header name="Tele-consultancy" />

      <div className="flex h-[91%]">
        <div className="h-[92%] w-[64%] flex flex-col justify-start items-center px-8 py-5 ">
          <div className="flex flex-col gap-6 outline outline-[1px] outline-stone-300 p-4 h-full rounded-sm">
            <img
              src="/User.png"
              alt="patient_img"
              className="w-[16rem] h-auto rounded-xl bg-center object-cover border-[1px]"
            />

            <div className="text-stone-700 flex space-x-4 items-end">
              <span className="text-xl font-semibold">Samupatient</span>
              <span className="text-sm font-semibold text-stone-500">
                32 yr, Female
              </span>
            </div>

            <span className="text-stone-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              con
            </span>

            <button
              className="bg-[#136DB4] text-stone-50 w-fit px-16 py-2"
              onClick={handleJoinMeet}
            >
              Join now
            </button>
          </div>
        </div>

        <div className="h-[100%] p-4 w-[36%] flex justify-center items-center">
          <TodayAppointments />
        </div>
      </div>
    </div>
  );
}

export default Teleconsultancy;
