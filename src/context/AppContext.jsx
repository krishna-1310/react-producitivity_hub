import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState("dashboard");

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [focusMinutes, setFocusMinutes] = useState(() => {
  const saved = localStorage.getItem("focusMinutes");
  return saved ? JSON.parse(saved) : 0;
});

const [sessions, setSessions] = useState(() => {
  const saved = localStorage.getItem("sessions");
  return saved ? JSON.parse(saved) : 0;
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