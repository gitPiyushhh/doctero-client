import React from "react";

import toast, { Toaster } from "react-hot-toast";
import Header from "../ui/Header";
import Table from "../layout/Table";
import PatientDashboardHeader from "../ui/PatientDashboardHeader";
import CategoryCard from "../ui/CategoryCard";
import PatientFeedbackCard from "../ui/PatientFeedbackCard";
import Booking from "../ui/Booking";

function DashboardPatient() {
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

  const data = [
    {
      _id: "#65643",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
    {
      _id: "#65644",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
    {
      _id: "#65645",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
    {
      _id: "#65646",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
    {
      _id: "#65647",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
    {
      _id: "#65648",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
    {
      _id: "#65649",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
    {
      _id: "#65640",
      name: "Dipak Gupta",
      experience: "10 years",
      fees: "Rs. 500",
    },
  ];

  return (
    <div className="absolute left-[16%] top-0 z-10 h-[100dvh] w-[84%] overflow-y-scroll">
      <Toaster position="top-right" />

      <Header name="Dashboard" />

      <div className="flex space-x-4 items-stretch h-fit p-8">
        <div className="w-[64%] h-full">
          <PatientDashboardHeader />

          <div className="flex flex-col mt-8 gap-2">
            <span className="text-stone-700 text-md font-semibold">
              Choose the category
            </span>
            <div className="flex w-full justify-between gap-4 items-center flex-wrap">
              {cardsMetaData.map((card) => (
                <CategoryCard data={card} />
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
                data={data}
                isFilterable={false}
                isDownloadable={false}
                sortOptions={false}
                key={Date.now()}
              />
            </div>
          </div>
        </div>

        <div className=" flex flex-col w-[36%] min-h-[100vh] h-full border-[1px] p-4 gap-12 rounded-lg">
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
                    Jonas Smedthman
                  </span>
                  <span className="text-stone-500 text-sm font-light">
                    5+ years of experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-700 text-md font-semibold">
                Feedbacks(19)
              </span>

              <span className="text-sm font-semibold cursor-pointer text-blue-500 underline underline-offset-2 pr-4">
                See all
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4 items-center">
              <PatientFeedbackCard />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-700 text-md font-semibold">
                Booking
              </span>
            </div>
            <div className="flex flex-col justify-between gap-4 items-center w-[100%]">
              <Booking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPatient;
