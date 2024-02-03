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
  const [remoteUserIn, setRemoteUserIn] = useState(null);
  const [ringing, setRinging] = useState("Call user");
  const [newNotification, setNewNotification] = useState(null);

  /*
    Socket events
  */
  const socket = useSocket();

  /*
    Event handlers
  */
  const handleUserJoined = useCallback(({ user, id }) => {
    console.log(`User: ${user} joined the room`);
    toast.success(`User: ${user} joined the room`);
    setRinging(null);
    setRemoteSocketId(id);
    setNewNotification(`User: ${user} joined the room`);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await peerService.getoffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setRemoteUserIn(null); // May be remove further
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);

      toast.success(`User ${from} let you in`);
      console.log(`User ${from} let you in, ${offer}`);

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
      setRemoteUserIn(from); // May be remove further
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
      setRemoteUserIn(remoteSocketId); // May be remove further
    },
    [handleSendStreams, remoteSocketId]
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

  const handleRingUser = useCallback(async () => {
    // Give a ringing caller tune here as an enhancement
    setRinging('Ringing');

    return () => {
      setRinging('Not answered');
    };
  }, []);

  const handlePlayRingtone = useCallback(() => {
    console.log("Played ringtone");
    let audio = new Audio("/sounds-ringtone.mp3");

    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= 15) {
        audio.pause();
        audio.currentTime = 0;
        setRinging('Not answered')
      }
    });

    if (ringing === 'Ringing') {
      audio.play();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("timeupdate", () => {});
    };
  }, [ringing]);

  const handlePlayNotification = useCallback(() => {
    console.log("Notification recieved");
    let audio = new Audio("/sounds-notification.mp3");

    if (newNotification) {
      audio.play();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [newNotification]);

  /*
    Effects
  */
  useEffect(() => {
    const playRingtone = handlePlayRingtone();

    return () => {
      playRingtone();
    };
  }, [handlePlayRingtone, ringing]);

  useEffect(() => {
    const playNotification = handlePlayNotification();

    return () => {
      playNotification();
    };
  }, [handlePlayNotification]);

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
      setNewNotification("Remote user opened camera");
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("call:incoming", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeededIncoming);
    socket.on("peer:nego:final", handleNegoNeededFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("call:incoming", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeededIncoming);
      socket.off("peer:nego:final", handleNegoNeededFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
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
      openHandler: () => alert("No handler till 🙂"),
    },
    {
      name: "call",
      open: "23",
      higlight: true,
      openHandler: () => alert("No handler till 🙂"),
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
      openHandler: () => alert("No handler till 🙂"),
    },
  ];

  /*
    JSX
  */
  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Toaster position="top-right" />

      <div className="flex h-[100%]">
        <div className="bg-black h-full w-[64%] shadow-lg flex flex-col items-center relative">
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

            <div className="flex space-x-4 items-center">
              {remoteSocketId && !remoteUserIn && (
                <button
                  onClick={handleCallUser}
                  className="focus:outline-none active:outline-none"
                >
                  Let patient in
                </button>
              )}

              {!remoteSocketId && <p>No one in room</p>}

              {!remoteSocketId && (
                <button
                  onClick={handleRingUser}
                  className="focus:outline-none active:outline-none"
                >
                  { ringing }
                </button>
              )}

              {/* { remoteSocketId ? (
                <p className="h-full flex items-center">
                  Please wait while the host let you in
                </p>
              ) : (
                <p className="h-full flex items-center">
                  No one else in the room
                </p>
              )} */}

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

            <MeetControlPanel
              localStream={myStream}
              remoteStream={remoteStream}
              controlsMetaData={controlsMetaData}
            />
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
