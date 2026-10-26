import { useState, useRef } from "react";
import { useAppContext } from "../context/useAppContext";

function Notes() {
  const { notes, setNotes } = useAppContext();
  const [text, setText] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const textareaRef = useRef(null);

  function addNote() {
    if (text.trim() === "") return;
    setNotes([
      ...notes,
      {
        id: Date.now(),
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setText("");
    textareaRef.current?.focus();
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function copyNote(note) {
    navigator.clipboard?.writeText(note.text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 1200);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addNote();
    }
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
          Notes
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          {notes.length} note{notes.length !== 1 ? 's' : ''} — click to copy
        </p>
      </div>

      {/* Composer — minimal, not a card-in-a-card */}
      <div style={{
        marginBottom: '2rem',
        background: 'var(--color-surface)',
        borderRadius: '10px',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
      }}>
        <textarea
          ref={textareaRef}
          id="note-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type something..."
          rows={3}
          style={{
            width: '100%',
            resize: 'vertical',
            background: 'transparent',
            border: 'none',
            padding: '1rem',
            color: 'var(--color-text)',
            fontSize: '0.88rem',
            fontFamily: 'inherit',
            lineHeight: 1.6,
            outline: 'none',
            minHeight: '80px',
          }}
        />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          borderTop: '1px solid var(--color-border-subtle)',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
            ⌘ + enter
          </span>
          <button
            id="add-note-btn"
            onClick={addNote}
            disabled={!text.trim()}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: text.trim() ? 'var(--color-bg)' : 'var(--color-text-muted)',
              background: text.trim() ? 'var(--color-brand)' : 'var(--color-surface-raised)',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
          >
            save
          </button>
        </div>
      </div>

      {/* Notes — simple list, not a grid of fancy cards */}
      {notes.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          color: 'var(--color-text-muted)',
        }}>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>📝</p>
          <p style={{ fontSize: '0.85rem' }}>start typing above</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => copyNote(note)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '0.9rem 1rem',
                background: 'var(--color-surface)',
                borderRadius: '8px',
                border: '1px solid var(--color-border-subtle)',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '0.86rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {note.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.5rem' }}>
                  {note.time && (
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                      {note.time}
                    </span>
                  )}
                  {copiedId === note.id && (
                    <span style={{
                      fontSize: '0.68rem',
                      color: 'var(--color-done)',
                      fontWeight: 500,
                      animation: 'pop 0.3s ease both',
                    }}>
                      copied!
                    </span>
                  )}
                </div>
              </div>

              {/* Delete — appears faint, gets red on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                style={{
                  padding: '4px',
                  borderRadius: '4px',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.15s ease',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-danger)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
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

export default Notes;