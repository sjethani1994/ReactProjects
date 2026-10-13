import { Link } from "react-router-dom";
import "../styles/EmployeeCard.css";

function EmployeeCard({ employee }) {
  console.log(employee);

  return (
    <div className="employee-card">
      <div className="employee-card-header">
        <div className="employee-avatar">{employee.name.charAt(0)}</div>

        <div>
          <h2>{employee.name}</h2>
          <p className="employee-role">{employee.company.name}</p>
        </div>
      </div>

      <div className="employee-details">
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p>
          <strong>Company:</strong> {employee.company.name}
        </p>
        <p>
          <strong>City:</strong> {employee.address.city}
        </p>
      </div>

      <div className="employee-card-actions">
        <Link to={`/employee/${employee.id}/false`} className="btn-view">
          View
        </Link>
        <Link to={`/employee/${employee.id}/true`} className="btn-edit">
          Edit
        </Link>

        <button className="btn-delete">Delete</button>
      </div>
    </div>
  );
}

export default EmployeeCard;
