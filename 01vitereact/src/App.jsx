import { useState } from "react";
import Chai from "./Chai";
import AddUser from "./AddUser";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul",
      role: "Developer",
      experience: 5,
    },
    {
      id: 2,
      name: "Priya",
      role: "Designer",
      experience: 3,
    },
    {
      id: 3,
      name: "Amit",
      role: "Developer",
      experience: 7,
    },
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddUser = (userObject) => {
    console.log("App received:", userObject);

    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: Math.random(),
        ...userObject,
      },
    ]);
  };

  const getUserById = (userId) => {
    console.log("App received:", userId);
    let user = users.find((user) => user.id === userId);
    setCurrentUser(user);
  };

  const onUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );
  };

  const deleteUserById = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <>
      <h1>App is ready</h1>
      <AddUser
        onAddUser={handleAddUser}
        user={currentUser}
        onUpdateUser={onUpdateUser}
      />
      {users.map((user) => (
        <Chai
          key={user.id}
          user={user}
          getUserById={getUserById}
          deleteUserById={deleteUserById}
        />
      ))}
    </>
  );
}

export default App;

// function App() {
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Laptop",
//       price: 50000,
//       category: "Electronics",
//       available: true,
//     },
//     {
//       id: 2,
//       name: "Mouse",
//       price: 1000,
//       category: "Electronics",
//       available: true,
//     },
//     {
//       id: 3,
//       name: "Keyboard",
//       price: 2000,
//       category: "Electronics",
//       available: false,
//     },
//     {
//       id: 4,
//       name: "Office Chair",
//       price: 8000,
//       category: "Furniture",
//       available: true,
//     },
//     {
//       id: 5,
//       name: "Desk",
//       price: 12000,
//       category: "Furniture",
//       available: false,
//     },
//   ]);

//   const [showAvailable, setShowAvailable] = useState(false);

//   const filteredProducts = showAvailable
//     ? products.filter(({ available }) => available)
//     : products;
//   return (
//     <>
//       <h1>App is ready</h1>
//       {filteredProducts.map((product) => (
//         <Chai key={product.id} product={product} />
//       ))}
//       <button onClick={() => setShowAvailable(!showAvailable)}>
//         {showAvailable ? "Show All Products" : "Show Available Products"}
//       </button>
//     </>
//   );
// }

// export default App;

// const user = {
//   name: "Sumit",
//   age: 31,
//   role: "Frontend Developer",
//   skills: ["Angular", "JavaScript"]
// };

// const { name, role } = user;

// const updateUser = {
//   ...user,
//    skills: [...user.skills, "React"]
// }

// console.log(updateUser)

// const users = [
//   { id: 1, name: "Sumit", role: "Frontend Developer" },
//   { id: 2, name: "Rahul", role: "Backend Developer" },
//   { id: 3, name: "Amit", role: "UI Developer" },
// ];

// const userCards = users.map(({ name, role }) => ({
//   name,
//   designation: role,
// }));

// console.log(userCards);

//   const products = [
//   { id: 1, name: "Laptop", price: 50000 },
//   { id: 2, name: "Mouse", price: 1000 },
//   { id: 3, name: "Keyboard", price: 2000 }
// ];

// const updatedProducts = products.map(({name, price}) => ({
//   name,
//   price,
//   priceWithGST: price + ((18 / 100) * price)
// }));

// console.log(updatedProducts)

// const newUsers = [
//   { id: 1, name: "Sumit", role: "Frontend Developer", active: true },
//   { id: 2, name: "Rahul", role: "Backend Developer", active: false },
//   { id: 3, name: "Amit", role: "UI Developer", active: true },
//   { id: 4, name: "Raj", role: "Tester", active: false }
// ];

// const activeUsers = newUsers.filter(({ active }) => active === true)

// console.log(activeUsers)

// const products = [
//   { id: 1, name: "Laptop", price: 50000, available: true },
//   { id: 2, name: "Mouse", price: 1000, available: false },
//   { id: 3, name: "Keyboard", price: 2000, available: true },
//   { id: 4, name: "Monitor", price: 15000, available: false },
// ];

// const availableProducts = products
//   .filter((item) => item.available === true)
//   .map(({ name }) => name);

// console.log(availableProducts);

{
  /* <Chai addQuantityProperty={addQuantityProperty}/> */
}

//   const userName = "John Doe";

// const [cart, setCart] = useState([
//   {
//     id: 1,
//     name: "iPhone 15",
//     price: 69999
//   },
//   {
//     id: 2,
//     name: "Samsung Galaxy S24",
//     price: 74999
//   },
//   {
//     id: 3,
//     name: "Sony Headphones",
//     price: 12999
//   }
// ]);

// const addQuantityProperty = () => {
//   setCart((prevCart) => {
//     return prevCart.map((item) => {
//       if (item.id === 2) {
//         return {
//           ...item,
//           quantity: (item.quantity || 0) + 1
//         }
//       }
//       return item;
//     })
//   })
// }

// useEffect(() => {
//   console.log(cart);
// }, [cart]);
// const addQuantityProperty = () => {
//   const newProducts = products.map((item) => {
//     return {
//       ...item,
//       quantity: 1
//     }
//   });
//   console.log(newProducts)
// }

// const addQuantityProperty = () => {
//   products = products.map((item) => {
//     if (item.id === 2) {
//       return {
//         ...item,
//         quantity: (item.quantity || 0) + 1
//       };
//     }

//     return item;
//   });

//   console.log(products);
// };
