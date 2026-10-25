import { Provider } from "react-redux";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { store } from "./store";
import { useState } from "react";

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-xl">
          <header className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Redux Toolkit
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Todo{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Board
              </span>
            </h1>
          </header>

          <AddTodo selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
          <TodoList editTodo={setSelectedTodo} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
