import { createContext, useContext } from "react";

export const TodoContext = createContext(null);

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodo must be used inside TodoContextProvider");
  return ctx;
};

export const TodoContextProvider = TodoContext.Provider;
