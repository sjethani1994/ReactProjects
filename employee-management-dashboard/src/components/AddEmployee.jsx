import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createEmployee } from "../features/employeeSlice";
const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empName: "",
      empEmail: "",
      department: "",
      designation: "",
      salary: "",
      status: "",
    },
  });

  const dispatch = useDispatch();

  const add = (data) => {
    const employeeData = {
      name: data.empName,
      email: data.empEmail,
      department: data.department,
      designation: data.designation,
      salary: data.salary,
      status: data.status,
      createdAt: new Date(),
    };

    dispatch(createEmployee(employeeData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Employee</h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter employee information to add a new team member.
        </p>
      </div>

      {/* Form Card */}
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
        onSubmit={handleSubmit(add)}
      >
        <form className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Personal & Professional Details
            </h2>
            <p className="text-sm text-gray-500">
              Provide the employee's basic information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Name
              </label>
              <input
                type="text"
                {...register("empName", {
                  required: "Employee name is required",
                  minLength: 3,
                  maxLength: 30,
                })}
                placeholder="Enter employee name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.empName && <p role="alert">{errors.empName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("empEmail", {
                  required: "Employee email is required",
                  validate: (value) =>
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                    "Please enter a valid email address",
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.empEmail && <p role="alert">{errors.empEmail.message}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                {...register("department", {
                  required: "Department is required.",
                })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select department
                </option>
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
              {errors.department && (
                <p role="alert">{errors.department.message}</p>
              )}
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                placeholder="Enter designation"
                {...register("designation", {
                  required: "Designation is required",
                  minLength: 3,
                  maxLength: 30,
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.designation && (
                <p role="alert">{errors.designation.message}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary
              </label>
              <input
                type="number"
                {...register("salary", {
                  required: "Salary is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Salary must be greater than zero",
                  },
                })}
                placeholder="Enter salary"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.salary && <p role="alert">{errors.salary.message}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Status
              </label>
              <select
                defaultValue="Active"
                {...register("status", {
                  required: "Employment Status is required.",
                })}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && <p role="alert">{errors.status.message}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm"
            >
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
