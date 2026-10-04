import { useState } from "react";

function Button({ name, color, setBackgroundColor }) {
  const [buttonColor, setButtonColor] = useState(color);
  return (
    <button
      className="w-24 h-10 rounded-full"
      style={{ backgroundColor: buttonColor }}
      onClick={() => {
        setButtonColor(color);
        setBackgroundColor(color);
      }}
    >
      {color === "#FFFFFF" ? (
        <span className="text-black">{name}</span>
      ) : (
        <span className="text-white">{name}</span>
      )}
    </button>
  );
}

export default Button;
