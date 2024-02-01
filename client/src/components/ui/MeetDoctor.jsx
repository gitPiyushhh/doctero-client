import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPlayer from "react-player";
import peerService from "../../services/meet";

import Modal from "./Modal";
import MeetControlPanel from "./MeetControlPanel";
import { useSocket } from "../../contexts/SocketProvider";

function MeetDoctor() {
  /*
    Local state
  */
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const notificationCount = 0;
  /*
   Effects
  */
  // useEffect((message) => {
  //   toast.success(message)
  // }, [notificationCount])

  /*
    Socket events
  */
  const socket = useSocket();

  /*
    Evennt handlers
  */
  const handleUserJoined = useCallback(({ user, id }) => {
    console.log(`User: ${user} joined the room`);
    toast.success(`User: ${user} joined the room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await peerService.getoffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIcomingCall = useCallback(
    async ({ from, offer }) => {
      // Give a ringing caller tune here as an enhancement

      setRemoteSocketId(from);

      toast.success(`Incoming call from ${from}`);
      console.log(`Incoming call from ${from}: ${offer}`);

      /*
        Stream (Remote user on)
      */
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      const answer = await peerService.getAnswer(offer);
      socket.emit("call:accepted", { to: from, answer });
    },
    [socket]
  );

  const handleSendStreams = useCallback(() => {
    if (myStream && myStream.getTracks) {
      for (const track of myStream.getTracks()) {
        peerService.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, answer }) => {
      peerService.setLocalDescription(answer);
      console.log("Call accepted");
      handleSendStreams();
    },
    [handleSendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peerService.getoffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeededIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peerService.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeededFinal = useCallback(async ({ ans }) => {
    await peerService.setLocalDescription(ans);
  }, []);

  /*
    Effects
  */
  useEffect(() => {
    peerService.peer.addEventListener("negotiationneeded", handleNegoNeeded);

    return () =>
      peerService.peer.removeEventListener(
        "negotiationneeded",
        handleNegoNeeded
      );
  }, [handleNegoNeeded]);

  useEffect(() => {
    peerService.peer.addEventListener("track", async (ev) => {
      const incomingRemoteStream = ev.streams;
      console.log("GOT REMOTE TRACKS 🥳");
      console.log(incomingRemoteStream);
      setRemoteStream(incomingRemoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("call:incoming", handleIcomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeededIncoming);
    socket.on("peer:nego:final", handleNegoNeededFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("call:incoming", handleIcomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeededIncoming);
      socket.off("peer:nego:final", handleNegoNeededFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIcomingCall,
    handleCallAccepted,
    handleNegoNeededIncoming,
    handleNegoNeededFinal,
  ]);

  /*
    Meta data
  */
  const controlsMetaData = [
    {
      name: "recording",
      open: "26",
    },
    {
      name: "voice",
      open: "21",
      close: "27",
      openHandler: () => alert('No handler till 🙂')
    },
    {
      name: "call",
      open: "23",
      higlight: true,
      openHandler: () => alert('No handler till 🙂')
    },
    {
      name: "video",
      open: "24",
      close: "25",
      openHandler: handleSendStreams,
    },
    {
      name: "settings",
      open: "22",
      round: true,
      openHandler: () => alert('No handler till 🙂')
    },
  ];

  /*
    JSX
  */
  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Toaster position="top-right" />

      <div className="flex h-[100%]">
        <div className="bg-black rounded-r-md h-full w-[64%] shadow-lg flex flex-col items-center relative">
          <div className="p-4 rounded-t-md w-full flex justify-between bg-black absolute z-20">
            {/* About meet */}
            <div className="flex space-x-2 items-center">
              <img
                src="/Owner.avif"
                alt="doctor_image"
                className="block w-12 h-12 rounded-full bg-center object-cover"
              />
              <span>Jonas Smedthman</span>
            </div>

            <div className="flex space-x-4">
              {remoteSocketId && (
                <button
                  onClick={handleCallUser}
                  className="focus:outline-none active:outline-none"
                >
                  Let patient in
                </button>
              )}

              <span className="p-2 px-4 rounded-md bg-[#0008] flex items-center">
                10:00
              </span>
            </div>
          </div>

          {/* User screen */}
          <div className="absolute top-0 left-0 w-full h-full">
            <ReactPlayer
              url={myStream}
              playing
              muted
              height="94%"
              width="100%"
            />
          </div>

          <div className="flex justify-center w-full">
            {/* Remote screen */}
            {remoteStream && (
              <div className=" shadow-sm absolute bottom-0 right-0 w-[40%] h-[20%]  bg-black rounded-md">
                <ReactPlayer
                  url={remoteStream}
                  playing
                  muted
                  height="100%"
                  width="100%"
                />
              </div>
            )}

            <MeetControlPanel localStream={myStream} remoteStream={remoteStream} controlsMetaData={controlsMetaData}/>
          </div>
        </div>

        <div className="w-[36%] h-full p-4">
          <Modal></Modal>
        </div>
      </div>
    </div>
  );
}

export default MeetDoctor;

