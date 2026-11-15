import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AddEmployee from "./components/AddEmployee.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // "/" → "/employees" (like Angular's { path: '', redirectTo: 'employees', pathMatch: 'full' })
      { index: true, element: <Navigate to="employees" replace /> },
      {
        path: "employees",
        children: [
          { index: true, element: <EmployeeTable /> }, // /employees
          { path: "add", element: <AddEmployee mode="add" /> }, // /employees/add
          { path: "view/:id", element: <AddEmployee mode="view" /> }, // /employees/view/5
          { path: "edit/:id", element: <AddEmployee mode="edit" /> }, // /employees/edit/5
        ],
      },
      // Anything else → 404 (like Angular's { path: '**', component: NotFound })
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
