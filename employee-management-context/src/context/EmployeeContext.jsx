import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const EmployeeContext = createContext(null);

export const useEmployee = () => {
  const ctx = useContext(EmployeeContext);

  if (!ctx) {
    throw new Error("useEmployee must be used inside EmployeeContextProvider");
  }

  return ctx;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/employees");

        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const fetchEmployeeById = async (id) => {
    const response = await axios.get(`http://localhost:3001/employees/${id}`);

    return response.data;
  };

  // Add employee
  const addEmployee = async (employee) => {
    const response = await axios.post(
      "http://localhost:3001/employees",
      employee,
    );

    setEmployees((prev) => [...prev, response.data]);

    return response.data;
  };

  // Update employee
  const updateEmployee = async (id, employee) => {
    const response = await axios.put(
      `http://localhost:3001/employees/${id}`,
      employee,
    );

    setEmployees((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? response.data : item,
      ),
    );

    return response.data;
  };

  // Delete employee
const deleteEmployee = async (id) => {
  await axios.delete(
    `http://localhost:3001/employees/${id}`
  );

  setEmployees((prev) =>
    prev.filter(
      (item) => String(item.id) !== String(id)
    )
  );
};

  const toggleEmployeeStatus = async (id) => {
    const employee = employees.find((item) => String(item.id) === String(id));

    if (!employee) return;

    await updateEmployee(id, {
      ...employee,
      status: employee.status === "active" ? "inactive" : "active",
    });
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        fetchEmployeeById,
        updateEmployee,
        deleteEmployee,
        toggleEmployeeStatus,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
