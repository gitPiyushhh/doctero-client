import React from "react";

function MeetControlPanel({ controlsMetaData, localStream, remoteStream }) {
  return (
    <div
      className={`flex justify-between p-4 md:px-16 md:p-4 bg-[#0000004c] space-x-4 w-fit rounded-md absolute ${localStream && "left-0 md:left-2"} bottom-0 transition-all`}
    >
      {controlsMetaData.map((control) => (
        <div
          className={`w-12 h-12 md:w-16 md:h-16 p-2 md:p-4 ${control.higlight && "bg-[#db2525dc] rounded-full"} ${control.round && "active:animate-spin"}`}
          role="button"
          key={control.name}
          onClick={control.openHandler}
        >
          <img
            src={`/${remoteStream != null && control.close  ? control.close : control.open}.svg`}
            alt="control_icon"
            className="w-full h-full block"
          />
        </div>
      ))}
    </div>
  );
}

export default MeetControlPanel;
