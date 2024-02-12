import React, {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPlayer from "react-player";
import peerService from "../../services/meet";

import Modal from "./Modal";
import MeetControlPanel from "./MeetControlPanel";
import { useSocket } from "../../contexts/SocketProvider";
import Message from "./Message";
import TabbedComponent from "./TabbedComponent";
import { useNavigate } from "react-router-dom";

import EmojiPicker from "emoji-picker-react";
import { useQuery } from "@tanstack/react-query";
import {
  getLiveAppointmentForDoctor,
  getLiveAppointmentForPatient,
} from "../../services/apiAppointment";
import FullPageSpinner from "../layout/FullPageSpinner";
import moment from "moment";
import Timer from "./Timer";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  localMic: false,
  localCamera: false,
  remoteMic: false,
  remoteCamera: false,
  activeTab: "Chat",
  chat: [],
  reports: [
    {
      name: "diabities",
    },
  ],
  emojiOpen: false,
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

    case "changeActiveTab":
      return { ...state, activeTab: action.payload };

    case "openEmojiPallete":
      return { ...state, emojiOpen: true };

    case "closeEmojiPallete":
      return { ...state, emojiOpen: false };

    default:
      return { ...state };
  }
};

function MeetDoctor() {
  const user = JSON.parse(localStorage.getItem("user"));
  const now = moment();

  const navigate = useNavigate();

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
    Global state
  */
  const mobileSidebarOpen = useSelector((state) => state.ui.mobileSidebarOpen);
  const dispatchGlobal = useDispatch();

  /*
    React query (fetching)
  */
  const { isLoading, data: liveAppointment } = useQuery({
    queryKey: ["liveAppointment"],
    queryFn: () => getLiveAppointmentForDoctor({ doctor: user?.doctor }),
  });

  const { isLoadingPaient, data: liveAppointmentPatient } = useQuery({
    queryKey: ["liveAppointmentPatient"],
    queryFn: () => getLiveAppointmentForPatient({ patient: user?.patient }),
  });

  console.log("Rendered meet component");

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

  useEffect(() => {
    handleSetUserStream();
  }, [handleSetUserStream]);

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

    if (!tempMessage.length) {
      toast("Message feild is empty");
      return;
    }

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

  const handleChangeTab = useCallback(
    (tabName) => {
      if (tabName !== state.activeTab)
        dispatch({ type: "changeActiveTab", payload: tabName });
    },
    [state.activeTab]
  );

  const handleSelectEmoji = useCallback(
    (emojiData, event) => {
      setMessage(`${message}${emojiData.emoji}`);
      dispatch({ type: "closeEmojiPallete" });
    },
    [message]
  );

  const stopTracks = (stream) => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleLeaveMeet = useCallback(async () => {
    // Close all peer connections
    peerService.closePeerConnection(remoteSocketId);
    peerService.setLocalDescription(null);
    socket.emit("call:ended", { to: remoteSocketId });

    if (myStream) {
      stopTracks(myStream);
      setMyStream(null);
    }

    if (remoteStream) {
      stopTracks(remoteStream);
      setRemoteStream(null);
    }

    setRemoteUserIn(null);
    setRemoteSocketId(null);

    // Navigate to the desired page
    navigate(user?.doctor ? "/tele-consultancy" : "/patient/tele-consultancy");

    // Reload the screen
    window.location.reload();
  }, [remoteSocketId, socket, myStream, remoteStream, navigate, user?.doctor]);

  const handleEndCall = useCallback(() => {
    peerService.closePeerConnection(remoteSocketId);
    peerService.setLocalDescription(null);

    if (myStream) {
      stopTracks(myStream);
      setMyStream(null);
    }

    if (remoteStream) {
      stopTracks(remoteStream);
      setRemoteStream(null);
    }

    setRemoteUserIn(null);
    setRemoteSocketId(null);

    // Navigate to the desired page
    navigate(user?.doctor ? "/tele-consultancy" : "/patient/tele-consultancy");

    // Reload the screen
    window.location.reload();
  }, [myStream, navigate, remoteSocketId, remoteStream, user?.doctor]);

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
      peerService?.peer?.removeEventListener(
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
      peerService?.peer?.removeEventListener("track", async (ev) => {
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
    socket.on("call:ended", handleEndCall);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("call:incoming", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeededIncoming);
      socket.off("peer:nego:final", handleNegoNeededFinal);
      socket.off("chat:message", handleRecieveMessage);
      socket.off("call:ended", handleEndCall);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeededIncoming,
    handleNegoNeededFinal,
    handleRecieveMessage,
    handleEndCall,
  ]);

  /*
    Meta data
  */
  const controlsMetaDataDoctor = [
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
      openHandler: handleLeaveMeet,
    },
    {
      name: "video",
      open: "24",
      close: "25",
      openHandler: () => alert("No handler till 🙂"),
    },
  ];

  const controlsMetaDataPatient = [
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
      openHandler: handleLeaveMeet,
    },
    {
      name: "video",
      open: "24",
      close: "25",
      openHandler: () => {
        console.log("Contol has been clicked");
        handleSendStreamHandler();
      },
    }
  ];

  const tabbedComponentMetaData = [
    {
      name: "Chat",
    },
    {
      name: "Reports",
    },
  ];

  /*
   Conditional rendering
 */
  if (isLoading || isLoadingPaient) {
    return (
      <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-auto">
        <FullPageSpinner />
      </div>
    );
  }

  /*
    JSX
  */
  return (
    <>
      <Toaster position="top-right" />

      <div
        className={`absolute md:left-[16%] ${mobileSidebarOpen ? "left-[16%] md:w-[84%] md:left-[16%]" : "left-0 w-full"} top-0 z-10 h-[100dvh] md:w-[84%] overflow-y-scroll`}
      >
        <div className="flex h-[100%] flex-col md:flex-row">
          <div className="bg-black h-full w-full md:w-[64%] shadow-lg flex flex-col items-center relative">
            <div className="p-4 rounded-t-md w-full flex justify-between items-start bg-black absolute z-20">
              {/* About meet */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex md:flex-row space-x-2 items-center">
                  <img
                    src="/User.png"
                    alt="doctor_image"
                    className="block w-8 h-8 md:w-12 md:h-12 rounded-full bg-center object-cover"
                  />
                  {user?.doctor ? (
                    <span>{liveAppointment?.patient?.name}</span>
                  ) : (
                    <span>{liveAppointmentPatient?.therapist?.name}</span>
                  )}
                </div>

                <div className="md:hidden block ml-[-1rem]">
                  <Timer onTimerComplete={handleLeaveMeet} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4 justify-center items-end md:items-center">
                {remoteSocketId && !remoteUserIn && user?.doctor && (
                  <button
                    onClick={handleCallUser}
                    className="focus:outline-none active:outline-none"
                  >
                    Let patient in
                  </button>
                )}

                {!remoteSocketId && user?.patient && (
                  <p>Please wait while doctor let you in</p>
                )}

                {!remoteSocketId && user?.doctor && <p>No one in room</p>}

                {!remoteSocketId && user?.doctor && (
                  <button
                    onClick={handleRingUser}
                    className="focus:outline-none active:outline-none"
                  >
                    {ringing}
                  </button>
                )}

                <div className="md:block hidden">
                  <Timer onTimerComplete={handleLeaveMeet} />
                </div>
              </div>
            </div>

            {/* User screen */}
            <div className="absolute top-0 left-0 w-full h-full">
              <ReactPlayer
                url={remoteStream}
                playing
                height="94%"
                width="100%"
              />
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

          <div className="w-full md:w-[36%] h-full p-4 relative overflow-y-scroll pb-12">
            <Modal>
              <TabbedComponent
                metaData={tabbedComponentMetaData}
                activeTab={state.activeTab}
                handleChangeTab={handleChangeTab}
              />

              <div className="flex flex-col gap-4 items-start overflow-scroll pt-16">
                {state.activeTab === "Chat" &&
                  state.chat.map((message) => (
                    <Message
                      key={`${message.time} + ${message.text}`}
                      text={message.text}
                      time={message.time}
                      type={message.type}
                    />
                  ))}

                {state.activeTab === "Reports" && (
                  <div className=" absolute bottom-24 left-[50%] translate-x-[-50%] px-4 py-2 rounded bg-stone-100 text-slate-700 flex space-x-2 cursor-pointer shadow-md active:shadow-md hover:shadow-lg transition-all">
                    <img
                      src="/add-icon.svg"
                      alt="Add icon"
                      className="h-6 w-6"
                    />

                    <span className="text-inherit">Add new report</span>

                    <div className="absolute left-[-10px] w-full h-full ">
                      <input
                        type="file"
                        className="bg-transparent opacity-0 absolute w-full cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {state.activeTab === "Reports" &&
                  state.reports.map((report) => (
                    <div className="text-stone-700 p-2 pb-8 bg-stone-100 w-full rounded relative cursor-pointer">
                      <span className="bg-[#00000010] w-full p-4 h-fit block rounded">
                        {report.name.slice(0, 1).toUpperCase() +
                          report.name.slice(1)}
                      </span>
                      <span className="absolute right-4 bottom-1">10:00</span>
                    </div>
                  ))}

                <div className="w-[93%]  absolute bottom-4 left-[50%] translate-x-[-50%] bg-stone-200 rounded flex justify-between items-center pr-2 space-x-2">
                  <input
                    type="text"
                    value={message}
                    className="w-full bg-transparent p-4 text-stone-700 placeholder:text-stone-500 focus:outline-none"
                    placeholder="Some thin u wanna say"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="text-stone-700">
                    <div
                      className="w-[3rem] p-2 cursor-pointer"
                      onClick={() =>
                        state.emojiOpen
                          ? dispatch({ type: "closeEmojiPallete" })
                          : dispatch({ type: "openEmojiPallete" })
                      }
                    >
                      <img
                        src="/emoji-icon.svg"
                        alt="Emoji icon"
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="absolute bottom-16 left-[50%] translate-x-[-50%]">
                      <EmojiPicker
                        open={state.emojiOpen}
                        Theme="dark"
                        skinTonesDisabled={true}
                        onEmojiClick={(emojiData, event) => {
                          handleSelectEmoji(emojiData, event);
                        }}
                      />
                    </div>
                  </div>

                  <button
                    className="focus:outline-none"
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
    </>
  );
}

export default memo(MeetDoctor);
