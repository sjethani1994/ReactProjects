import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Employees from "./components/Employees.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";

const routes = createBrowserRouter([
  {
    path: "/employees",
    element: <App />,
    children: [
      {
        index: true,
        element: <Employees />,
      },
      {
        path: "add",
        element: <EmployeeForm />,
      },
      {
        path: ":mode/:id",
        element: <EmployeeForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
);
