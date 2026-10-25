import { useEffect, useState } from "react";
import { addTodo, updateTodo } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";

function AddTodo({ selectedTodo, setSelectedTodo }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setInput(selectedTodo?.text);
    } else {
      setInput("");
    }
  }, [selectedTodo]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (selectedTodo) {
      dispatch(
        updateTodo({
          id: selectedTodo.id,
          text: input.trim(),
        }),
      );
    } else {
      dispatch(addTodo(input.trim()));
    }

    setInput("");
    setSelectedTodo(null);
  };

  return (
    <div className="mb-6">
      <form
        className={`flex w-full gap-2 rounded-2xl border bg-white p-2 shadow-lg shadow-indigo-100/60 transition ${
          selectedTodo
            ? "border-amber-300 ring-4 ring-amber-100"
            : "border-slate-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-100"
        }`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter your todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none"
        />

        <button
          type="submit"
          className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition active:scale-95 sm:px-6 ${
            selectedTodo
              ? "bg-amber-500 shadow-amber-200 hover:bg-amber-600"
              : "bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700"
          }`}
        >
          {selectedTodo ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
