// App shell — sidebar + top bar

function Sidebar({ current, onNavigate, user, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: IconDashboard },
    { id: 'employee-amendment', label: 'Modify Employee Details', icon: IconEdit },
    { id: 'search', label: 'Talent Search', icon: IconSearch },
    { id: 'add', label: 'Add Employee', icon: IconPlus },
    { id: 'exit', label: 'Exit Management', icon: IconDoor },
  ];

  return (
    <aside style={{
      width: 236, background: 'var(--surface)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0, flexShrink: 0,
    }}>
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <IconLogo size={26} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em' }}>TeamSync</div>
          <div className="tiny mono" style={{ marginTop: 0 }}>HR Workspace</div>
        </div>
      </div>

      <div className="divider" />

      <nav style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        <div className="tiny" style={{ padding: '10px 12px 6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10 }}>
          Workspace
        </div>
        {items.map(it => {
          const active = current === it.id;
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => onNavigate(it.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 'var(--radius)',
                fontSize: 13, fontWeight: 500, textAlign: 'left',
                background: active ? 'var(--surface-2)' : 'transparent',
                color: active ? 'var(--ink)' : 'var(--ink-2)',
                transition: 'all 120ms ease',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-2)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={15} />
              <span>{it.label}</span>
              {active && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: 4, background: 'var(--accent)' }} />}
            </button>
          );
        })}

        <div className="tiny" style={{ padding: '20px 12px 6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10 }}>
          Account
        </div>
        <button
          onClick={() => onNavigate('settings')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--ink-2)', fontWeight: 500, textAlign: 'left' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <IconSettings size={15} />
          <span>Settings</span>
        </button>
      </nav>

      <div className="divider" />
      <div style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name={user.name} size={34} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user.name}
          </div>
          <div className="mono tiny" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            @{user.userId}
          </div>
        </div>
        <button
          className="btn btn-ghost"
          style={{ padding: 6 }}
          onClick={onLogout}
          title="Log out"
          aria-label="Log out"
        >
          <IconLogout size={15} />
        </button>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle, actions, breadcrumbs }) {
  return (
    <div style={{
      padding: '24px 32px 20px', borderBottom: '1px solid var(--border)',
      background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 10,
    }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <IconChevronRight size={11} />}
              {b.onClick ? (
                <button onClick={b.onClick} style={{ color: 'inherit', fontSize: 12 }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-3)'}>{b.label}</button>
              ) : <span>{b.label}</span>}
            </React.Fragment>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div>
          <h1 className="h1">{title}</h1>
          {subtitle && <div className="muted" style={{ marginTop: 4, fontSize: 13 }}>{subtitle}</div>}
        </div>
        {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
      </div>
    </div>
  );
}

function PageContent({ children }) {
  return <div style={{ padding: '28px 32px 64px', maxWidth: 1280, margin: '0 auto' }}>{children}</div>;
}

Object.assign(window, { Sidebar, Topbar, PageContent });
