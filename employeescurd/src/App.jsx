import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      department: "Engineering",
      salary: 75000,
      experience: 5,
    },
    {
      id: 2,
      name: "Priya Patel",
      department: "Design",
      salary: 65000,
      experience: 4,
    },
    {
      id: 3,
      name: "Amit Verma",
      department: "Engineering",
      salary: 85000,
      experience: 6,
    },
    {
      id: 4,
      name: "Neha Joshi",
      department: "HR",
      salary: 60000,
      experience: 5,
    },
  ]);

  const addEmployee = (emp) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        id: Math.random(),
        ...emp,
      },
    ]);
  };

  const [editEmployee, setEditEmployee] = useState("");

  const getEmployee = (userId) => {
    const editedUser = employees.find((emp) => emp.id === userId);
    setEditEmployee(editedUser);
  };

  const updateEmployee = (emp) => {
    setEmployees((prevEmp) =>
      prevEmp.map((employee) => (employee.id === emp.id ? emp : employee)),
    );
  };
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            getEmployee={getEmployee}
          />
        ))}

        <EmployeeForm
          addEmployee={addEmployee}
          editEmployee={editEmployee}
          updateEmployee={updateEmployee}
        />
      </div>
    </>
  );
}

export default App;
