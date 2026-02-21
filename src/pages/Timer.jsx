import { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";

function Timer() {
  const { setFocusMinutes, setSessions } = useAppContext();

  const [minutesInput, setMinutesInput] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Sync input → timer (only when stopped)
  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(minutesInput * 60);
    }
  }, [minutesInput, isRunning]);

  // ✅ Effect 1: ticking ONLY
  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // ✅ Effect 2: handle completion (runs ONCE)
  useEffect(() => {
    if (secondsLeft !== 0) return;

    setIsRunning(false);
    setFocusMinutes((m) => m + minutesInput);
    setSessions((s) => s + 1);
  }, [secondsLeft, minutesInput, setFocusMinutes, setSessions]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(minutesInput * 60);
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Focus Timer
      </h2>

      <div className="flex items-center justify-center gap-3 mb-6">
        <input
          type="number"
          min="1"
          value={minutesInput}
          onChange={(e) => setMinutesInput(Number(e.target.value))}
          className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <span className="text-gray-600">minutes</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-10 text-center mb-8">
        <p className="text-6xl font-bold tracking-wider">
          {formatTime(secondsLeft)}
        </p>
        <p className="text-sm text-gray-500 mt-2">Focus Time</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;