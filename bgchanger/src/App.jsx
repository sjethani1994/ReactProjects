import { useState } from "react";
import Button from "./Button";

function App() {
  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#008000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Sky Blue", hex: "#87CEEB" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#808080" },
    { name: "Lime", hex: "#00FF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Indigo", hex: "#4B0082" },
    { name: "Teal", hex: "#008080" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Hot Pink", hex: "#FF69B4" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Royal Blue", hex: "#4169E1" },
  ];

  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="fixed flex flex-wrap justify-center gap-5 bottom-12 insert-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-5 shadow-xl bg-white rounded-3xl p-5">
          {colors.map((color) => (
            <Button
              key={color.hex}
              name={color.name}
              color={color.hex}
              setBackgroundColor={setBackgroundColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
