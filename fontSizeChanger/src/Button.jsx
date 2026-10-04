function Button({ name, fontSize, settheme, bgColor, textColor }) {
  return (
    <button
      style={{ fontSize: "16px" }}
      className="w-24 h-10 rounded-full bg-blue-500 text-white"
      onClick={() => {
        settheme({ fontSize, bgColor, textColor });
      }}
    >
      {name}
    </button>
  );
}

export default Button;
