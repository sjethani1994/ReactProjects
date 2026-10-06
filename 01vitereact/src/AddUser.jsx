import { useEffect, useState } from "react";
import "./AddUser.css";

function AddUser({ onAddUser, user, onUpdateUser }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObject = {
      name,
      role,
      experience,
    };

    console.log("AddUser created:", userObject);

    onAddUser(userObject);

    // Clear form after adding
    setName("");
    setRole("");
    setExperience("");
  };

const updateUser = (e) => {
  e.preventDefault();

  const updatedUser = {
    id: user.id,
    name,
    role,
    experience,
  };

  console.log("Updated user:", updatedUser);

  onUpdateUser(updatedUser);
};

  useEffect(() => {
  if (user) {
    setName(user.name);
    setRole(user.role);
    setExperience(user.experience);
  }
}, [user]);

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>

      <form onSubmit={user ? updateUser : handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <input
            type="number"
            id="experience"
            placeholder="Enter experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <button type="submit">{ user ? "update user" : "Add User" }</button>
      </form>
    </div>
  );
}

export default AddUser;
