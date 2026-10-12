import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import EmployeeCard from "./components/EmployeeCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  const fetchEmployeesData = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );

    setEmployees(response.data);

    console.log(response.data); // Logs fetched employees immediately
  };

  return (
    <>
      <Header />
      <div className="employee-grid">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
