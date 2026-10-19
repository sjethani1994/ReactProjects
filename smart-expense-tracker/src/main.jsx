import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import AddExpense from "./components/AddExpense.jsx";
import { ToastContainer } from "react-toastify";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "expenses/:mode",
        element: <AddExpense />,
      },
      {
        path: "expenses/:mode/:id",
        element: <AddExpense />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <RouterProvider router={routes} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  </StrictMode>,
);
