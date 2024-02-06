import React, { useCallback, useEffect, useReducer, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPlayer from "react-player";
import peerService from "../../services/meet";

import Modal from "./Modal";
import MeetControlPanel from "./MeetControlPanel";
import { useSocket } from "../../contexts/SocketProvider";
import Message from "./Message";

const initialState = {
  localMic: false,
  localCamera: false,
  remoteMic: false,
  remoteCamera: false,
  chat: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "mute":
      return { ...state, localMic: true };

    case "messageSent":
      const newMessage = {
        text: action.payload.text,
        time: action.payload.time,
        type: "local",
      };
      return { ...state, chat: [...state.chat, newMessage] };

    case "messageRecieved":
      const newMessageRemote = {
        text: action.payload.text,
        time: action.payload.time,
        type: "remote",
      };
      return { ...state, chat: [...state.chat, newMessageRemote] };

    default:
      return { ...state };
  }
};

function MeetDoctor() {
  const user = JSON.parse(localStorage.getItem("user"));

  /*
    Local state
  */
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [remoteUserIn, setRemoteUserIn] = useState(null);
  const [ringing, setRinging] = useState("Call user");
  const [newNotification, setNewNotification] = useState(null);

  const [message, setMessage] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  /*
    Socket events
  */
  const socket = useSocket();

  const handleSetUserStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    setMyStream(stream);
  }, []);

  handleSetUserStream();

  /*
    Event handlers
  */
  function hasRemoteStream(peerConnection) {
    const transceivers = peerConnection.getTransceivers();

    for (const transceiver of transceivers) {
      if (transceiver.receiver.track) {
        return true;
      }
    }

    return false;
  }

  const handleSendStreams = useCallback(async () => {
    if (!hasRemoteStream(peerService.peer)) {
      if (myStream && myStream.getTracks) {
        for (const track of myStream.getTracks()) {
          peerService.peer.addTrack(track, myStream);
        }
      }

      console.log("We are setting up the remote stream ..");
    }
  }, [myStream]);

  const handleSendStreamHandler = useCallback(() => {
    if (myStream && myStream.getTracks) {
      for (const track of myStream.getTracks()) {
        peerService.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleUserJoined = useCallback(
    ({ user, id }) => {
      console.log(`User: ${user} joined the room`);
      toast.success(`User: ${user} joined the room`);
      setRinging(null);
      setRemoteSocketId(id);
      setNewNotification(`User: ${user} joined the room`);

      handleSendStreams();
    },
    [handleSendStreams]
  );

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await peerService.getoffer();

    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    handleSendStreams();
    setRemoteUserIn(null); // May be remove further
  }, [handleSendStreams, remoteSocketId, socket]);

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

  const handleCallAccepted = useCallback(
    ({ from, answer }) => {
      peerService.setLocalDescription(answer);
      console.log("Call accepted");
      setRemoteUserIn(remoteSocketId); // May be remove further
    },
    [remoteSocketId]
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
    setRinging("Ringing");

    return () => {
      setRinging("Not answered");
    };
  }, []);

  const handlePlayRingtone = useCallback(() => {
    console.log("Played ringtone");
    let audio = new Audio("/sounds-ringtone.mp3");

    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= 15) {
        audio.pause();
        audio.currentTime = 0;
        setRinging("Not answered");
      }
    });

    if (ringing === "Ringing") {
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

  const handleSendMessage = useCallback(async () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const tempMessage = message;

    const messagePayload = {
      text: tempMessage,
      time: `${hours}:${minutes}`,
      type: "local",
    };
    dispatch({ type: "messageSent", payload: messagePayload });
    socket.emit("chat:message", { to: remoteSocketId, message: tempMessage });
    setMessage("");
    console.log(message);
  }, [message, remoteSocketId, socket, dispatch]);

  const handleRecieveMessage = useCallback(({ message }) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const messagePayload = {
      text: message,
      time: `${hours}:${minutes}`,
      type: "remote",
    };

    toast.success("A new message recieved");
    setNewNotification(`A new message recieved at: ${Date.now()}`);
    dispatch({ type: "messageRecieved", payload: messagePayload });
  }, []);

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
      setRemoteStream(incomingRemoteStream[0]);
      setNewNotification("Remote user opened camera");

      console.log(peerService.peer);
    });

    return () => {
      peerService.peer.removeEventListener("track", async (ev) => {
        const incomingRemoteStream = ev.streams;
        console.log("GOT REMOTE TRACKS 🥳");
        console.log(incomingRemoteStream);
        setRemoteStream(incomingRemoteStream[0]);
        setNewNotification("Remote user opened camera");
      });
    };
  }, [remoteStream]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("call:incoming", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeededIncoming);
    socket.on("peer:nego:final", handleNegoNeededFinal);
    socket.on("chat:message", handleRecieveMessage);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("call:incoming", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeededIncoming);
      socket.off("peer:nego:final", handleNegoNeededFinal);
      socket.off("chat:message", handleRecieveMessage);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeededIncoming,
    handleNegoNeededFinal,
    handleRecieveMessage,
  ]);

  /*
    Meta data
  */
  const controlsMetaDataDoctor = [
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
      openHandler: () => alert("No handler till 🙂"),
    },
    {
      name: "settings",
      open: "22",
      round: true,
      openHandler: () => alert("No handler till 🙂"),
    },
  ];

  const controlsMetaDataPatient = [
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
      openHandler: () => {
        console.log("Contol has been clicked");
        handleSendStreamHandler();
      },
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
                  {ringing}
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
            <ReactPlayer url={remoteStream} playing height="94%" width="100%" />
          </div>

          <div className="flex justify-center w-full">
            {/* Remote screen */}
            {myStream && (
              <div className=" shadow-sm absolute bottom-0 right-0 w-[40%] h-[20%]  bg-black rounded-md">
                <ReactPlayer
                  url={myStream}
                  muted
                  playing
                  height="100%"
                  width="100%"
                />
              </div>
            )}

            {user?.doctor ? (
              <MeetControlPanel
                localStream={myStream}
                remoteStream={remoteStream}
                controlsMetaData={controlsMetaDataDoctor}
              />
            ) : (
              <MeetControlPanel
                localStream={myStream}
                remoteStream={remoteStream}
                controlsMetaData={controlsMetaDataPatient}
              />
            )}
          </div>
        </div>

        <div className="w-[36%] h-full p-4 relative">
          <Modal>
            <div className=" space-x-2 bg-stone-100 p-2 rounded absolute flex justify-center items-center top-4 left-[50%] translate-x-[-50%] w-[93%]">
              <span className="p-2 px-4 bg-blue-100 text-stone-700 w-[50%] rounded flex justify-center items-center cursor-pointer">
                Chat
              </span>
              <span className="p-2 px-4 text-stone-700 w-[50%] rounded flex justify-center items-center cursor-pointer">
                Reports
              </span>
            </div>

            <div className="flex flex-col gap-4 items-start overflow-scroll pt-16">
              {state.chat.map((message) => (
                <Message
                  key={`${message.time} + ${message.text}`}
                  text={message.text}
                  time={message.time}
                  type={message.type}
                />
              ))}

              <div className="w-[93%]  absolute bottom-4 left-[50%] translate-x-[-50%] bg-stone-200 rounded flex justify-between items-center pr-2">
                <input
                  type="text"
                  value={message}
                  className="w-full bg-transparent p-4 text-stone-700 placeholder:text-stone-500 focus:outline-none"
                  placeholder="Some thin u wanna say"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="text-stone-700"></div>

                <button
                  onClick={() => {
                    handleSendMessage();
                  }}
                >
                  &rarr;
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default MeetDoctor;
