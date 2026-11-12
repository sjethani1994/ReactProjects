import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            EmployeeHub
          </h1>
          <p className="text-sm text-blue-200">Employee Management Dashboard</p>
        </div>

        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-semibold pb-1 transition ${
                isActive
                  ? "text-white border-b-2 border-cyan-400"
                  : "text-blue-200 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `text-sm font-semibold pb-1 transition ${
                isActive
                  ? "text-white border-b-2 border-cyan-400"
                  : "text-blue-200 hover:text-white"
              }`
            }
          >
            Employees
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center font-bold">
            AU
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin User</p>
            <p className="text-xs text-blue-200">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
