import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import Header from "../ui/Header";
import Table from "../layout/Table";
import PatientDashboardHeader from "../ui/PatientDashboardHeader";
import CategoryCard from "../ui/CategoryCard";
import PatientFeedbackCard from "../ui/PatientFeedbackCard";
import Booking from "../ui/Booking";
import { getAllDoctors, getDoctor } from "../../services/apiDoctor";
import { useMutation, useQuery } from "@tanstack/react-query";
import FullPageSpinner from "./FullPageSpinner";
import { redirect } from "react-router-dom";
import { createAppointment } from "../../services/apiAppointment";
import { useSelector } from "react-redux";
import { createFakeLoading } from "../../features/appointment";

import store from "../../store";

function DashboardPatient() {
  /*
    Local state
  */
  const [doctor, setDoctor] = useState(null);
  const [selected, setSelected] = useState(null);

  /*
    Global state
  */
  const status = useSelector((state) => state.appointment.status);

  /*
    Event handlers
  */
  function handleDoctorClick(doctor) {
    setDoctor(doctor);
  }

  function handleDoctorClose() {
    setDoctor(null);
  }

  function handleTimeTaken(timeSlot) {
    setSelected(timeSlot);
  }

  function handleCreateAppointment(data) {
    mutate(data);
  }

  /*
    Meta data
  */
  const cardsMetaData = [
    {
      name: "Physical Theropy",
      icon: "theropy-icon",
      isActive: true,
    },
    {
      name: "Heart problems",
      icon: "heart-icon",
    },
    {
      name: "Gastro entrology",
      icon: "gastro-icon",
    },
    {
      name: "Ear problems",
      icon: "ear-icon",
    },
  ];

  const tableHeadMetaData = [
    {
      name: "ID",
    },
    {
      name: "Name",
    },
    {
      name: "Experience",
    },
    {
      name: "Fees",
      rightAlign: true,
    },
  ];

  /*
    React query(Data fetching)
  */
  const {
    isLoading,
    isError,
    data: doctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getAllDoctors("Physical theropy"),
  });

  const {
    isLoading: isLoadingDoctor,
    data: doctorRemote,
    isError: isErrorDoctor,
  } = useQuery({
    queryKey: ["doctor", doctor],
    queryFn: () => getDoctor(doctor.doctorId),
  });

  /*
    React query(Data mutation)
  */
  const { mutate, isLoading: isLoadingAppointmentCreation } = useMutation({
    mutationFn: action,
    onSuccess: () => {
      toast.success("Created new appointment");
    },
    onError: (err) => toast.error(err.message),
  });

  /*
    Toasts
  */
  useEffect(() => {
    if (doctors?.length) {
      setTimeout(() => {
        toast.success(
          `We have ${doctors?.length} doctors for Physical theropy`
        );
      }, 0);
    }
  }, [doctors]);

  /*
    Conditional rendering
  */
  if (isLoading) {
    return (
      <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%]">
        <FullPageSpinner />
      </div>
    );
  }

  if (isLoadingAppointmentCreation) {
    return toast.error("Loading the appointment creation");
  }

  if (status === "loading") {
    return (
      <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%]">
        <FullPageSpinner />
      </div>
    );
  }

  /*
    JSX
  */
  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Toaster position="top-right" />

      <Header name="Dashboard" />

      {/* Left */}
      <div className="flex space-x-4 items-stretch h-fit p-8 mt-16">
        <div
          className={`${doctor ? "w-[64%]" : "w-full"} h-full transition ease-in-out delay-150`}
        >
          <PatientDashboardHeader />

          <div className="flex flex-col mt-8 gap-2">
            <span className="text-stone-700 text-md font-semibold">
              Choose the category
            </span>
            <div
              className={`flex w-full ${doctor ? "justify-between" : "justify-start"} gap-4 items-center flex-wrap`}
            >
              {cardsMetaData.map((card) => (
                <CategoryCard data={card} key={card.name} />
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-8 gap-2">
            <span className="text-stone-700 text-md font-semibold">
              Doctors for %CATEGORY NAME%
            </span>

            <div className="flex flex-col w-full justify-between gap-4 items-start flex-wrap p-2 text-stone-700">
              <Table
                isFor="Doctor's"
                tableHeadMetaData={tableHeadMetaData}
                data={doctors}
                handleRowClick={handleDoctorClick}
                isFilterable={false}
                isDownloadable={false}
                sortOptions={false}
                key={Date.now()}
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div
          className={`${doctor ? "flex flex-col" : "hidden"} w-[36%] min-h-[100vh] h-full border-[1px] p-4 gap-12 rounded-lg transition ease-in-out delay-150 relative`}
        >
          <p
            className="px-3 py-[0.2rem] rounded-full border-[1px] bg-stone-100 text-red-500 text-lg font-bold w-fit absolute top-2 right-2 cursor-pointer hover:scale-105 transition-all hover:text-xl"
            onClick={handleDoctorClose}
          >
            x
          </p>

          <div className="flex flex-col gap-4">
            <span className="text-stone-700 text-md font-semibold">
              Doctor details
            </span>
            <div className="flex flex-col justify-between gap-4 items-center">
              <div className="flex justify-start w-full space-x-4">
                <img
                  src="/Owner.png"
                  alt="User_image"
                  className="w-[4rem] h-[4rem] rounded-full "
                />

                <div className="flex flex-col justify-center items-start">
                  <span className="text-stone-700 font-semibold text-lg">
                    {doctorRemote?.name}
                  </span>
                  <span className="text-stone-500 text-sm font-light">
                    {doctorRemote?.experience}+ years of experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-700 text-md font-semibold">
                Feedbacks({doctorRemote?.feedbacks.length})
              </span>

              <span className="text-sm font-semibold cursor-pointer text-blue-500 underline underline-offset-2 pr-4">
                See all
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4 items-center">
              {doctorRemote?.feedbacks.length ? (
                <PatientFeedbackCard data={doctorRemote?.feedbacks[0]} />
              ) : (
                <div className="text-stone-700 flex flex-col justify-center items-center gap-4 p-4 bg-stone-100 rounded-md w-full py-8">
                  <span>No feedback to show 😕</span>
                  <button
                    className="text-sm outline-none font-semibold bg-[#7C51C2] text-stone-50 px-2 py-1 shadow-md active:shadow-sm active:outline-none active:border-none focus:outline-none"
                    type="button"
                  >
                    Give feedback
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-700 text-md font-semibold">
                Booking
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4 items-center w-[100%]">
              <Booking
                data={doctorRemote}
                selected={selected}
                handleTimeTaken={handleTimeTaken}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  store.dispatch(createFakeLoading("loading"));

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (!data?.startTime) {
    toast.error("Please choose a time slot");
    store.dispatch(createFakeLoading("idle"));
    return redirect("/patient/dashboard");
  }

  if (data?.type === "Not selected") {
    toast.error("Please choose an appointment type");
    store.dispatch(createFakeLoading("idle"));
    return redirect("/patient/dashboard");
  }

  const newAppointment = await createAppointment(data);

  if (!newAppointment) {
    store.dispatch(createFakeLoading("idle"));
    return redirect("/patient/dashboard");
  }

  store.dispatch(createFakeLoading("idle"));
  return redirect("/appointments");
}

export default DashboardPatient;
