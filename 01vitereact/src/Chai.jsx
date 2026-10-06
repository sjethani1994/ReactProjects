// const Chai = ({ product }) => {
//   return (
//     <>
//     <h1>Chai is ready {product.name}</h1>
//     </>
//   );
// };

// export default Chai;

import "./Chai.css";

const Chai = ({ user: { id, name, role, experience }, getUserById }) => {
  return (
    <>
      <div className="user-card">
        <div className="user-avatar">{name.charAt(0)}</div>

        <div className="user-info">
          <h2>{name}</h2>
          <p className="role">{role}</p>

          <div className="user-details">
            <span>💼 {experience} Years Experience</span>
            <span>📍 Pune</span>
          </div>

          <button className="view-btn">View Profile</button>
          <br /><button className="view-btn" onClick={() => getUserById(id)}>Edit Profile</button>
        </div>
      </div>
    </>
  );
};

export default Chai;
