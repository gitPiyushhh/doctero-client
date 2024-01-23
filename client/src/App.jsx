import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Billings from './components/layout/Billings';
import Patients from './components/layout/Patients';
import Appointments from './components/layout/Appointments';
import Videos from './components/layout/Videos';
import Dashboard from './components/layout/Dashboard';
import Teleconsultancy from './components/layout/Teleconsultancy';
import Medstore from './components/layout/Medstore';
import Category from './components/ui/Category';
import PatientDetailsForm, {
  action as createPatientAction,
} from './components/ui/PatientDetailsForm';
import DoctorDetailsForm, {
  action as createDoctorAction,
} from './components/ui/DoctorDetailsForm';
import JustThere from './components/ui/JustThere';
import Doctors from './components/layout/Doctors';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/category',
        element: <Category />,
      },
      {
        path: '/form-patient',
        element: <PatientDetailsForm />,
        action: createPatientAction,
      },
      {
        path: '/form-doctor',
        element: <DoctorDetailsForm />,
        action: createDoctorAction,
      },
      {
        path: '/just-there',
        element: <JustThere />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/appointments',
        element: <Appointments />,
      },
      {
        path: '/patients',
        element: <Patients />,
      },
      {
        path: '/doctors',
        element: <Doctors />,
      },
      {
        path: '/billings',
        element: <Billings />,
      },
      {
        path: '/videos',
        element: <Videos />,
      },
      {
        path: '/tele-consultancy',
        element: <Teleconsultancy />,
      },
      {
        path: '/medstore',
        element: <Medstore />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 60 * 1000,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <AppLayout />
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
