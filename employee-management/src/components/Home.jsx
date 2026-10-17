import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeCard from "./EmployeeCard";
function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  const fetchEmployeesData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );

    setEmployees(response.data);
  };

  const deleteEmployee = async (id) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };
  return (
    <div className="employee-grid">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          deleteEmployee={deleteEmployee}
        />
      ))}
    </div>
  );
}

export default Home;
