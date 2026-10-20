import { useNavigate, useParams } from "react-router-dom";
import { useEmployee } from "../context/EmployeeContext";
import "../styles/EmployeeForm.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const EmployeeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { id, mode } = useParams();
  const navigate = useNavigate();
  const { addEmployee, fetchEmployeeById, updateEmployee } = useEmployee();
  const add = async (data) => {
    try {
      const response = await addEmployee(data);

      console.log("Employee added:", response);

      reset();

      navigate("/employees");
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetchEmployeeById(id);
        reset(response);
      };

      fetchData();
    }
  }, [id]);

  const update = async (data) => {
    try {
      const response = await updateEmployee(id, data);

      console.log("Employee added:", response);

      reset();

      navigate("/employees");
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  return (
    <div className="employee-form-page">
      <div className="employee-form-card">
        <div className="employee-form-header">
          <div>
            <h1>
              {mode === "view"
                ? "View Employee"
                : mode === "edit"
                  ? "Update Employee"
                  : "Add Employee"}
            </h1>
            <p>Enter the employee details below.</p>
          </div>
          <span className="form-header-icon">+</span>
        </div>

        <form
          className="employee-form"
          onSubmit={handleSubmit(mode === "edit" ? update : add)}
        >
          <div className="form-section">
            <h2>Personal Information</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  disabled={mode === "view"}
                  {...register("name", {
                    required: "Employee name is required.",
                    minLength: {
                      value: 3,
                      message: "Name must contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name cannot exceed 50 characters.",
                    },
                  })}
                />

                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  disabled={mode === "view"}
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  disabled={mode === "view"}
                  {...register("phone", {
                    required: "Phone number is required.",
                    maxLength: {
                      value: 10,
                      message: "Invalid phone no",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="joiningDate">Joining Date</label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  disabled={mode === "view"}
                  {...register("joiningDate", {
                    required: "Joining Date is required.",
                  })}
                />
                {errors.joiningDate && (
                  <span className="error-message">
                    {errors.joiningDate.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Professional Information</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="position">Job Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="e.g. Frontend Developer"
                  disabled={mode === "view"}
                  {...register("position", {
                    required: "Position is required.",
                    maxLength: {
                      value: 50,
                      message: "Invalid position",
                    },
                  })}
                />
                {errors.position && (
                  <span className="error-message">
                    {errors.position.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  defaultValue=""
                  disabled={mode === "view"}
                  {...register("department", {
                    required: "Department is required.",
                  })}
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Product">Product</option>
                  <option value="Analytics">Analytics</option>
                </select>
                {errors.department && <span>{errors.department.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="salary">Annual Salary</label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  placeholder="Enter annual salary"
                  disabled={mode === "view"}
                  {...register("salary", {
                    required: "Salary is required.",
                    min: {
                      value: 1,
                      message: "Invalid Salary",
                    },
                  })}
                />
                {errors.salary && (
                  <span className="error-message">{errors.salary.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="status">Employment Status</label>
                <select
                  id="status"
                  name="status"
                  defaultValue=""
                  disabled={mode === "view"}
                  {...register("status", {
                    required: "Status is required.",
                  })}
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <span className="error-message">{errors.status.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Information</h2>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                disabled={mode === "view"}
                placeholder="Enter employee address"
                {...register("address", {
                  required: "Address is required.",
                  maxLength: {
                    value: 50,
                    message: "Invalid Address",
                  },
                })}
              />
              {errors.address && (
                <span className="error-message">{errors.address.message}</span>
              )}
            </div>
          </div>

          <div className="employee-form-actions">
            <button
              type="button"
              className="form-cancel-btn"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="form-submit-btn"
              disabled={mode === "view"}
            >
              {mode === "edit" ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
