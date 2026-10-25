import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

function TodoList({ editTodo }) {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">My Todos</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Stay organized and get things done.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
            {todos?.length} Tasks
          </span>
        </div>

        <div className="space-y-2.5">
          {todos?.length === 0 && (
            <div className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-10 text-center">
              <p className="text-3xl">📝</p>
              <p className="mt-2 text-sm font-medium text-slate-600">No todos yet</p>
              <p className="mt-1 text-xs text-slate-400">Add your first task above.</p>
            </div>
          )}

          {todos?.map((item) => (
            <div
              className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-indigo-200 hover:bg-white hover:shadow-md hover:shadow-indigo-100/50"
              key={item.id}
            >
              <input
                type="checkbox"
                className="h-5 w-5 shrink-0 cursor-pointer rounded accent-indigo-600"
              />

              <span className="min-w-0 flex-1 break-words text-sm font-medium text-slate-800">
                {item.text}
              </span>

              <button
                type="button"
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                onClick={() => editTodo(item)}
              >
                Edit
              </button>

              <button
                type="button"
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                onClick={() => deleteTodo(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-xs font-medium text-slate-500">1 of 3 completed</p>

          <button
            type="button"
            className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
