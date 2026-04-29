// Reusable UI primitives

function Badge({ children, variant = 'neutral' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

function Avatar({ name, size = 32 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  // deterministic subtle tint per name
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xfff;
  const hue = hash % 360;
  return (
    <div
      className="avatar"
      style={{
        width: size, height: size, fontSize: size * 0.38,
        background: `oklch(0.92 0.02 ${hue})`,
        color: `oklch(0.35 0.04 ${hue})`,
        borderColor: `oklch(0.85 0.02 ${hue})`,
      }}
    >
      {initials}
    </div>
  );
}

function Modal({ open, onClose, title, children, width }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ width: width || 'min(520px, 92vw)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="h2">{title}</div>
          <button className="btn-ghost btn" style={{ padding: 6 }} onClick={onClose} aria-label="Close">
            <IconX size={16} />
          </button>
        </div>
        <div style={{ padding: '20px', overflow: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <IconCheck size={14} />
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

function useToasts() {
  const [toasts, setToasts] = React.useState([]);
  const push = React.useCallback((msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { id, msg }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 2600);
  }, []);
  return [toasts, push];
}

// Chip for multi-select tag inputs
function Chip({ children, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 8px', background: 'var(--accent-soft)', color: 'var(--accent)',
      borderRadius: 4, fontSize: 12, fontWeight: 500,
    }}>
      {children}
      {onRemove && (
        <button onClick={onRemove} style={{ color: 'inherit', display: 'flex' }} aria-label="remove">
          <IconX size={11} />
        </button>
      )}
    </span>
  );
}

function MultiSelect({ options, value, onChange, placeholder = 'Add...' }) {
  const [input, setInput] = React.useState('');
  const [showSuggest, setShowSuggest] = React.useState(false);
  const boxRef = React.useRef();

  const filtered = options.filter(o =>
    o.toLowerCase().includes(input.toLowerCase()) && !value.includes(o)
  ).slice(0, 6);

  const add = (v) => {
    if (!v) return;
    if (!value.includes(v)) onChange([...value, v]);
    setInput('');
  };

  React.useEffect(() => {
    const onDoc = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setShowSuggest(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <div
        className="input"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 40, padding: 6, alignItems: 'center' }}
        onClick={() => { setShowSuggest(true); }}
      >
        {value.map(v => (
          <Chip key={v} onRemove={() => onChange(value.filter(x => x !== v))}>{v}</Chip>
        ))}
        <input
          value={input}
          onChange={e => { setInput(e.target.value); setShowSuggest(true); }}
          onKeyDown={e => {
            if (e.key === 'Enter' && input) { e.preventDefault(); add(input); }
            if (e.key === 'Backspace' && !input && value.length) onChange(value.slice(0, -1));
          }}
          onFocus={() => setShowSuggest(true)}
          placeholder={value.length ? '' : placeholder}
          style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, minWidth: 80, padding: '4px 2px' }}
        />
      </div>
      {showSuggest && filtered.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)', zIndex: 50,
          maxHeight: 200, overflow: 'auto',
        }}>
          {filtered.map(o => (
            <div
              key={o}
              onMouseDown={(e) => { e.preventDefault(); add(o); }}
              style={{ padding: '8px 12px', cursor: 'pointer', fontSize: 13 }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >{o}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// Stat tile for dashboard
function StatTile({ label, value, sublabel, accent }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="tiny" style={{ letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 11 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 600, marginTop: 8, letterSpacing: '-0.01em', color: accent || 'var(--ink)' }}>
        {value}
      </div>
      {sublabel && <div className="tiny" style={{ marginTop: 4 }}>{sublabel}</div>}
    </div>
  );
}

// Empty state
function EmptyState({ title, description, children }) {
  return (
    <div style={{
      textAlign: 'center', padding: '60px 24px', color: 'var(--ink-3)',
      border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)',
      background: 'var(--surface)',
    }}>
      <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 15, marginBottom: 6 }}>{title}</div>
      {description && <div style={{ fontSize: 13, maxWidth: 380, margin: '0 auto 16px' }}>{description}</div>}
      {children}
    </div>
  );
}

Object.assign(window, { Badge, Avatar, Modal, Toast, useToasts, Chip, MultiSelect, StatTile, EmptyState });
