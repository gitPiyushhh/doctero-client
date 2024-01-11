import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './components/layout/Dashboard';
import Billings from './components/layout/Billings';
import Patients from './components/layout/Patients';
import Appointments from './components/layout/Appointments';
import Videos from './components/layout/Videos';
import Dashboard from './components/layout/Dashboard';
import Teleconsultancy from './components/layout/Teleconsultancy';
import Medstore from './components/layout/Medstore';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    children: [
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;