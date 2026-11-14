import { useEffect, useState } from "react";

function EmployeeTableFilters({ filterTable }) {
  const [departments, setDepartments] = useState("");
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  const resetFilters = () => {
    setDepartments("");
    setSearchText("");
    setStatus("");
  };
  useEffect(() => {
    filterTable(searchText, departments, status);
  }, [searchText, departments, status, filterTable]);
  return (
    <>
      {/* Search and Filter Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-5">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              value={searchText}
              placeholder="Search by name or email..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Department Filter */}
          <select
            value={departments}
            onChange={(e) => setDepartments(e.target.value)}
            className="w-full sm:w-48 px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-40 px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Reset Button */}
          <button
            type="button"
            onClick={resetFilters}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTableFilters;
