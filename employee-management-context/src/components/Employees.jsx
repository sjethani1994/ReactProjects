import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Users, Search, Eye, Pencil, Trash2 } from "lucide-react";
import "../styles/Employees.css";
import { useEmployee } from "../context/EmployeeContext";
import EmployeeStats from "./EmployeeStats";

const Employees = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const { employees, deleteEmployee } = useEmployee();
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  // Get unique departments from employee data
  const departments = [
    ...new Set(
      employees.map((employee) => employee.department).filter(Boolean),
    ),
  ];

  // Apply search and filters
  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch = [
      employee.name,
      employee.email,
      employee.position,
      employee.department,
    ].some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(searchText),
    );

    const matchesDepartment =
      departmentFilter === "All" || employee.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;

    return matchesDepartment && matchesStatus && matchesSearch;
  });

const onDelete = async (id) => {
  console.log("1. Starting delete");

  try {
    await deleteEmployee(id);
    console.log("2. Delete completed");

    setEmployeeToDelete(null);
    console.log("3. Popup closed");
  } catch (error) {
    console.error("Delete failed:", error);
  }
};

  return (
    <div className="employees-page">
      <EmployeeStats employees={employees} departments={departments} />
      <section className="employee-directory">
        <div className="directory-heading">
          <div>
            <h2>Employee Directory</h2>
            <p>
              {filteredEmployees.length} employee
              {filteredEmployees.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="employee-filters">
          <div className="employee-search">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search name, email, role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="All">All departments</option>

            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>POSITION</th>
                <th>DEPARTMENT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-identity">
                      <div className="employee-avatar">
                        {employee.name
                          ?.split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase() || "E"}
                      </div>

                      <div className="employee-identity-info">
                        <strong>{employee.name}</strong>
                        <span>{employee.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{employee.position || "—"}</td>
                  <td>{employee.department || "—"}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        employee.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      <span className="status-dot" />
                      {employee.status || "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="employee-actions">
                      <NavLink
                        to={`/employees/view/${employee.id}`}
                        className="action-icon view-action"
                        title="View employee"
                        aria-label={`View ${employee.name}`}
                      >
                        <Eye size={17} />
                      </NavLink>

                      <NavLink
                        to={`/employees/edit/${employee.id}`}
                        className="action-icon edit-action"
                        title="Edit employee"
                        aria-label={`Edit ${employee.name}`}
                      >
                        <Pencil size={17} />
                      </NavLink>

                      <button
                        type="button"
                        className="action-icon delete-action"
                        title="Delete employee"
                        aria-label={`Delete ${employee.name}`}
                        onClick={() => setEmployeeToDelete(employee)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-employees">
                    <Users size={32} />
                    <strong>No employees found</strong>
                    <span>Try changing your search or filters.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {employeeToDelete && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-icon">
              <Trash2 size={26} />
            </div>

            <h2>Delete Employee?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{employeeToDelete.name}</strong>? This action cannot be
              undone.
            </p>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="modal-cancel-btn"
                onClick={() => setEmployeeToDelete(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-delete-btn"
                onClick={() => onDelete(employeeToDelete.id)}
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
