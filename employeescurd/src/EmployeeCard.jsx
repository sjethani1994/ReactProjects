import "./EmployeeCard.css";

function EmployeeCard({ employee, getEmployee, deleteEmployee }) {
  const { id, name, department, salary, experience } = employee;

  return (
    <div className="employee-card">
      <div className="employee-avatar">{name.charAt(0)}</div>

      <div className="employee-info">
        <h2>{name}</h2>

        <p className="employee-department">{department}</p>

        <div className="employee-details">
          <p>💼 {experience} Years Experience</p>
          <p>💰 ₹ {salary}</p>
          <p>📍 Pune</p>
        </div>

        <div className="employee-actions">
          <button
            className="bg-blue-600 w-20 text-xl text-white rounded-md py-2"
            onClick={() => getEmployee(id)}
          >
            Edit
          </button>

          <button
            className="bg-red-600 w-20 text-xl text-white rounded-md py-2"
            onClick={() => deleteEmployee(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
