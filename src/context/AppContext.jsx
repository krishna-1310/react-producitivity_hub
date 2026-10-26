import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState("dashboard");

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("notes");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [focusMinutes, setFocusMinutes] = useState(() => {
    try {
      const saved = localStorage.getItem("focusMinutes");
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem("sessions");
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

useEffect(() => {
  localStorage.setItem("focusMinutes", JSON.stringify(focusMinutes));
}, [focusMinutes]);

useEffect(() => {
  localStorage.setItem("sessions", JSON.stringify(sessions));
}, [sessions]);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        notes,
        setNotes,
        todos,
        setTodos,
        sessions,
        setSessions,
        focusMinutes,
        setFocusMinutes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}