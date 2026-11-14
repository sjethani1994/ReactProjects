import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddEmployee from "./components/AddEmployee.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "employees",
        element: <EmployeeTable />,
      },
      {
        path: "add-employee",
        element: <AddEmployee />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
