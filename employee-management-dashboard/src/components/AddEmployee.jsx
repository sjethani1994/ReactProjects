import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedEmployee,
  createEmployee,
  getEmployeeById,
} from "../features/employeeSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Outside the component so it's the same object every render
const EMPTY_FORM = {
  empName: "",
  empEmail: "",
  department: "",
  designation: "",
  salary: "",
  status: "Active", // new employees start Active (the select has no empty option)
};

const AddEmployee = ({ mode }) => {
  const { id } = useParams();
  const isView = mode === "view"; // read-only page

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }, // isSubmitting = true while add() is awaiting
  } = useForm({ defaultValues: EMPTY_FORM });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);

  const add = async (data) => {
    const employeeData = {
      name: data.empName,
      email: data.empEmail,
      department: data.department,
      designation: data.designation,
      salary: data.salary,
      status: data.status,
      // createdAt is set in employeeService (serverTimestamp)
    };

    try {
      setSubmitError(null);
      // unwrap() returns the thunk's result as a normal Promise:
      // resolves on "fulfilled", throws on "rejected" — so we can await it.
      await dispatch(createEmployee(employeeData)).unwrap();
      navigate("/employees"); // saved → back to the list
    } catch (error) {
      setSubmitError(error.message ?? "Could not save employee");
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeById(id)); // only view/edit have an id; /employees/add doesn't
    }

    // Cleanup runs when leaving the page or when id changes (like ngOnDestroy)
    return () => {
      dispatch(clearSelectedEmployee());
    };
  }, [id, dispatch]);

  const { selectedEmployee } = useSelector((state) => state.employee);

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        empName: selectedEmployee.name,
        empEmail: selectedEmployee.email,
        department: selectedEmployee.department,
        designation: selectedEmployee.designation,
        salary: selectedEmployee.salary,
        status: selectedEmployee.status,
      });
    } else {
      reset(EMPTY_FORM);
    }
  }, [selectedEmployee, reset]);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {mode === "add"
            ? "Add New Employee"
            : mode === "edit"
              ? "Edit Employee"
              : "View Employee"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter employee information to add a new team member.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit(add)}>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Personal & Professional Details
            </h2>
            <p className="text-sm text-gray-500">
              Provide the employee's basic information.
            </p>
          </div>

          {/* <fieldset disabled> disables every input/select inside it at once */}
          <fieldset disabled={isView} className="min-w-0">
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
                    // { value, message }: without a message the error is silent
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Name must be at most 30 characters",
                    },
                  })}
                  placeholder="Enter employee name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
                {errors.empName && (
                  <p role="alert" className="mt-1 text-sm text-red-600">
                    {errors.empName.message}
                  </p>
                )}
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
                {errors.empEmail && (
                  <p role="alert" className="mt-1 text-sm text-red-600">
                    {errors.empEmail.message}
                  </p>
                )}
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
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
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
                  <p role="alert" className="mt-1 text-sm text-red-600">
                    {errors.department.message}
                  </p>
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
                    minLength: {
                      value: 2, // allow short titles like "QA", "HR"
                      message: "Designation must be at least 2 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Designation must be at most 30 characters",
                    },
                  })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
                {errors.designation && (
                  <p role="alert" className="mt-1 text-sm text-red-600">
                    {errors.designation.message}
                  </p>
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
                {errors.salary && (
                  <p role="alert" className="mt-1 text-sm text-red-600">
                    {errors.salary.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Status
                </label>
                <select
                  {...register("status", {
                    required: "Employment Status is required.",
                  })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p role="alert" className="mt-1 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          {submitError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {submitError}
            </p>
          )}

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-200 pt-6">
            <Link
              to="/employees"
              className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition text-center"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isView || isSubmitting} // also blocks double-clicks → duplicate employees
              className="px-6 py-3 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Saving..."
                : mode === "add"
                  ? "Save Employee"
                  : mode === "edit"
                    ? "Edit Employee"
                    : "View Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
