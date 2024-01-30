import React from "react";

function MeetControlPanel() {
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
      close: "22",
    },
    {
      name: "call",
      open: "23",
      higlight: true
    },
    {
      name: "video",
      open: "24",
      close: "25",
    },
    {
      name: "settings",
      open: "22",
      round: true
    },
  ];

  return (
    <div className="flex justify-between p-4 bg-[#0000004c] space-x-4 w-fit rounded-md absolute bottom-4 left-4">
      {controlsMetaData.map((control) => (
        <div className={`w-16 h-16 p-4 ${control.higlight && 'bg-[#db2525dc] rounded-full'} ${control.round && 'active:animate-spin'}`} role="button" key={control.name}>
          <img
            src={`/${control.open}.svg`}
            alt="control_icon"
            className="w-full h-full block"
          />
        </div>
      ))}
    </div>
  );
}

export default MeetControlPanel;
