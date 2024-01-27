import React from "react";

function PatientFeedbackCard() {
  return (
    <div className="flex justify-start w-full space-x-4">
      <img
        src="/User.png"
        alt="User_image"
        className="w-[6rem] h-[8rem] rounded-lg  bg-center object-cover"
      />

      <div className="flex flex-col justify-between items-start gap-2">
        <span className="text-stone-500 font-semibold text-md">
          Henry Casady
        </span>

        <div className="font-semibold  flex">
          <img src="/full-star-icon.svg" alt="full_star" className="w-[16px]"/>
          <img src="/full-star-icon.svg" alt="full_star" className="w-[16px]"/>
          <img src="/full-star-icon.svg" alt="full_star" className="w-[16px]"/>
          <img src="/full-star-icon.svg" alt="full_star" className="w-[16px]"/>
          <img src="/empty-star-icon.svg" alt="full_star" className="w-[16px]"/>
        </div>

        <span className="text-stone-500 text-[0.8rem] font-light">
          Dolore commodo commodo mollit sunt ut veniam dolor eu elit sint
          fugiat.Velit mollit adipisicing deserunt sunt non dolor pariatur amet
          fugiat eiusmod aliqua. 
        </span>
      </div>
    </div>
  );
}

export default PatientFeedbackCard;
