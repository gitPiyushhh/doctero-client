import React from "react";

function PatientFeedbackCard({ data }) {
  return (
    <div className="flex justify-start items-start w-full space-x-4">
      <img
        src="/User.png"
        alt="User_image"
        className="w-[6rem] h-[8rem] rounded-lg  bg-center object-cover"
      />

      <div className="flex flex-col justify-center items-start gap-2">
        <span className="text-stone-500 font-semibold text-md">
          {data?.patient.name}
        </span>

        <div className="font-semibold  flex">
          {Array.from({ length: data?.stars }).map((star) => (
            <img
              src="/full-star-icon.svg"
              alt="full_star"
              className="w-[16px]"
            />
          ))}

          {Array.from({ length: 5 - data?.stars }).map((star) => (
            <img
              src="/empty-star-icon.svg"
              alt="full_star"
              className="w-[16px]"
            />
          ))}
        </div>

        <span className="text-stone-500 text-[0.8rem] font-light">
          {data?.content}
        </span>
      </div>
    </div>
  );
}

export default PatientFeedbackCard;
