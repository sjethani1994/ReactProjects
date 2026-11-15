import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearSelectedEmployee,
  createEmployee,
  getEmployeeById,
} from "../features/employeeSlice";
import { DEPARTMENTS, STATUSES } from "../constants";
import FormField from "./FormField";

// Field names match the employee data, so no converting back and forth
const EMPTY_FORM = {
  name: "",
  email: "",
  department: "",
  designation: "",
  salary: "",
  status: "Active",
};

const PAGE_TITLES = {
  add: "Add New Employee",
  edit: "Edit Employee",
  view: "View Employee",
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";

// Used for all three pages: mode is "add", "edit" or "view"
const EmployeeForm = ({ mode }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEmployee } = useSelector((state) => state.employee);
  const [submitError, setSubmitError] = useState(null);
  const isView = mode === "view";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // 1. View / edit pages have an id → load that employee
  useEffect(() => {
    if (id) {
      dispatch(getEmployeeById(id));
    }
    return () => dispatch(clearSelectedEmployee());
  }, [id, dispatch]);

  // 2. When the employee arrives, show it in the form (no employee → empty form)
  useEffect(() => {
    reset(selectedEmployee ?? EMPTY_FORM);
  }, [selectedEmployee, reset]);

  const onSubmit = async (employee) => {
    try {
      setSubmitError(null);
      await dispatch(createEmployee(employee)).unwrap();
      navigate("/employees");
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {PAGE_TITLES[mode]}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter employee information to add a new team member.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Personal & Professional Details
            </h2>
            <p className="text-sm text-gray-500">
              Provide the employee's basic information.
            </p>
          </div>

          {/* disabled fieldset = every field inside is disabled */}
          <fieldset disabled={isView} className="min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Employee Name" error={errors.name}>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  className={inputClass}
                  {...register("name", {
                    required: "Employee name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Name must be at most 30 characters",
                    },
                  })}
                />
              </FormField>

              <FormField label="Email Address" error={errors.email}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className={inputClass}
                  {...register("email", {
                    required: "Employee email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </FormField>

              <FormField label="Department" error={errors.department}>
                <select
                  className={inputClass}
                  {...register("department", {
                    required: "Department is required",
                  })}
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  {DEPARTMENTS.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Designation" error={errors.designation}>
                <input
                  type="text"
                  placeholder="Enter designation"
                  className={inputClass}
                  {...register("designation", {
                    required: "Designation is required",
                    minLength: {
                      value: 2,
                      message: "Designation must be at least 2 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Designation must be at most 30 characters",
                    },
                  })}
                />
              </FormField>

              <FormField label="Salary" error={errors.salary}>
                <input
                  type="number"
                  placeholder="Enter salary"
                  className={inputClass}
                  {...register("salary", {
                    required: "Salary is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Salary must be greater than zero",
                    },
                  })}
                />
              </FormField>

              <FormField label="Employment Status" error={errors.status}>
                <select className={inputClass} {...register("status")}>
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </FormField>
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

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-200 pt-6">
            <Link
              to="/employees"
              className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 text-center hover:bg-gray-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isView || isSubmitting}
              className="px-6 py-3 rounded-lg bg-blue-600 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
