import { useCallback, useEffect, useState } from "react";
import EmployeeTableFilters from "./EmployeeTableFilters";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployeeById, fetchEmployees } from "../features/employeeSlice";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

const EmployeeTable = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const dispatch = useDispatch();

  const { employees } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filterTable = useCallback(
    (searchText, department, status) => {
      const filtered = employees.filter((employee) => {
        const matchesSearch =
          employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchText.toLowerCase());

        const matchesDepartment =
          department === "" || employee.department === department;

        const matchesStatus = status === "" || employee.status === status;

        return matchesSearch && matchesDepartment && matchesStatus;
      });

      setFilteredEmployees(filtered);
    },
    [employees],
  );

  const navigate = useNavigate();

  const viewEmployee = (id) => {
    navigate(`/employees/view/${id}`);
  };

  const editEmployee = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  // Employee waiting for confirmation. null = dialog closed.
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Delete button → only opens the dialog
  const removeEmployee = (employee) => {
    setEmployeeToDelete(employee);
  };

  // Dialog's red "Delete" button → actually delete, then close
  const confirmDelete = () => {
    dispatch(deleteEmployeeById(employeeToDelete.id));
    setEmployeeToDelete(null);
  };

  const cancelDelete = () => {
    setEmployeeToDelete(null);
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Heading */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Employee Directory
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor your employees
          </p>
        </div>

        <NavLink
          to="/employees/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-200 transition inline-block"
        >
          + Add Employee
        </NavLink>
      </div>

      {/* Employee Table */}
      <EmployeeTableFilters filterTable={filterTable} />
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-y-auto max-h-[525px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-blue-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    {employee.id}
                  </td>

                  {/* Employee Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {employee.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {employee.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-700">
                      {employee.department}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">
                      {employee.designation}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-800">
                      ₹{employee.salary.toLocaleString("en-IN")}
                    </span>
                  </td>

                  {/* Employee Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        employee.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          employee.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      {employee.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => viewEmployee(employee.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => editEmployee(employee.id)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => removeEmployee(employee)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={employeeToDelete !== null}
        title="Delete employee?"
        message={
          employeeToDelete &&
          `${employeeToDelete.name} will be permanently removed. This can't be undone.`
        }
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default EmployeeTable;
