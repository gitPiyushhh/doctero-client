import React, { useState } from "react";
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
      hasCta: true,
      ctaContent: 13,
      ctaContentType: "Orders",
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
    React query
  */
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center">
        <FullPageSpinner />
      </div>
    );

  if (error) {
    toast.error("Error loading the data..");
    return <Toaster position="top-right"/>
  }

  if(patients.length) {
    toast.success(`You got ${patients.length} results`)
  }

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Toaster position="top-right"/>
      <Header name="Patients" />
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
  );
}

export default Patients;
