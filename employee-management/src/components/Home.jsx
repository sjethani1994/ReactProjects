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
  
  return (
    <div className="employee-grid">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default Home;
