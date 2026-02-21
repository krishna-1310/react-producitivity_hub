import { useAppContext } from "../context/useAppContext";

function Dashboard() {
  const { notes, todos, focusMinutes} = useAppContext();


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Notes" value={notes.length} />
        <StatCard title="Todos" value={todos.length} />
        <StatCard title="Focus (minutes)" value={focusMinutes} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default Dashboard;