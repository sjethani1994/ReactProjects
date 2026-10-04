import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(15);

  const addValue = () => {
    if (counter === 30) {
      alert("Counter value cannot be more than 20");
      return;
    }
    setCounter((prevCounter) => prevCounter + 1);
    setCounter((prevCounter) => prevCounter + 1);
     setCounter((prevCounter) => prevCounter + 1);
      setCounter((prevCounter) => prevCounter + 1);
       setCounter((prevCounter) => prevCounter + 1);
  };
  const removeValue = () => {
    if (counter === 0) {
      alert("Counter value cannot be less than 0");
      return;
    }
    setCounter(counter - 1);
  };
  return (
    <>
      <h1>Chai Aur React</h1>
      <h2>Counter Value : {counter}</h2>
      <button onClick={addValue}>Add Value</button>
      <br></br>
      <button onClick={removeValue}>Remove Value</button>
    </>
  );
}

export default App;
