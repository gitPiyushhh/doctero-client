import React from "react";
import toast, { Toaster } from "react-hot-toast";

import Header from "./Header";
import Modal from "./Modal";
import MeetControlPanel from "./MeetControlPanel";
import { useSocket } from "../../contexts/SocketProvider";
import { io } from "socket.io-client";

function MeetPatient() {
  const socket = useSocket();

  console.log(socket)

  /*
    JSX
  */
  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Toaster position="top-right" />

      <div className="flex h-[100%]">
        <div className="bg-black h-full w-[64%] shadow-lg flex flex-col items-center relative">
          <video autoPlay playsInline className="absolute top-0 left-0 w-full h-full"  alt="Doctor video" id="user-1"></video>
          
          <video autoPlay playsInline className="absolute bottom-4 right-4 bg-stone-800"  alt="Patient video" id="user-2"></video>
          
          <div className="p-4 rounded-r-md w-full flex justify-between absolute">
            <div className="flex space-x-2 items-center">
              <img
                src="/Owner.avif"
                alt="doctor_image"
                className="block w-12 h-12 rounded-full bg-center object-cover"
              />
              <span>Jonas Smedthman</span>
            </div>

            <span className="p-2 px-4 rounded-md bg-[#0008] flex items-center">10:00</span>
          </div>

          <MeetControlPanel />
        </div>

        <div className="w-[36%] h-full p-4">
          <Modal></Modal>
        </div>
      </div>
    </div>
  );
}

export default MeetPatient;
