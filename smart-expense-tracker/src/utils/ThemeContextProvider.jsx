import React, { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState({ isDark: false });

  const toggleTheme = () => {
    setTheme((prev) => ({ isDark: !prev.isDark }));
  };

  // Side effect: sync the <html> class whenever the theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme.isDark);
  }, [theme.isDark]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
