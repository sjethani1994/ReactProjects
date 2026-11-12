import { useState } from "react";
import EmployeeTableFilters from "./EmployeeTableFilters";

const EmployeeTable = () => {
  let employeesList = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      department: "Engineering",
      designation: "Frontend Developer",
      salary: 75000,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      department: "HR",
      designation: "HR Manager",
      salary: 65000,
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      department: "Engineering",
      designation: "Backend Developer",
      salary: 80000,
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      department: "Finance",
      designation: "Accountant",
      salary: 55000,
      status: "Inactive",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      department: "Marketing",
      designation: "Marketing Executive",
      salary: 50000,
      status: "Active",
    },
    {
      id: 6,
      name: "Olivia Taylor",
      email: "olivia@example.com",
      department: "Engineering",
      designation: "UI Developer",
      salary: 72000,
      status: "Active",
    },
    {
      id: 7,
      name: "James Anderson",
      email: "james@example.com",
      department: "Sales",
      designation: "Sales Manager",
      salary: 68000,
      status: "Inactive",
    },
    {
      id: 8,
      name: "Sophia Martinez",
      email: "sophia@example.com",
      department: "HR",
      designation: "Recruiter",
      salary: 48000,
      status: "Active",
    },
    {
      id: 9,
      name: "Daniel Thomas",
      email: "daniel@example.com",
      department: "Finance",
      designation: "Financial Analyst",
      salary: 62000,
      status: "Active",
    },
    {
      id: 10,
      name: "Isabella Garcia",
      email: "isabella@example.com",
      department: "Marketing",
      designation: "Content Writer",
      salary: 45000,
      status: "Inactive",
    },
    {
      id: 11,
      name: "William Moore",
      email: "william@example.com",
      department: "Engineering",
      designation: "Full Stack Developer",
      salary: 90000,
      status: "Active",
    },
    {
      id: 12,
      name: "Ava Martin",
      email: "ava@example.com",
      department: "Sales",
      designation: "Sales Executive",
      salary: 52000,
      status: "Active",
    },
  ];

  const [employees] = useState(employeesList);
  const [filteredEmployees, setFilteredEmployees] = useState(employeesList);

  const filterTable = (searchText) => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredEmployees(filtered);
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

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-200 transition">
          + Add Employee
        </button>
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
                      <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition">
                        View
                      </button>

                      <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition">
                        Edit
                      </button>

                      <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition">
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
    </div>
  );
};

export default EmployeeTable;
