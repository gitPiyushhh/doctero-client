import React, { useCallback, useEffect, useState } from "react";
import Header from "../ui/Header";
import DashboardCard from "../ui/DashboardCard";
import AppointmentCard from "../ui/AppointmentCard";
import PatientFullPage from "./FullPagePatient";
import {
  getAppointentsForDoctor,
  getAppointment,
  getTodayAppointentsForDoctor,
} from "../../services/apiAppointment";
import FullPageSpinner from "./FullPageSpinner";
import { useQuery } from "@tanstack/react-query";
import { getPatientsForDoctor } from "../../services/apiPatient";
import NoData from "./NoData";
import { useDispatch, useSelector } from "react-redux";
import { changeActivePatient } from "../../features/dashboard";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));
if (!user?.doctor) {
  redirect("/patient/dashboard");
}

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  /*
    Local state
  */
  const [activeAppointment, setActiveAppointment] = useState(null);

  /*
    Global state
  */
  const mobileSidebarOpen = useSelector(state => state.ui.mobileSidebarOpen);

  /*
    React query
  */
  const {
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
    data: appointments,
  } = useQuery({
    queryKey: ["appointment"],
    queryFn: () => getAppointentsForDoctor({ doctor: user.doctor }),
  });

  const {
    isLoading: isLoadingPatients,
    isError: isErrorPatients,
    data: patients,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: () => getPatientsForDoctor({ doctor: user.doctor }),
  });

  const { data: todayAppointments } = useQuery({
    queryKey: ["todayAppointments"],
    queryFn: () => getTodayAppointentsForDoctor({ doctor: user.doctor }),
  });

  const { data: focusAppointment, isLoading: loadingFullPagePatient } =
    useQuery({
      queryKey: ["focusAppointment", activeAppointment],
      queryFn: () => getAppointment(activeAppointment),
    });

  /*
    Event handlers
  */
  const handleActiveAppointmentChange = useCallback(() => {
    if (todayAppointments) setActiveAppointment(todayAppointments[0]?._id);
  }, [todayAppointments]);

  function handleCardClick(data) {
    setActiveAppointment(data);
    dispatch(changeActivePatient(data));
  }

  /*
    Effects
  */
  useEffect(() => {
    setActiveAppointment(todayAppointments?.[0]);
  }, [todayAppointments]);

  useEffect(
    function () {
      handleActiveAppointmentChange();
    },
    [appointments, handleActiveAppointmentChange]
  );

  useEffect(() => {
    setTimeout(() => {
      if (todayAppointments?.length === 0) {
        toast.custom(
          <p className="text-stone-700 bg-white shadow-md p-[0.8rem] rounded-md">
            🥱 Today you have no appointments
          </p>
        );
      }
    }, 0);
  }, [todayAppointments?.length]);

  useEffect(() => {
    setTimeout(() => {
      if (todayAppointments?.length) {
        toast.success(
          `You have ${todayAppointments?.length} appointments today`
        );
      }
    }, 0);
  }, [todayAppointments?.length]);

  /*
    Meta data
  */
  const cardsMetaData = [
    {
      icon: 3,
      name: "Patients",
      value: (patients && patients.length) || "__",
    },
    {
      icon: 4,
      name: "Income",
      value: "2,111",
    },
    {
      icon: 2,
      name: "Appointments",
      value: (appointments && appointments?.length) || "__",
    },
    {
      icon: 5,
      name: "Videos",
      value: "7",
    },
  ];

  /*
    Conditional rendering
  */
  // if(!user.doctor) {
  //   return <DashboardPatient />
  // }

  if (isLoadingAppointments || isLoadingPatients) {
    return (
      <div className={`absolute  top-0 z-10 h-[100dvh] ${mobileSidebarOpen ? 'left-[16%]' : 'left-0 md:left-[16%]'} ${mobileSidebarOpen ? 'w-[84%]' : 'w-full md:w-[84%]'}`}>
        <FullPageSpinner />
      </div>
    );
  }

  if (isErrorAppointments || isErrorPatients) {
    toast.error("Error loading the data..");
    return <Toaster position="top-right" />;
  }

  return (
    <>
    <Toaster position="top-right" />

    <div className={`absolute top-0 z-10 h-[100dvh]  overflow-y-scroll ${mobileSidebarOpen ? 'left-[16%]' : 'left-0 md:left-[16%]'} ${mobileSidebarOpen ? 'w-[84%]' : 'w-full md:w-[84%]'}`}>      
      <Header name="Dashboard" />

      {/* Cards */}
      <div className="my-8 w-[100%] flex flex-wrap items-center justify-between px-4 gap-1 md:gap-0 md:px-8 mt-16 md:mt-24">
        {cardsMetaData.map((card) => (
          <DashboardCard data={card} key={card.name} />
        ))}
      </div>

      {/* Today appointments */}
      <div className=" md:mt-12 flex gap-8 md:gap-0 md:flex-row flex-col w-full items-stretch justify-between md:pl-8 px-4">
        <div className=" flex w-full md:w-[40%] flex-col items-start justify-between gap-2">
          <span className="text-md text-stone-500">Today appointments</span>
          <div className="flex md:h-[24rem] w-full gap-2 md:gap-0 flex-col overflow-scroll rounded-md bg-white px-2 py-2 md:px-4 md:py-2 shadow-sm">
            {todayAppointments && todayAppointments.length > 0 ? (
              todayAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  isActive={appointment._id === activeAppointment}
                  data={appointment}
                  handleCardClick={handleCardClick}
                />
              ))
            ) : (
              <NoData />
            )}
          </div>
        </div>

        <div className=" flex w-full md:w-[64%] flex-col items-start justify-between gap-2 px-0 md:px-8 mb-10 md:mb-0">
          <span className="text-md text-stone-500">Patient details</span>
          <div className="flex h-fit md:h-[24rem] w-full flex-col rounded-md bg-white px-[0.8rem] md:px-[20px] py-[0.8rem] md:py-4 shadow-sm">
            {loadingFullPagePatient ? (
              <FullPageSpinner />
            ) : focusAppointment ? (
              <PatientFullPage data={focusAppointment?.patient} />
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
