import { useState, useMemo } from "react";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mouse", price: 1000 },
  { id: 3, name: "Keyboard", price: 2000 },
  { id: 4, name: "Monitor", price: 12000 },
];

function App() {
  const [count, setCount] = useState(0);
  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => total + product.price, 0);
  }, []);

  return (
    <>
      <h1>Counter: {count}</h1>

      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>

      <h1>totalPrice: {totalPrice}</h1>
    </>
  );
}

export default App;
