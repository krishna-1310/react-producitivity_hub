import { useAppContext } from "../../context/useAppContext";

function Sidebar() {
  const { activePage, setActivePage } = useAppContext();

  const pages = [
    { id: "dashboard", label: "Dashboard" },
    { id: "notes", label: "Notes" },
    { id: "todos", label: "Todos" },
    { id: "timer", label: "Timer" },
  ];

  return (
    <aside className="w-56 bg-gray-900 text-white p-6">
      <h1 className="text-xl font-semibold mb-8">Productivity</h1>

      <nav className="flex flex-col gap-2">
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            className={`text-left px-3 py-2 rounded-md transition ${
              activePage === page.id
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }`}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
