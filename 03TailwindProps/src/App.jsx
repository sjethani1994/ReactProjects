import "./App.css";
import Card from "./components/card";

function App() {
  let myObject = {
    username: "chai aur code",
    age: 20,
  };

  let newArray = [1, 2, 3, 4, 5];

  return (
    <>
      <Card
        channel="chai aur code"
        btnText="Learn More"
      />
      <Card
        channel="chai aur react"
        btnText="Learn More React"
      />
    </>
  );
}

export default App;
