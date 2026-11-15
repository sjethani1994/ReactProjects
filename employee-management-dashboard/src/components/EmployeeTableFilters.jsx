import { DEPARTMENTS, STATUSES } from "../constants";

const selectClass =
  "w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

// Shows the filter inputs. The values live in the parent (EmployeeTable):
// we only display them and report changes with onChange.
const EmployeeTableFilters = ({ filters, onChange, onReset }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-5">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            value={filters.search}
            placeholder="Search by name or email..."
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <select
          value={filters.department}
          onChange={(e) => onChange({ ...filters, department: e.target.value })}
          className={`${selectClass} sm:w-48`}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className={`${selectClass} sm:w-40`}
        >
          <option value="">All Status</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default EmployeeTableFilters;
