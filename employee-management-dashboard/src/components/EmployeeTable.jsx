import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteEmployeeById, fetchEmployees } from "../features/employeeSlice";
import EmployeeTableFilters from "./EmployeeTableFilters";
import ConfirmDialog from "./ConfirmDialog";

const NO_FILTERS = { search: "", department: "", status: "" };

const COLUMNS = [
  "ID",
  "Employee",
  "Department",
  "Designation",
  "Salary",
  "Status",
  "Actions",
];

// "Sumit Jethani" → "SJ"
const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, error } = useSelector((state) => state.employee);

  const [filters, setFilters] = useState(NO_FILTERS);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // null = dialog closed

  // Load the list once when the page opens
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Calculated on every render from employees + filters (no extra state needed)
  const search = filters.search.toLowerCase();
  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.name.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search)) &&
      (filters.department === "" ||
        employee.department === filters.department) &&
      (filters.status === "" || employee.status === filters.status),
  );

  const confirmDelete = () => {
    dispatch(deleteEmployeeById(employeeToDelete.id));
    setEmployeeToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Employee Directory
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor your employees
          </p>
        </div>

        <Link
          to="/employees/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-200 transition inline-block"
        >
          + Add Employee
        </Link>
      </div>

      <EmployeeTableFilters
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(NO_FILTERS)}
      />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-y-auto max-h-[525px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-100">
              <tr>
                {COLUMNS.map((column) => (
                  <th
                    key={column}
                    className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading && employees.length === 0 && (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="px-6 py-8 text-center text-sm text-slate-500"
                  >
                    Loading employees...
                  </td>
                </tr>
              )}

              {filteredEmployees.map((employee) => {
                const isActive = employee.status === "Active";

                return (
                  <tr
                    key={employee.id}
                    className="hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                      {employee.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {getInitials(employee.name)}
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

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {employee.department}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {employee.designation}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      ₹{Number(employee.salary).toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        ></span>
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/employees/view/${employee.id}`)
                          }
                          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/employees/edit/${employee.id}`)
                          }
                          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setEmployeeToDelete(employee)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={employeeToDelete !== null}
        title="Delete employee?"
        message={`${employeeToDelete?.name} will be permanently removed. This can't be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setEmployeeToDelete(null)}
      />
    </div>
  );
};

export default EmployeeTable;
