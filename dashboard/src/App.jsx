import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./kiddyComponents/AppLayout";
import Error from "./kiddyComponents/Error";
import Home from "./kiddyComponents/Home";
import Authentication from "./kiddyComponents/Authentication";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Authentication />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
