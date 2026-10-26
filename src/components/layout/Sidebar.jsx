import { useAppContext } from "../../context/useAppContext";
import { useState } from "react";

const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
  notes: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  todos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  timer: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3L2 6" />
      <path d="M22 6l-3-3" />
      <line x1="12" y1="1" x2="12" y2="3" />
    </svg>
  ),
};

function Sidebar() {
  const { activePage, setActivePage } = useAppContext();
  const [hoveredItem, setHoveredItem] = useState(null);

  const pages = [
    { id: "dashboard", label: "Dashboard", icon: icons.dashboard },
    { id: "notes", label: "Notes", icon: icons.notes },
    { id: "todos", label: "Todos", icon: icons.todos },
    { id: "timer", label: "Timer", icon: icons.timer },
  ];

  return (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border-subtle)',
        padding: '1.75rem 1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Brand — simple, confident, no gradient badge */}
      <div style={{ padding: '0 0.5rem', marginBottom: '2.5rem' }}>
        <h1
          style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--color-text)',
            lineHeight: 1.2,
          }}
        >
          produc<span style={{ color: 'var(--color-brand)' }}>.</span>
        </h1>
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: '2px',
            display: 'block',
          }}
        >
          your space
        </span>
      </div>

      {/* Nav — clean, no section labels */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {pages.map((page) => {
          const isActive = activePage === page.id;
          const isHovered = hoveredItem === page.id;
          return (
            <button
              key={page.id}
              id={`nav-${page.id}`}
              onClick={() => setActivePage(page.id)}
              onMouseEnter={() => setHoveredItem(page.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.6rem 0.65rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.84rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? 'var(--color-text)'
                  : isHovered
                    ? 'var(--color-text)'
                    : 'var(--color-text-secondary)',
                background: isActive
                  ? 'var(--color-surface-raised)'
                  : 'transparent',
                transition: 'color 0.15s ease, background 0.15s ease',
                textAlign: 'left',
              }}
            >
              <span style={{
                opacity: isActive ? 1 : 0.5,
                transition: 'opacity 0.15s ease',
                display: 'flex',
              }}>
                {page.icon}
              </span>
              {page.label}
              {/* Tiny dot for active — subtle, intentional */}
              {isActive && (
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--color-brand)',
                    marginLeft: 'auto',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom — keyboard hint, not a motivational poster */}
      <div style={{ marginTop: 'auto', padding: '0 0.5rem' }}>
        <div
          style={{
            fontSize: '0.68rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>tip:</span> click a note
          to copy it
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
