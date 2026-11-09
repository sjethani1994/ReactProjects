import { useReducer, useState } from "react";

const tabs = [
  {
    id: "personal",
    label: "Personal",
    title: "Personal Information",
    description: "Basic information about the employee.",
  },
  {
    id: "employment",
    label: "Employment",
    title: "Employment Information",
    description: "Employee role and organization details.",
  },
  {
    id: "address",
    label: "Address",
    title: "Address Information",
    description: "Employee residential address.",
  },
];

const initialState = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  },
  employment: {
    employeeId: "",
    department: "",
    designation: "",
    employmentType: "",
    joiningDate: "",
    employeeStatus: "Active",
    annualSalary: "",
  },
  address: {
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PERSONAL":
      return {
        ...state,
        personal: {
          ...state.personal,
          ...action.payload,
        },
      };
    case "UPDATE_EMPLOYMENT":
      return {
        ...state,
        employment: {
          ...state.employment,
          ...action.payload,
        },
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          ...action.payload,
        },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
const AddEmployee = () => {
  const [activeTab, setActiveTab] = useState(0);
  const isLastTab = activeTab === tabs.length - 1;

  // Panels stay mounted and are only hidden, so typed values survive tab switches
  const panelProps = (index) => ({
    id: `panel-${tabs[index].id}`,
    role: "tabpanel",
    "aria-labelledby": `tab-${tabs[index].id}`,
    hidden: activeTab !== index,
  });

  const [addEmployee, dispatch] = useReducer(reducer, initialState);

  const saveEmployeeData = (e) => {
    e.preventDefault();
    console.log("Add Employee:", addEmployee);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Add New Employee</h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the employee details below.
        </p>
      </div>

      {/* Main Form */}
      <form
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        onReset={() => {
          setActiveTab(0);
          dispatch({ type: "RESET" });
        }}
        onSubmit={(e) => saveEmployeeData(e)}
      >
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Employee details"
          className="grid grid-cols-3 border-b border-slate-200"
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(index)}
                className={`flex items-center justify-center gap-2 border-b-2 px-2 py-3.5 text-sm font-medium transition ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <span
                  className={`hidden h-6 w-6 items-center justify-center rounded-full text-xs font-semibold sm:flex ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {index + 1}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-800">
              {tabs[activeTab].title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {tabs[activeTab].description}
            </p>
          </div>

          {/* Personal Information */}
          <section {...panelProps(0)}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  defaultValue={addEmployee.personal.firstName}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PERSONAL",
                      payload: { firstName: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  defaultValue={addEmployee.personal.lastName}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PERSONAL",
                      payload: { lastName: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  defaultValue={addEmployee.personal.email}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PERSONAL",
                      payload: { email: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  defaultValue={addEmployee.personal.phone}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PERSONAL",
                      payload: { phone: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  defaultValue={addEmployee.personal.dob}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PERSONAL",
                      payload: { dob: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.personal.gender}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_PERSONAL",
                      payload: { gender: e.target.value },
                    })
                  }
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
          </section>

          {/* Employment Information */}
          <section {...panelProps(1)}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Employee ID
                </label>
                <input
                  type="text"
                  placeholder="EMP-001"
                  defaultValue={addEmployee.employment.employeeId}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_EMPLOYMENT",
                      payload: { employeeId: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Department
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.employment.department}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_EMPLOYMENT",
                      payload: { department: e.target.value },
                    })
                  }
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>Design</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Designation
                </label>
                <input
                  type="text"
                  placeholder="Frontend Developer"
                  defaultValue={addEmployee.employment.designation}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_EMPLOYMENT",
                      payload: { designation: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Employment Type
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.employment.employmentType}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_EMPLOYMENT",
                      payload: { employmentType: e.target.value },
                    });
                  }}
                >
                  <option value="" disabled>
                    Select employment type
                  </option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Intern</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Joining Date
                </label>
                <input
                  type="date"
                  defaultValue={addEmployee.employment.joiningDate}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_EMPLOYMENT",
                      payload: { joiningDate: e.target.value },
                    });
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Employee Status
                </label>
                <select
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.employment.employeeStatus}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_EMPLOYMENT",
                      payload: { employeeStatus: e.target.value },
                    });
                  }}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Probation</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Annual Salary
                </label>
                <input
                  type="number"
                  placeholder="Enter annual salary"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.employment.annualSalary}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_EMPLOYMENT",
                      payload: { annualSalary: e.target.value },
                    });
                  }}
                />
              </div>
            </div>
          </section>

          {/* Address Information */}
          <section {...panelProps(2)}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="Enter street address"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.address.streetAddress}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_ADDRESS",
                      payload: { streetAddress: e.target.value },
                    });
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.address.city}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_ADDRESS",
                      payload: { city: e.target.value },
                    });
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter state"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.address.state}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_ADDRESS",
                      payload: { state: e.target.value },
                    });
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Enter country"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.address.country}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_ADDRESS",
                      payload: { country: e.target.value },
                    });
                  }}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="Enter postal code"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  defaultValue={addEmployee.address.postalCode}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_ADDRESS",
                      payload: { postalCode: e.target.value },
                    });
                  }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
          <button
            type="reset"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>

          <div className="flex gap-3">
            {activeTab > 0 && (
              <button
                type="button"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setActiveTab((prev) => prev - 1)}
              >
                Previous
              </button>
            )}

            {/* Different keys stop React reusing the Next button as the submit button mid-click */}
            {isLastTab ? (
              <button
                key="submit"
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Add Employee
              </button>
            ) : (
              <button
                key="next"
                type="button"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                onClick={() => setActiveTab((prev) => prev + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
