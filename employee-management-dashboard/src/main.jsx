import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="employees" replace /> },
      {
        path: "employees",
        children: [
          { index: true, element: <EmployeeTable /> },
          { path: "add", element: <EmployeeForm mode="add" /> },
          { path: "view/:id", element: <EmployeeForm mode="view" /> },
          { path: "edit/:id", element: <EmployeeForm mode="edit" /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
