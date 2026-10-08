import { useEffect, useState } from "react";
import "./EmployeeForm.css";

function EmployeeForm({ addEmployee, editEmployee, updateEmployee }) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeObject = {
      name,
      department,
      salary,
      experience,
    };

    console.log("Added Employee", employeeObject);

    addEmployee(employeeObject);

    // Clear form after adding
    setName("");
    setDepartment("");
    setSalary("");
    setExperience("");
  };

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name);
      setDepartment(editEmployee.department);
      setSalary(editEmployee.salary);
      setExperience(editEmployee.experience);
    }
  }, [editEmployee]);

  const updatedEmployee = (e) => {
    e.preventDefault();
    const employeeObject = {
      id: editEmployee.id,
      name,
      department,
      salary,
      experience,
    };

    updateEmployee(employeeObject);
  };

  return (
    <div className="employee-form-container">
      <h2>Add Employee</h2>

      <form onSubmit={editEmployee ? updatedEmployee : handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Employee Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Experience</label>
          <input
            type="number"
            id="salary"
            placeholder="Enter experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">
          {editEmployee ? "Edit Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
