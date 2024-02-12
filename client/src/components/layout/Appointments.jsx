import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../ui/Header";
import Overview from "../ui/Overview";
import Transactions from "../ui/Transactions";
import {
  getAllAppointments,
  getAllRemoteAppointments,
  getSortedOldestPhysicalAppointments,
  getSortedOldestRemoteAppointments,
  getSortedRecentPhysicalAppointments,
  getSortedRecentRemoteAppointments,
  getSpanPhysicalAppointments,
  getSpanRemoteAppointments,
  getTodayAppointments,
  updateSortAppointments,
  updateSpanAppointments,
} from "../../features/appointment";
import moment from "moment/moment";
import FullPageSpinner from "./FullPageSpinner";
import toast, { Toaster } from "react-hot-toast";

const tableHeadMetaData = [
  {
    name: "Appointment ID",
  },
  {
    name: "Name",
  },
  {
    name: "Problem",
  },
  {
    name: "Date",
  },
  {
    name: "Type",
    rightAlign: true,
  },
];

function transformDate(date, time) {
  const currentDate = new Date();

  const comparatorDate = new Date(date.split("T")[0]);

  return comparatorDate.getDate() === currentDate.getDate() &&
    comparatorDate.getMonth() === currentDate.getMonth()
    ? `Today, ${time > 12 ? `${time % 12} PM` : `${time} AM`}`
    : `${date?.slice(0, 10).split("-").reverse().join("-")}, ${
        time > 12 ? `${time % 12} PM` : `${time} AM`
      }`;
}

function getMonthName(month) {
  switch (month) {
    case "01":
      return ", Jan";
    case "02":
      return ", Feb";
    case "03":
      return ", March";
    case "04":
      return ", April";
    case "05":
      return ", May";
    case "06":
      return ", June";
    case "07":
      return ", July";
    case "08":
      return ", Aug";
    case "09":
      return ", Sep";
    case "10":
      return ", Oct";
    case "11":
      return ", Nov";
    case "12":
      return ", Dec";
    default:
      return "";
  }
}

function Appointments() {
  // Active
  const [tabLocal, setTabLocal] = useState("physical");

  // We want to re-render this everytime the user changes even
  const user = JSON.parse(localStorage.getItem("user"));

  /*
    Global state
  */
  const mobileSidebarOpen = useSelector((state) => state.ui.mobileSidebarOpen);

  const dispatch = useDispatch();
  const tableDataPhysical = useSelector(
    (state) => state.appointment.tableDataPhysical
  );
  const tableDataRemote = useSelector(
    (state) => state.appointment.tableDataRemote
  );
  const span = useSelector((state) => state.appointment.span);
  const sort = useSelector((state) => state.appointment.sort);
  const todayAppointments = useSelector(
    (state) => state.appointment.todayAppointments
  );

  const { appointments } = useSelector((state) => state.appointment.data);
  const { appointments: remoteAppointments } = useSelector(
    (state) => state.appointment.remote
  );
  const status = useSelector((state) => state.appointment.status);

  /*
    Effects 
  */
  useEffect(() => {
    tableDataPhysical?.length && toast.success(`You have got ${tableDataPhysical.length} appointments`);
  }, [tableDataPhysical.length])

  const handleFetch = useCallback(() => {
    if (user.doctor) {
      dispatch(getAllAppointments({ doctor: user.doctor }));
      dispatch(getAllRemoteAppointments({ doctor: user.doctor }));
      dispatch(getTodayAppointments({ doctor: user.doctor }));
    } else {
      dispatch(getAllAppointments({ patient: user.patient }));
      dispatch(getAllRemoteAppointments({ patient: user.patient }));
      dispatch(getTodayAppointments({ patient: user.patient }));
    }
  }, [dispatch, user.doctor, user.patient]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  // Getting the upcoming appointment
  const currentDate = moment();

  const appointmentsWithTimeDiff = appointments.map((appointment, index) => {
    const startTime = parseInt(appointment.startTime, 10); // Parse start time as integer
    let appointmentDate = moment(
      `${appointment.date.split("T")[0]}T${startTime}:00:00.000Z`
    ).utc();
    const timeDiff = appointmentDate.diff(currentDate);
    return { ...appointment, timeDiff };
  });

  const nearestAppointment = appointmentsWithTimeDiff.reduce(
    (nearest, appointment) => {
      const isAfterCurrentDate = appointment.timeDiff > 0;
      const isNearestNull = nearest === null;

      if (
        isAfterCurrentDate &&
        (isNearestNull ||
          appointment.timeDiff < nearest.timeDiff ||
          (appointment.timeDiff === nearest.timeDiff &&
            moment(appointment.date).isBefore(moment(nearest.date))))
      ) {
        return appointment;
      }
      return nearest;
    },
    null
  );

  const lastAppointment = appointmentsWithTimeDiff.reduce(
    (nearest, appointment) => {
      if (
        appointment.timeDiff > 0 &&
        (nearest === null || appointment?.timeDiff > nearest?.timeDiff)
      ) {
        return appointment;
      }
      return nearest;
    },
    null
  );

  /*
    Meta data
  */
  const cardMetaData = [
    {
      heading: "Total Appointments",
      value: appointments.length + remoteAppointments.length,
      isHighlighted: true,
      highlightContentKey: "Today remaining:",
      highlightContentValue: `${todayAppointments} appointments`,
    },
    {
      heading: "Online appointments",
      value: remoteAppointments.length,
      isHighlighted: false,
    },
    {
      heading: "Appointmentes till",
      value: nearestAppointment
        ? `${transformDate(lastAppointment.date)
            .split(" ")[0]
            .split("-")
            .slice(0, 1)}${getMonthName(
            transformDate(lastAppointment.date)
              .split(" ")[0]
              .split("-")
              .slice(1, 2)[0]
          )}`
        : "__",
      ctaContentType: false,
      isHighlighted: false,
    },
  ];

  const sortOptions = [
    {
      name: "Recent first",
      handler: handleSortRecent,
    },
    {
      name: "Oldest first",
      handler: handleSortOldest,
    },
  ];

  const spanOptions = [
    {
      name: "Month",
      handler: handleSpanMonth,
    },
    {
      name: "Week",
      handler: handleSpanWeek,
    },
    {
      name: "Tomorrow",
      handler: handleSpanTomorrow,
    },
    {
      name: "Today",
      handler: handleSpanDay,
    },
  ];

  /*
    Event handlers
  */
  function handleSortRecent() {
    if (user.doctor) {
      dispatch(
        getSortedOldestPhysicalAppointments({ doctor: user.doctor, span })
      );
      dispatch(
        getSortedOldestRemoteAppointments({ doctor: user.doctor, span })
      );
      dispatch(updateSortAppointments("Recent first"));
    } else {
      dispatch(
        getSortedOldestPhysicalAppointments({ patient: user.patient, span })
      );
      dispatch(
        getSortedOldestRemoteAppointments({ patient: user.patient, span })
      );
      dispatch(updateSortAppointments("Recent first"));
    }
  }

  function handleSortOldest() {
    if (user.doctor) {
      dispatch(updateSortAppointments("Oldest first"));
      dispatch(
        getSortedRecentPhysicalAppointments({ doctor: user.doctor, span })
      );
      dispatch(
        getSortedRecentRemoteAppointments({ doctor: user.doctor, span })
      );
    } else {
      dispatch(updateSortAppointments("Oldest first"));
      dispatch(
        getSortedRecentPhysicalAppointments({ patient: user.patient, span })
      );
      dispatch(
        getSortedRecentRemoteAppointments({ patient: user.patient, span })
      );
    }
  }

  function handleSpanMonth() {
    if (user.doctor) {
      dispatch(updateSpanAppointments("Month"));
      dispatch(
        getSpanPhysicalAppointments({ doctor: user.doctor, span: "Month" })
      );
      dispatch(
        getSpanRemoteAppointments({ doctor: user.doctor, span: "Month" })
      );
    } else {
      dispatch(updateSpanAppointments("Month"));
      dispatch(
        getSpanPhysicalAppointments({ patient: user.patient, span: "Month" })
      );
      dispatch(
        getSpanRemoteAppointments({ patient: user.patient, span: "Month" })
      );
    }
  }

  function handleSpanWeek() {
    if (user.doctor) {
      dispatch(updateSpanAppointments("Week"));
      dispatch(
        getSpanPhysicalAppointments({ doctor: user.doctor, span: "Week" })
      );
      dispatch(
        getSpanRemoteAppointments({ doctor: user.doctor, span: "Week" })
      );
    } else {
      dispatch(updateSpanAppointments("Week"));
      dispatch(
        getSpanPhysicalAppointments({ patient: user.patient, span: "Week" })
      );
      dispatch(
        getSpanRemoteAppointments({ patient: user.patient, span: "Week" })
      );
    }
  }

  function handleSpanTomorrow() {
    if (user.doctor) {
      dispatch(updateSpanAppointments("Tomorrow"));
      dispatch(
        getSpanPhysicalAppointments({ doctor: user.doctor, span: "Tomorrow" })
      );
      dispatch(
        getSpanRemoteAppointments({ doctor: user.doctor, span: "Tomorrow" })
      );
    } else {
      dispatch(updateSpanAppointments("Tomorrow"));
      dispatch(
        getSpanPhysicalAppointments({ patient: user.patient, span: "Tomorrow" })
      );
      dispatch(
        getSpanRemoteAppointments({ patient: user.patient, span: "Tomorrow" })
      );
    }
  }

  function handleSpanDay() {
    if (user.doctor) {
      dispatch(updateSpanAppointments("Today"));
      dispatch(
        getSpanPhysicalAppointments({ doctor: user.doctor, span: "Today" })
      );
      dispatch(
        getSpanRemoteAppointments({ doctor: user.doctor, span: "Today" })
      );
    } else {
      dispatch(updateSpanAppointments("Today"));
      dispatch(
        getSpanPhysicalAppointments({ patient: user.patient, span: "Today" })
      );
      dispatch(
        getSpanRemoteAppointments({ patient: user.patient, span: "Today" })
      );
    }
  }

  return (
    <>
      <Toaster position="top-right" />

      <div
        className={`absolute ${mobileSidebarOpen ? "left-[16%]" : "left-[0%] md:left-[16%]"} ${mobileSidebarOpen ? "w-[84%]" : "w-[100%] md:w-[84%]"}  top-0 z-10 h-[100dvh] overflow-y-auto`}
      >
        {status === "loading" ? (
          <FullPageSpinner />
        ) : (
          <div className="mt-14 w-full">
            <Header name="Appointments" />
            <Overview
              cardMetaData={cardMetaData}
              data={appointments}
              spanOptions={spanOptions}
              name={span}
            />

            <div className="mt-4 w-full px-4 md:px-8 text-stone-800">
              <span className="text-[18px] font-bold">
                Appointments | {span}
              </span>

              <div className="mb-2 mt-4 flex space-x-4">
                <div
                  className={`cursor-pointer rounded-full bg-stone-200 px-4 py-2 text-sm font-semibold ${
                    tabLocal === "physical" &&
                    `${
                      user.doctor ? "!bg-[#146EB4]" : "!bg-[#7C51C2]"
                    } text-stone-50`
                  }`}
                  onClick={() => {
                    setTabLocal("physical");
                    toast.success(
                      `You have got ${tableDataPhysical?.length} appointments`
                    );
                  }}
                >
                  Physical{" "}
                  {!mobileSidebarOpen && `(${tableDataPhysical.length})`}
                </div>

                <div
                  className={`cursor-pointer rounded-full bg-stone-200 px-4 py-2 text-sm font-semibold ${
                    tabLocal === "online" &&
                    `${
                      user.doctor ? "!bg-[#146EB4]" : "!bg-[#7C51C2]"
                    } text-stone-50`
                  }`}
                  onClick={() => {
                    setTabLocal("online");
                    toast.success(
                      `You have got ${tableDataRemote?.length} appointments`
                    );
                  }}
                >
                  Tele-consultancy{" "}
                  {!mobileSidebarOpen && `(${tableDataRemote.length})`}
                </div>
              </div>
            </div>

            <div className="item-center flex w-full justify-center">
              {status === "loading" ? (
                <FullPageSpinner />
              ) : tabLocal === "physical" ? (
                <Transactions
                  isFor="Appointments"
                  tableHeadMetadata={tableHeadMetaData}
                  data={tableDataPhysical}
                  keyName="appointmentId"
                  isFilterable={true}
                  isDownloadable={true}
                  sortOptions={sortOptions}
                  // name="Sort &#x25B2;&#x25BC;"
                  name={sort}
                />
              ) : (
                <Transactions
                  isFor="Appointments"
                  tableHeadMetadata={tableHeadMetaData}
                  data={tableDataRemote}
                  keyName="appointmentId"
                  isFilterable={true}
                  isDownloadable={true}
                  sortOptions={sortOptions}
                  // name="Sort &#x25B2;&#x25BC;"
                  name={sort}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Appointments;
