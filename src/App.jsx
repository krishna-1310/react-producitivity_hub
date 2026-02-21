import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Todos from "./pages/Todos";
import Timer from "./pages/Timer";
import { useAppContext } from "./context/useAppContext";

function App() {
  const { activePage } = useAppContext();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "notes" && <Notes />}
        {activePage === "todos" && <Todos />}
        {activePage === "timer" && <Timer />}
      </main>
    </div>
  );
}

export default App;
