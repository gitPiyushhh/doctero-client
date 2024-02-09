import React from "react";
import { getFirstAppointentsForDoctor } from "../../services/apiAppointment";
import { useQuery } from "@tanstack/react-query";
import FullPageSpinner from "./FullPageSpinner";
import { useSelector } from "react-redux";

function transformDate(date) {
  const currentDate = new Date();

  const comparatorDate = new Date(date.split("T")[0]);

  return comparatorDate.getDate() === currentDate.getDate() &&
    comparatorDate.getMonth() === currentDate.getMonth()
    ? `Today`
    : `${date?.slice(0, 10).split("-").reverse().join("-")}`;
}

function FullPagePatient({ data }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const activePatient = useSelector((state) => state.dashboard.activePatient);

  const {
    isLoading,
    isError,
    data: startFrom,
  } = useQuery({
    queryKey: ["startFrom", activePatient],
    queryFn: () =>
      getFirstAppointentsForDoctor({
        doctor: user.doctor,
        patient: activePatient && activePatient,
      }),
  });

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 md:gap-8">
      <div className="col-span-4 flex items-center space-x-4">
        <img
          src="/User.png"
          alt="Patient_img"
          className="block h-[3.2rem] w-[3.2rem] rounded-full  bg-center object-cover"
        />

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-stone-700">
            {data?.name}
          </span>
          <span className="text-sm text-stone-400">
            {data?.contact.address}
          </span>
          <span className="text-sm text-stone-400 md:block hidden">
            {data?.contact.city}, {data?.contact.state}
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex w-[46%] md:w-[30%] flex-col">
          <span className="text-stone-600">DOB</span>
          <span className="text-md text-stone-400">{data?.dob || "NA"}</span>
        </div>

        <div className="flex w-[46%] md:w-[30%] flex-col">
          <span className="text-stone-600">Gender</span>
          <span className="text-md text-stone-400">
            {data?.gender
              ?.charAt(0)
              .toUpperCase()
              .concat(data.gender.slice(1)) || "NA"}
          </span>
        </div>

        <div className="flex w-[46%] md:w-[30%] flex-col">
          <span className="text-stone-600">Weight</span>
          <span className="text-md text-stone-400">
            {data?.weight + " kg" || "NA"}
          </span>
        </div>

        <div className="flex w-[46%] md:w-[30%] flex-col">
          <span className="text-stone-600">Height</span>
          <span className="text-md text-stone-400">
            {data?.height + " ft/in" || "NA"}
          </span>
        </div>

        <div className="flex w-[46%] md:w-[30%] flex-col">
          <span className="text-stone-600">Blood group</span>
          <span className="text-md text-stone-400">
            {data?.bloodGroup || "NA"}
          </span>
        </div>

        <div className="flex w-[46%] md:w-[30%] flex-col">
          <span className="text-stone-600">Started from</span>
          <span className="text-md text-stone-400">
            {(startFrom?.date && transformDate(startFrom?.date)) || "NA"}
          </span>
        </div>
      </div>

      <div className="flex space-x-4">
        {data?.problems?.length === 0 ? (
          <span className="px-2 rounded-sm py-1 text-sm bg-stone-100 text-stone-500">
            No problem specified
          </span>
        ) : (
          data?.problems?.map((problem) => (
            <span
              className="px-2 rounded-sm py-1 text-sm bg-stone-100 text-stone-500"
              key={problem}
            >
              {problem}
            </span>
          ))
        )}
      </div>

      <div className="flex md:space-x-4 md:flex-row flex-col gap-4 md:gap-0">
        <div className="bg-[#146EB4] px-4 py-3 items-center md:w-fit flex space-x-2 rounded-md cursor-pointer w-full">
          <img src="/phone.svg" alt="phone_icon" className="" />

          <span className="text-sm">{data?.contact.phone}</span>
        </div>

        <div className="border-[#146EB4] border-[1px] items-center px-4 py-3 md:w-fit w-full flex space-x-2 rounded-md cursor-pointer">
          <img
            src="/document.svg"
            alt="phone_icon"
            className="w-[1rem] h-[1rem]"
          />

          <span className="text-sm text-[#146EB4]">Documents</span>
        </div>
      </div>
    </div>
  );
}

export default FullPagePatient;
