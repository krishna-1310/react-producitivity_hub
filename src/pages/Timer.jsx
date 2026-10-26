import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../context/useAppContext";

function Timer() {
  const { setFocusMinutes, setSessions } = useAppContext();

  const [minutesInput, setMinutesInput] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const totalSeconds = minutesInput * 60;

  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(minutesInput * 60);
      setHasFinished(false);
    }
  }, [minutesInput, isRunning]);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft !== 0) return;

    setIsRunning(false);
    setHasFinished(true);
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
    setHasFinished(false);
  }

  // SVG circle progress
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;
  const strokeDashoffset = circumference * (1 - progress);

  // Presets
  const presets = useMemo(() => [
    { label: '15m', value: 15 },
    { label: '25m', value: 25 },
    { label: '45m', value: 45 },
    { label: '60m', value: 60 },
  ], []);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--color-dark-50)',
            marginBottom: '0.5rem',
          }}
        >
          Focus Timer
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-dark-300)' }}>
          Deep work starts here.
        </p>
      </div>

      {/* Presets */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => {
              if (!isRunning) setMinutesInput(preset.value);
            }}
            disabled={isRunning}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              border: `1px solid ${minutesInput === preset.value ? 'rgba(108, 92, 231, 0.4)' : 'rgba(255,255,255,0.08)'}`,
              background: minutesInput === preset.value
                ? 'rgba(108, 92, 231, 0.15)'
                : 'rgba(255,255,255,0.03)',
              color: minutesInput === preset.value ? 'var(--color-accent-300)' : 'var(--color-dark-300)',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isRunning ? 0.5 : 1,
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Timer Ring */}
      <div
        className="glass-card"
        style={{
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
          animation: isRunning ? 'pulse-glow 3s ease-in-out infinite' : 'none',
        }}
      >
        <div style={{ position: 'relative', width: '280px', height: '280px' }}>
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Background track */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke={hasFinished ? 'var(--color-emerald-500)' : 'var(--color-accent-500)'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease',
                filter: `drop-shadow(0 0 8px ${hasFinished ? 'var(--color-emerald-glow)' : 'var(--color-accent-glow)'})`,
              }}
            />
          </svg>

          {/* Center text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            {hasFinished ? (
              <>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🎉</div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-emerald-400)' }}>
                  Well Done!
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-dark-400)', marginTop: '0.25rem' }}>
                  {minutesInput} min session complete
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    color: 'var(--color-dark-50)',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatTime(secondsLeft)}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-dark-400)', marginTop: '0.5rem' }}>
                  {isRunning ? 'Focusing...' : 'Ready to focus'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
        <button
          id="timer-start-btn"
          onClick={() => {
            if (hasFinished) {
              resetTimer();
            } else {
              setIsRunning((r) => !r);
            }
          }}
          style={{
            padding: '0.85rem 2.5rem',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 600,
            fontFamily: 'inherit',
            color: '#fff',
            background: hasFinished
              ? 'linear-gradient(135deg, var(--color-emerald-500), var(--color-cyan-500))'
              : isRunning
              ? 'linear-gradient(135deg, var(--color-amber-500), #f97316)'
              : 'linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-accent-700) 100%)',
            boxShadow: hasFinished
              ? '0 4px 20px var(--color-emerald-glow)'
              : isRunning
              ? '0 4px 20px var(--color-amber-glow)'
              : '0 4px 20px var(--color-accent-glow)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {hasFinished ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Restart
            </>
          ) : isRunning ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Start
            </>
          )}
        </button>

        {(isRunning || (secondsLeft < totalSeconds && !hasFinished)) && (
          <button
            id="timer-reset-btn"
            onClick={resetTimer}
            style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              color: 'var(--color-dark-200)',
              background: 'rgba(255,255,255,0.04)',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Reset
          </button>
        )}
      </div>

      {/* Custom duration input */}
      {!isRunning && !hasFinished && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            marginTop: '1.5rem',
          }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--color-dark-400)' }}>Custom:</span>
          <input
            id="timer-input"
            type="number"
            min="1"
            max="120"
            value={minutesInput}
            onChange={(e) => setMinutesInput(Number(e.target.value))}
            style={{
              width: '60px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '0.4rem 0.5rem',
              color: 'var(--color-dark-100)',
              fontSize: '0.85rem',
              fontFamily: 'inherit',
              textAlign: 'center',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(108, 92, 231, 0.4)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          />
          <span style={{ fontSize: '0.78rem', color: 'var(--color-dark-400)' }}>min</span>
        </div>
      )}
    </div>
  );
}

export default Timer;
