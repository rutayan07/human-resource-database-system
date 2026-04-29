// Dashboard — overview of HR state

function Dashboard({ employees, archived, onNavigate }) {
  const active = employees.length;
  const available = employees.filter(e => e.availability === 'Available').length;
  const onProject = employees.filter(e => e.availability === 'On Project').length;
  const deptCount = new Set(employees.map(e => e.department)).size;

  // Simple dept breakdown
  const deptBreakdown = DEPARTMENTS.map(d => ({
    dept: d,
    count: employees.filter(e => e.department === d).length,
  })).filter(d => d.count > 0).sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...deptBreakdown.map(d => d.count), 1);

  const recentHires = [...employees].sort((a, b) => b.joinDate.localeCompare(a.joinDate)).slice(0, 5);
  const recentExits = archived.slice(0, 3);

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Welcome back — here's what's happening across your workforce."
        actions={
          <>
            <button className="btn btn-secondary" onClick={() => onNavigate('search')}>
              <IconSearch size={14} /> Search talent
            </button>
            <button className="btn btn-primary" onClick={() => onNavigate('add')}>
              <IconPlus size={14} /> Add employee
            </button>
          </>
        }
      />
      <PageContent>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          <StatTile label="Active employees" value={active} sublabel="across all departments" />
          <StatTile label="Available for projects" value={available} sublabel={`${Math.round(available/active*100)}% of workforce`} accent="var(--accent)" />
          <StatTile label="On active projects" value={onProject} sublabel="deployed to client work" />
          <StatTile label="Departments" value={deptCount} sublabel="active business units" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <div className="h2">Department breakdown</div>
                <div className="tiny" style={{ marginTop: 2 }}>Headcount distribution</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {deptBreakdown.map(d => (
                <div key={d.dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ fontWeight: 500 }}>{d.dept}</span>
                    <span className="mono muted">{d.count}</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      width: `${(d.count / maxCount) * 100}%`,
                      height: '100%', background: 'var(--accent)', borderRadius: 3,
                      transition: 'width 400ms ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <div className="h2">Recent hires</div>
                <div className="tiny" style={{ marginTop: 2 }}>Latest additions to the team</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('employee-amendment')}>
                View all <IconChevronRight size={12} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {recentHires.map((e, i) => (
                <div key={e.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                  borderBottom: i < recentHires.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <Avatar name={`${e.firstName} ${e.lastName}`} size={34} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{e.firstName} {e.lastName}</div>
                    <div className="tiny">{e.designation} · {e.department}</div>
                  </div>
                  <div className="mono tiny" style={{ textAlign: 'right' }}>{e.joinDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: 20, marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div className="h2">Recent exits</div>
              <div className="tiny" style={{ marginTop: 2 }}>Archived employees and exit feedback</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('exit')}>
              Manage <IconChevronRight size={12} />
            </button>
          </div>
          {recentExits.length === 0 ? (
            <div className="tiny">No recent exits.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {recentExits.map(e => (
                <div key={e.id} style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Avatar name={`${e.firstName} ${e.lastName}`} size={28} />
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{e.firstName} {e.lastName}</div>
                      <div className="mono tiny">{e.id}</div>
                    </div>
                  </div>
                  <div className="tiny" style={{ marginBottom: 4 }}>{e.designation} · {e.department}</div>
                  <div className="tiny" style={{ marginBottom: 8 }}>Exited <span className="mono">{e.exitDate}</span></div>
                  <Badge variant="neutral">{e.reason}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageContent>
    </>
  );
}

Object.assign(window, { Dashboard });
