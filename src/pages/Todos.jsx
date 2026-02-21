import { useState } from "react";
import { useAppContext } from "../context/useAppContext";

function Todos() {
  const { todos, setTodos } = useAppContext(); 
  const [text, setText] = useState("");

  function addTodo() {
    if (text.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
    setText("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Todos</h2>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo..."
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={addTodo}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add Todo
          </button>
        </div>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between bg-white p-4 rounded-xl shadow-sm ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className="cursor-pointer"
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
