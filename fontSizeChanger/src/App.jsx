import { useState } from "react";
import Button from "./Button";

function App() {
  const themes = [
    {
      name: "Small",
      fontSize: 12,
      bgColor: "#ffffff",
      textColor: "#000000",
    },
    {
      name: "Medium",
      fontSize: 16,
      bgColor: "#ffffff",
      textColor: "#000000",
    },
    {
      name: "Large",
      fontSize: 24,
      bgColor: "#ffffff",
      textColor: "#000000",
    },
    {
      name: "Dark",
      fontSize: 16,
      bgColor: "#000000",
      textColor: "#ffffff",
    },
    {
      name: "Blue",
      fontSize: 16,
      bgColor: "#0000ff",
      textColor: "#ffffff",
    },
    {
      name: "Green",
      fontSize: 16,
      bgColor: "#008000",
      textColor: "#ffffff",
    },
  ];
  const [theme, settheme] = useState(themes[1]);
  return (
    <>
      <div
        className="w-full h-screen flex flex-col items-center justify-center gap-5"
        style={{ backgroundColor: theme.bgColor }}
      >
        <span
          style={{ fontSize: `${theme.fontSize}px`, color: theme.textColor }}
        >
          Hello Change My Font Size
        </span>
        <div className="flex flex-wrap justify-center gap-5 shadow-xl bg-white rounded-3xl p-5">
          {themes.map((item) => (
            <Button
              key={item.name}
              name={item.name}
              fontSize={item.fontSize}
              bgColor={item.bgColor}
              textColor={item.textColor}
              settheme={settheme}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
