import { useState } from "react";
import { useAppContext } from "../context/useAppContext";

function Todos() {
  const { todos, setTodos } = useAppContext();
  const [text, setText] = useState("");
  const [justCompleted, setJustCompleted] = useState(null);

  const completedCount = todos.filter((t) => t.completed).length;

  function addTodo() {
    if (text.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false },
    ]);
    setText("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo && !todo.completed) {
      setJustCompleted(id);
      setTimeout(() => setJustCompleted(null), 500);
    }
    setTodos(
      todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          marginBottom: '0.3rem',
        }}>
          Todos
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          {todos.length === 0
            ? 'nothing on the list'
            : `${completedCount}/${todos.length} done`
          }
        </p>
      </div>

      {/* Input — inline, simple */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '1.5rem',
      }}>
        <input
          id="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="what's next?"
          style={{
            flex: 1,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: '8px',
            padding: '0.65rem 0.85rem',
            color: 'var(--color-text)',
            fontSize: '0.86rem',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
        />
        <button
          id="add-todo-btn"
          onClick={addTodo}
          disabled={!text.trim()}
          style={{
            padding: '0.65rem 1.1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: text.trim() ? 'var(--color-bg)' : 'var(--color-text-muted)',
            background: text.trim() ? 'var(--color-brand)' : 'var(--color-surface-raised)',
            transition: 'background 0.15s ease, color 0.15s ease',
          }}
        >
          add
        </button>
      </div>

      {/* Progress — just a thin line, not a full card */}
      {todos.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{
            width: '100%',
            height: '3px',
            borderRadius: '99px',
            background: 'var(--color-surface-raised)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%`,
              height: '100%',
              borderRadius: '99px',
              background: 'var(--color-brand)',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      )}

      {/* List */}
      {todos.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          color: 'var(--color-text-muted)',
        }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>✓</p>
          <p style={{ fontSize: '0.85rem' }}>all clear — nice</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.7rem 0.75rem',
                borderRadius: '8px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
                transition: 'border-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
              }}
            >
              {/* Checkbox — custom, with bounce */}
              <button
                onClick={() => toggleTodo(todo.id)}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '5px',
                  border: `1.5px solid ${todo.completed ? 'var(--color-done)' : 'var(--color-border)'}`,
                  background: todo.completed ? 'var(--color-done)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: 0,
                  transition: 'all 0.15s ease',
                  animation: justCompleted === todo.id ? 'checkPop 0.35s ease' : 'none',
                }}
              >
                {todo.completed && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>

              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  flex: 1,
                  fontSize: '0.86rem',
                  color: todo.completed ? 'var(--color-text-muted)' : 'var(--color-text)',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                  lineHeight: 1.4,
                }}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: '4px',
                  borderRadius: '4px',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.15s ease',
                  flexShrink: 0,
                  opacity: 0.4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-danger)';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.opacity = '0.4';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
