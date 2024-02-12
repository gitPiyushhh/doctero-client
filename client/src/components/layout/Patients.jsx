import React, { useEffect, useState } from "react";
import moment from "moment/moment";

import Header from "../ui/Header";
import Overview from "../ui/Overview";
import Transactions from "../ui/Transactions";
import { getPatientsForDoctor } from "../../services/apiPatient";
import FullPageSpinner from "./FullPageSpinner";
import { useDispatch, useSelector } from "react-redux";
import { changeSpan } from "../../features/patients";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

function getAllActivePatients(data) {
  const currentDate = moment();
  const activePatients = data?.filter((patient) => {
    const activeTillDate = moment(patient?.date, "MM-DD-YYYY, h:mm A");
    return (
      activeTillDate.isAfter(currentDate.subtract(15, "days")) ||
      currentDate.isSame(activeTillDate, "day") ||
      currentDate.isBefore(activeTillDate)
    );
  });

  return activePatients;
}

function getAllDormatPatients(data) {
  const currentDate = moment();
  const activePatients = data?.filter((patient) => {
    const activeTillDate = moment(patient?.date, "MM-DD-YYYY, h:mm A");
    return (
      currentDate.isAfter(activeTillDate) &&
      activeTillDate.isBefore(moment(currentDate).subtract(15, "days"))
    );
  });

  return activePatients;
}

function Patients() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [refetchKey, setRefetchKey] = useState(0);

  /*
    Global UI state
  */
  const dispatch = useDispatch();
  const span = useSelector((state) => state.patient.span);
  const mobileSidebarOpen = useSelector((state) => state.ui.mobileSidebarOpen);

  /*
    React query component
  */
  const {
    isLoading,
    data: patients,
    isError: error,
  } = useQuery({
    queryKey: ["patient", refetchKey],
    queryFn: () => getPatientsForDoctor({ doctor: user.doctor, span }),
  });

  /*
    Meta data
  */
  const tableHeadMetaData = [
    {
      name: "Patient ID",
    },
    {
      name: "Name",
    },
    {
      name: "Gender",
    },
    {
      name: "Problem",
    },
    {
      name: "Active till",
    },
    {
      name: "Contact",
      rightAlign: true,
    },
  ];

  const cardMetaData = [
    {
      heading: "Total Patients",
      value: patients?.length || 0,
      isHighlighted: true,
      highlightContentKey: "Patient retainment percentage:",
      highlightContentValue: `${
        patients &&
        Math.ceil(
          (getAllActivePatients(patients).length / patients.length) * 100
        )
      }%`,
    },
    {
      heading: "Active patients",
      value:
        (patients && patients.length - getAllDormatPatients(patients).length) ||
        0,
      hasCta: false,
    },
    {
      heading: "Dormat patients",
      value: (patients && getAllDormatPatients(patients).length) || 0,
      ctaContentType: false,
      isHighlighted: false,
    },
  ];

  const spanOptions = [
    {
      name: "Year",
      handler: () => {
        dispatch(changeSpan("Year"));
        setRefetchKey((prevKey) => prevKey + 1);
      },
    },
    {
      name: "Month",
      handler: () => {
        dispatch(changeSpan("Month"));
        setRefetchKey((prevKey) => prevKey + 1);
      },
    },
    {
      name: "Week",
      handler: () => {
        dispatch(changeSpan("Week"));
        setRefetchKey((prevKey) => prevKey + 1);
      },
    },
    {
      name: "Today",
      handler: () => {
        dispatch(changeSpan("Today"));
        setRefetchKey((prevKey) => prevKey + 1);
      },
    },
  ];

  /*
    Toasts 
  */
  useEffect(() => {
    if (patients?.length) {
      setTimeout(() => {
        toast.success(`You got ${patients.length} results`);
      }, 0);
    }
  }, [patients]);

  if (isLoading)
    return (
      <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%]">
        <FullPageSpinner />
      </div>
    );

  if (error) {
    toast.error("Error loading the data..");
    return <Toaster position="top-right" />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div
        className={`absolute md:left-[16%] ${mobileSidebarOpen ? "left-[16%] md:w-[84%] md:left-[16%]" : "left-0 w-full"} top-0 z-10 h-[100dvh] md:w-[84%] overflow-y-scroll`}
      >
        <Header name="Patients" />
        <div className="mt-14">
          <Overview
            cardMetaData={cardMetaData}
            spanOptions={spanOptions}
            name={span}
          />
          <Transactions
            isFor="Patient"
            isFilterable={false}
            tableHeadMetadata={tableHeadMetaData}
            data={patients}
            key={Date.now()}
          />
        </div>
      </div>
    </>
  );
}

export default Patients;
