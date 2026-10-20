import "../styles/Employees.css";
import { Users, UserCheck, UserX, Building2 } from "lucide-react";
function EmployeeStats({ employees, departments }) {
    
  const activeCount = employees.filter(
    (employee) => employee.status === "Active",
  ).length;

  const inactiveCount = employees.filter(
    (employee) => employee.status === "Inactive",
  ).length;

  // Dashboard summary cards
  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      note: "Registered employees",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Employees",
      value: activeCount,
      note: "Currently active",
      icon: UserCheck,
      color: "green",
    },
    {
      title: "Inactive Employees",
      value: inactiveCount,
      note: "Currently inactive",
      icon: UserX,
      color: "red",
    },
    {
      title: "Departments",
      value: departments.length,
      note: "Across the organization",
      icon: Building2,
      color: "purple",
    },
  ];

  return (
    <div className="employee-stats">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="stat-card" key={stat.title}>
            <div className={`stat-icon ${stat.color}`}>
              <Icon size={23} />
            </div>

            <div className="stat-info">
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
              <span>{stat.note}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EmployeeStats;
