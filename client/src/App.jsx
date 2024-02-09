import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Billings from "./components/layout/Billings";
import Patients from "./components/layout/Patients";
import Appointments from "./components/layout/Appointments";
import Videos from "./components/layout/Videos";
import Dashboard from "./components/layout/Dashboard";
import Teleconsultancy from "./components/layout/Teleconsultancy";
import Medstore from "./components/layout/Medstore";
import Category from "./components/ui/Category";
import PatientDetailsForm, {
  action as createPatientAction,
} from "./components/ui/PatientDetailsForm";
import DoctorDetailsForm, {
  action as createDoctorAction,
} from "./components/ui/DoctorDetailsForm";
import JustThere from "./components/ui/JustThere";
import Doctors from "./components/layout/Doctors";
import { Provider } from "react-redux";
import store from "./store";
import DashboardPatient, {
  action as createBookingAction,
} from "./components/layout/DashboardPatient";
import MeetDoctor from "./components/ui/MeetDoctor";
import TeleconsultancyPatient from "./components/layout/TeleconsultancyPatient";
import MedHelp from "./components/layout/MedHelp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/form-patient",
        element: <PatientDetailsForm />,
        action: createPatientAction,
      },
      {
        path: "/form-doctor",
        element: <DoctorDetailsForm />,
        action: createDoctorAction,
      },
      {
        path: "/just-there",
        element: <JustThere />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/patient/dashboard",
        element: <DashboardPatient />,
        action: createBookingAction,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/billings",
        element: <Billings />,
      },
      {
        path: "/videos",
        element: <Videos />,
      },
      {
        path: "/tele-consultancy",
        element: <Teleconsultancy />,
      },
      
      {
        path: "/tele-consultancy/doctor/meet",
        element: <MeetDoctor />,
      },
      {
        path: "/patient/tele-consultancy",
        element: <TeleconsultancyPatient />,
      },
      {
        path: "/ai-med-help",
        element: <MedHelp />,
      },
      {
        path: "/medstore",
        element: <Medstore />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <AppLayout />
      </RouterProvider>
    </Provider>
  );
}

export default App;
