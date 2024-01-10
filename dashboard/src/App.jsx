import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Home from './components/ui/Home';
import Billings from './components/layout/Billings';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: '/',
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/billings',
        element: <Billings />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;