import React, { useEffect, useState } from "react";
import "../styles/EmployeeOperations.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EmployeeOperations() {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  const { empId, isEdit } = useParams();
  const navigate = useNavigate();
  let [isEditMode, setIsEditMode] = useState(isEdit === "true");
  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${empId}`,
        );

        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeById();
  }, [empId]);

  if (loading) {
    return <div className="employee-operations">Loading employee...</div>;
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${empId}`,
      employee
    );

    console.log(response.data);

    isEditMode = false;
    navigate("/");
  } catch (error) {
    console.error("Error updating employee:", error);
  }
};
  return (
    <div className="employee-operations">
      <div className="employee-operations-header">
        <div>
          <h2>Employee Details</h2>
          <p>View and manage employee information</p>
        </div>

        <Link className="btn-view" to={"/"}>
          ← Back to Employees
        </Link>
      </div>

      <div className="employee-operations-grid">
        {/* Employee Profile */}
        <div className="employee-profile-card">
          <div className="employee-profile-banner">
            <div className="employee-avatar">
              {employee.name
                ?.split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <h3>{employee.name}</h3>
            <p>Employee ID: {employee.id}</p>
            <span className="employee-status">Active</span>
          </div>

          <div className="employee-profile-details">
            <h4>Contact Information</h4>

            <div className="employee-detail-item">
              <span>Email</span>
              <strong>{employee.email}</strong>
            </div>

            <div className="employee-detail-item">
              <span>Phone</span>
              <strong>{employee.phone}</strong>
            </div>

            <div className="employee-detail-item">
              <span>Website</span>
              <strong>{employee.website}</strong>
            </div>

            <h4>Address</h4>

            <div className="employee-detail-item">
              <span>Street</span>
              <strong>{employee.address?.street}</strong>
            </div>

            <div className="employee-detail-item">
              <span>Suite</span>
              <strong>{employee.address?.suite}</strong>
            </div>

            <div className="employee-detail-item">
              <span>City</span>
              <strong>{employee.address?.city}</strong>
            </div>

            <div className="employee-detail-item">
              <span>Zipcode</span>
              <strong>{employee.address?.zipcode}</strong>
            </div>

            <h4>Company</h4>

            <div className="employee-detail-item">
              <span>Company Name</span>
              <strong>{employee.company?.name}</strong>
            </div>

            <div className="employee-detail-item">
              <span>Catchphrase</span>
              <strong>{employee.company?.catchPhrase}</strong>
            </div>
          </div>
        </div>

        {/* Edit Employee Form */}
        <div className="employee-edit-card">
          <div className="employee-edit-header">
            <div>
              <h3>{isEditMode ? "Edit Employee" : "View Employee"}</h3>
              <p>Update employee information below</p>
            </div>

            <span
              className="edit-icon"
              onClick={() => setIsEditMode((prev) => !prev)}
            >
              ✎
            </span>
          </div>

          <form
            className="employee-edit-form"
            key={employee.id}
            onSubmit={handleSubmit}
          >
            <div className="form-section-title">Basic Information</div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employee-name">Full Name</label>
                <input
                  id="employee-name"
                  type="text"
                  defaultValue={employee.name || ""}
                  placeholder="Enter full name"
                  disabled={!isEditMode}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="employee-username">Username</label>
                <input
                  id="employee-username"
                  type="text"
                  defaultValue={employee.username || ""}
                  placeholder="Enter username"
                  disabled={!isEditMode}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      username: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employee-email">Email Address</label>
                <input
                  id="employee-email"
                  type="email"
                  defaultValue={employee.email || ""}
                  placeholder="Enter email"
                  disabled={!isEditMode}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="employee-phone">Phone Number</label>
                <input
                  id="employee-phone"
                  type="text"
                  defaultValue={employee.phone || ""}
                  placeholder="Enter phone number"
                  disabled={!isEditMode}
                  onChange={(e) =>
                    setEmployee({
                      ...employee,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employee-website">Website</label>
              <input
                id="employee-website"
                type="text"
                defaultValue={employee.website || ""}
                placeholder="Enter website"
                disabled={!isEditMode}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    website: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-section-title">Address Information</div>

            <div className="form-group">
              <label htmlFor="employee-street">Street</label>
              <input
                id="employee-street"
                type="text"
                defaultValue={employee.address?.street || ""}
                placeholder="Enter street"
                disabled={!isEditMode}
                onChange={(e) =>
                  setEmployee((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      street: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="employee-suite">Suite</label>
              <input
                id="employee-suite"
                type="text"
                defaultValue={employee.address?.suite || ""}
                placeholder="Enter suite"
                disabled={!isEditMode}
                onChange={(e) =>
                  setEmployee((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      suite: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employee-city">City</label>
                <input
                  id="employee-city"
                  type="text"
                  defaultValue={employee.address?.city || ""}
                  placeholder="Enter city"
                  disabled={!isEditMode}
                  onChange={(e) =>
                    setEmployee((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        city: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="employee-zipcode">Zipcode</label>
                <input
                  id="employee-zipcode"
                  type="text"
                  defaultValue={employee.address?.zipcode || ""}
                  placeholder="Enter zipcode"
                  disabled={!isEditMode}
                  onChange={(e) =>
                    setEmployee((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        zipcode: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-section-title">Company Information</div>

            <div className="form-group">
              <label htmlFor="employee-company">Company Name</label>
              <input
                id="employee-company"
                type="text"
                defaultValue={employee.company?.name || ""}
                placeholder="Enter company name"
                disabled={!isEditMode}
                onChange={(e) =>
                  setEmployee((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      name: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="employee-catchphrase">Catchphrase</label>
              <input
                id="employee-catchphrase"
                type="text"
                defaultValue={employee.company?.catchPhrase || ""}
                placeholder="Enter catchphrase"
                disabled={!isEditMode}
                onChange={(e) =>
                  setEmployee((prev) => ({
                    ...prev,
                    company: {
                      ...prev.company,
                      catchPhrase: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div className="employee-form-actions">
              <button type="button" className="cancel-btn">
                Cancel
              </button>

              <button type="submit" className="save-btn" disabled={!isEditMode}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeOperations;
