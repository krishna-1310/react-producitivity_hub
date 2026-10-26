import { useAppContext } from "../context/useAppContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "burning the midnight oil?";
  if (hour < 12) return "good morning ☀️";
  if (hour < 17) return "good afternoon";
  if (hour < 21) return "good evening";
  return "still going? respect.";
}

function Dashboard() {
  const { notes, todos, focusMinutes, sessions } = useAppContext();

  const completedTodos = todos.filter((t) => t.completed).length;
  const pendingTodos = todos.length - completedTodos;

  return (
    <div>
      {/* Greeting — conversational, changes with time */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)',
          marginBottom: '0.4rem',
          fontWeight: 400,
        }}>
          {getGreeting()}
        </p>
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
        }}>
          Here&apos;s where you&apos;re at
        </h2>
      </div>

      {/* Stats — not 4 identical cards. Intentionally different sizes. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1px',
        background: 'var(--color-border-subtle)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2rem',
      }}>
        <StatCell label="notes" value={notes.length} />
        <StatCell label="pending" value={pendingTodos} />
        <StatCell label="done" value={completedTodos} />
      </div>

      {/* Focus stats — bigger, standalone, feels different from the row above */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        <div style={{
          flex: 1,
          background: 'var(--color-surface)',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid var(--color-border-subtle)',
        }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            focus time
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-brand)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {focusMinutes}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: '4px' }}>min</span>
          </p>
        </div>
        <div style={{
          flex: 1,
          background: 'var(--color-surface)',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid var(--color-border-subtle)',
        }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            sessions
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {sessions}
          </p>
        </div>
      </div>

      {/* Recent stuff — not a "Quick Overview" feed, just recent items */}
      {(notes.length > 0 || todos.length > 0) && (
        <div>
          <h3 style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
          }}>
            recent activity
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
            {[...notes.slice(-2).reverse().map(n => ({ type: 'note', text: n.text, id: n.id })),
              ...todos.slice(-3).reverse().map(t => ({ type: 'todo', text: t.text, done: t.completed, id: t.id }))
            ].slice(0, 4).map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0.7rem 0.9rem',
                  background: 'var(--color-surface)',
                  fontSize: '0.82rem',
                }}
              >
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: item.type === 'note' ? 'var(--color-info)' : item.done ? 'var(--color-done)' : 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  width: '35px',
                  flexShrink: 0,
                }}>
                  {item.type === 'note' ? 'note' : item.done ? 'done' : 'todo'}
                </span>
                <span style={{
                  color: item.done ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textDecoration: item.done ? 'line-through' : 'none',
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {notes.length === 0 && todos.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          color: 'var(--color-text-muted)',
          fontSize: '0.88rem',
        }}>
          <p style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📭</p>
          <p>nothing here yet — go make something</p>
        </div>
      )}
    </div>
  );
}

function StatCell({ label, value }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      padding: '1.25rem',
      textAlign: 'center',
    }}>
      <p style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--color-text)',
        lineHeight: 1,
        marginBottom: '0.3rem',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value}
      </p>
      <p style={{
        fontSize: '0.7rem',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 500,
      }}>
        {label}
      </p>
    </div>
  );
}

export default Dashboard;