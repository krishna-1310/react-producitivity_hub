import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Todos from "./pages/Todos";
import Timer from "./pages/Timer";
import { useAppContext } from "./context/useAppContext";
import "./App.css";

function App() {
  const { activePage } = useAppContext();

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="page-enter" key={activePage}>
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "notes" && <Notes />}
          {activePage === "todos" && <Todos />}
          {activePage === "timer" && <Timer />}
        </div>
      </main>
    </div>
  );
}

export default App;
