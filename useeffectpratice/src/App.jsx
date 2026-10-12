import { useEffect, useState } from "react";

function App() {
  // const [count, setCount] = useState(1);
  // const [users, setUsers] = useState('')

//  useEffect(() => {
//     fetch(
//       `https://jsonplaceholder.typicode.com/users/${count}`
//     ).then((response) => response.json()).then((json) => setUsers(JSON.stringify(json)))
// }, [count]);

const [mouseX, setMouseX] = useState("");
const [mouseY, setMouseY] = useState("");

useEffect(() => {
  const onMouseMove = (event) => {
    setMouseX(event.clientX);
    setMouseY(event.clientY)
  }

  window.addEventListener("mousemove", onMouseMove);

  return () => {
    window.removeEventListener("mousemove", onMouseMove)
  }
});

  return (
    <>
      <h1 className="text-2xl">{mouseX}, {mouseY}</h1>
      {/* <button className="bg-amber-600 w-xl" >Click me</button> */}
    </>
  );
}

export default App;
