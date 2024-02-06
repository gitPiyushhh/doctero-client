import React, { useState } from "react";
import { Form } from "react-router-dom";
import TimeAvailability from "./TimeAvailability";
import { useQuery } from "@tanstack/react-query";
import {
  getCustomDayAppointmentsForDoctor,
  getTodayAppointentsForDoctor,
} from "../../services/apiAppointment";
import FullPageSpinner from "../layout/FullPageSpinner";

const inputStyles =
  "bg-stone-50 border-[1px] w-[100%] border-stone-200 rounded-md p-3 flex-1 placeholder:text-stone-400 placholder:font-light text-stone-700 text-sm focus:outline-none";

/*
  Variables extraction
*/
function transformBookingDetails(selected) {
  const [day, startTime] = selected?.split(",");
  let targetDate;
  if (day.toLowerCase() === "today") {
    targetDate = new Date();
  } else if (day.toLowerCase() === "tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    targetDate = tomorrow;
  } else {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    targetDate = dayAfterTomorrow;
  }
  const formattedDate = targetDate.toISOString();
  const startHour = parseInt(startTime);

  return [formattedDate, startHour];
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Booking({ data, selected, handleTimeTaken, onSubmit }) {
  /*
    Logged in user
  */
  const user = JSON.parse(localStorage.getItem("user"));

  /*
    Local state
  */
  const [type, setType] = useState("Not selected");

  const today = new Date();
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  let formattedDate = null;
  let startHour = null;

  if (selected) {
    formattedDate = transformBookingDetails(selected)[0];
    startHour = transformBookingDetails(selected)[1];
  }

  /*
    Event handlers
  */
  function handleTypeChange(e) {
    setType(e);
  }

  /*
    React query
  */
  const {
    isLoading,
    data: todayAppointments,
    isError,
  } = useQuery({
    queryKey: ["todayAppointments", data],
    queryFn: () => getTodayAppointentsForDoctor({ doctor: data._id }),
  });

  const { data: tomorrowAppointments } = useQuery({
    queryKey: ["tomorrowAppointments", data],
    queryFn: () =>
      getCustomDayAppointmentsForDoctor({ doctor: data._id, day: "Tomorrow" }),
  });

  const { data: dayAfterTomorrowAppointments } = useQuery({
    queryKey: ["dayAfterTomorrowAppointments", data],
    queryFn: () =>
      getCustomDayAppointmentsForDoctor({
        doctor: data._id,
        day: dayAfterTomorrow,
      }),
  });

  /*
    Meta data
  */
  const typeMetaData = [
    {
      name: "Home visit",
    },
    {
      name: "Remote",
    },
  ];

  /*
    Conditional rendering
  */
  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <Form method="POST" className="h-fit w-full flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your name"
        name="name"
        required
        className={`${inputStyles} !bg-white`}
      />

      <textarea
        type="text"
        placeholder="Your problem"
        name="problem"
        required
        rows={6}
        className={`${inputStyles} !bg-white`}
      />

      <div className="flex space-x-2 justify-between items-center">
        <select
          className="text-stone-700 flex flex-col bg-stone-50 py-4"
          value="Select mode"
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option>Select mode</option>
          {typeMetaData.map((typeOption) => (
            <option
              key={type.name}
              className="text-stone-700"
              value={type.name}
            >
              {typeOption.name}
            </option>
          ))}
        </select>

        <span className="text-stone-500 text-sm">{type}</span>
      </div>

      <input type="text" hidden name="date" value={formattedDate} />

      <input type="text" hidden name="startTime" value={startHour} />

      <input type="text" hidden name="therapist" value={data?._id} />

      <input type="text" hidden name="patient" value={user?.patient} />

      <input type="text" hidden name="type" value={type} />

      <input type="text" hidden name="amount" value={data?.fees} />

      <input type="text" hidden name="doctorPhone" value={data?.phone} />

      <input type="text" hidden name="doctorName" value={data?.name} />

      <div className="flex flex-col gap-4">
        <TimeAvailability
          name="Today"
          data={data}
          schedule={todayAppointments}
          selected={selected}
          handleTimeTaken={handleTimeTaken}
        />
        <TimeAvailability
          name="Tomorrow"
          data={data}
          schedule={tomorrowAppointments}
          selected={selected}
          handleTimeTaken={handleTimeTaken}
        />
        <TimeAvailability
          name={`${dayAfterTomorrow.getDate()}-${monthNames[dayAfterTomorrow.getMonth()]}`}
          data={data}
          selected={selected}
          handleTimeTaken={handleTimeTaken}
          schedule={dayAfterTomorrowAppointments}
        />
      </div>

      <button
        type="submit"
        className="focus:outline-none bg-[#7C51C2] mt-4 shadow-lg active:shadow-sm active:outline-none"
      >
        Make an appointment
      </button>
    </Form>
  );
}

export default Booking;
