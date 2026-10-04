import { useState } from "react";
import InputField from "./InputField";
import { useRef } from "react";

function App() {
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const fieldRefs = useRef({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return;
    }
    console.log(employeeForm);
  };

  const validateForm = () => {
    if (employeeForm.name.trim() === "") {
      fieldRefs.current.name?.focus();
      return false;
    }

    if (employeeForm.name.trim().length < 3) {
      fieldRefs.current.name?.focus();
      return false;
    }

    if (employeeForm.email.trim() === "") {
      fieldRefs.current.email?.focus();
      return false;
    }

    if (employeeForm.phone.trim() === "") {
      fieldRefs.current.phone?.focus();
      return false;
    }

    if (employeeForm.age.trim() === "") {
      fieldRefs.current.age?.focus();
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="conatiner w-full d-flex flex-wrap justify-center">
        <form
          className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Employee Registration
          </h2>
          <InputField
            label="Name"
            id="name"
            type="text"
            placeholder="Enter Name"
            value={employeeForm.name}
            fieldRefs={fieldRefs}
            onChange={(e) =>
              setEmployeeForm({
                ...employeeForm,
                name: e.target.value,
              })
            }
          />
          <InputField
            label="Email"
            id="email"
            type="text"
            placeholder="Enter Email"
            value={employeeForm.email}
            fieldRefs={fieldRefs}
            onChange={(e) =>
              setEmployeeForm({
                ...employeeForm,
                email: e.target.value,
              })
            }
          />
          <InputField
            label="Phone Number"
            id="phone"
            type="text"
            placeholder="Enter Phone Number"
            value={employeeForm.phone}
            fieldRefs={fieldRefs}
            onChange={(e) =>
              setEmployeeForm({
                ...employeeForm,
                phone: e.target.value,
              })
            }
          />
          <InputField
            label="Age"
            id="age"
            type="number"
            placeholder="Enter Age"
            value={employeeForm.age}
            fieldRefs={fieldRefs}
            onChange={(e) =>
              setEmployeeForm({
                ...employeeForm,
                age: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
