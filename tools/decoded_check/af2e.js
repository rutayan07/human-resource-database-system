// App — top-level router + state

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3A3F5C",
  "bg": "#FAFAF7",
  "density": "comfortable",
  "showExitBanner": false
}/*EDITMODE-END*/;

function splitCsv(value) {
  return String(value || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function EmployeeAmendmentPage({ employees, onUpdate }) {
  const [empId, setEmpId] = React.useState('');
  const [empName, setEmpName] = React.useState('');
  const [empDept, setEmpDept] = React.useState('');

  const [results, setResults] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

  const selected = employees.find(e => e.id === selectedId) || null;

  const [form, setForm] = React.useState({
    address: '',
    phone: '',
    email: '',
    department: '',
    position: '',
    skills: '',
    tools: '',
    experience: '',
    additional: '',
  });

  React.useEffect(() => {
    if (!selected) return;
    setForm({
      address: selected.address || '',
      phone: selected.phone || '',
      email: selected.email || '',
      department: selected.department || '',
      position: selected.designation || '',
      skills: (selected.skills || []).join(', '),
      tools: (selected.additionalSkills || []).join(', '),
      experience: selected.experience === 0 || selected.experience ? String(selected.experience) : '',
      additional: selected.additionalTraining || '',
    });
  }, [selectedId]);

  const doSearch = () => {
    const idQ = empId.trim().toLowerCase();
    const nameQ = empName.trim().toLowerCase();
    const deptQ = empDept.trim().toLowerCase();

    if (!idQ && !nameQ && !deptQ) {
      alert('Enter at least one search field');
      return;
    }

    const next = employees.filter(e => {
      if (idQ && !String(e.id || '').toLowerCase().includes(idQ)) return false;
      if (deptQ && !String(e.department || '').toLowerCase().includes(deptQ)) return false;
      if (nameQ) {
        const full = `${e.firstName || ''} ${e.lastName || ''}`.trim().toLowerCase();
        if (!full.includes(nameQ)) return false;
      }
      return true;
    });

    setResults(next);
    if (next.length === 1) setSelectedId(next[0].id);
    else setSelectedId(null);
  };

  const updateSelected = () => {
    if (!selected) return;

    const updated = {
      ...selected,
      address: form.address,
      phone: form.phone,
      email: form.email,
      department: form.department,
      designation: form.position,
      skills: splitCsv(form.skills),
      additionalSkills: splitCsv(form.tools),
      experience: Number(form.experience) || 0,
      additionalTraining: form.additional,
    };

    onUpdate(updated);
    alert('Employee details updated successfully!');
  };

  return (
    <>
      <Topbar
        title="Employee Biodata Amendment"
        subtitle="Search employees by ID, name, or department and update biodata fields."
      />
      <PageContent>
        <div className="card" style={{ padding: 20, marginBottom: 18 }}>
          <div className="h2" style={{ marginBottom: 4 }}>Search Employee</div>
          <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>Enter at least one field to search.</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div className="field">
              <label>Employee ID</label>
              <input className="input" value={empId} onChange={e => setEmpId(e.target.value)} placeholder="EMP-10001" />
            </div>
            <div className="field">
              <label>Employee Name</label>
              <input className="input" value={empName} onChange={e => setEmpName(e.target.value)} placeholder="First or last name" />
            </div>
            <div className="field">
              <label>Department</label>
              <input className="input" value={empDept} onChange={e => setEmpDept(e.target.value)} placeholder="Engineering" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-primary" onClick={doSearch}>Search</button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setEmpId(''); setEmpName(''); setEmpDept('');
                setResults([]); setSelectedId(null);
              }}
            >Clear</button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="card" style={{ overflow: 'hidden', marginBottom: 18 }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map(e => (
                  <tr key={e.id} onClick={() => setSelectedId(e.id)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Avatar name={`${e.firstName} ${e.lastName}`} size={32} />
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 13 }}>{e.firstName} {e.lastName}</div>
                          <div className="mono tiny">{e.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13 }}>{e.designation}</td>
                    <td style={{ fontSize: 13 }}>{e.department}</td>
                    <td><Badge variant="success">{e.status || 'Active'}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selected && (
          <div className="card" style={{ padding: 20 }}>
            <div className="h2" style={{ marginBottom: 4 }}>Modify Employee Details</div>
            <div className="tiny" style={{ marginBottom: 16 }}>
              Selected: <span className="mono" style={{ color: 'var(--ink)' }}>{selected.id}</span>
              {' '}· {selected.firstName} {selected.lastName}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <textarea className="textarea" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} rows={2} />
              </div>

              <div className="field">
                <label>Phone</label>
                <input className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="field">
                <label>Email</label>
                <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              <div className="field">
                <label>Department</label>
                <input className="input" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
              </div>
              <div className="field">
                <label>Position</label>
                <input className="input" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} />
              </div>

              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Skills & Technologies</label>
                <input className="input" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="React, SQL, Azure..." />
              </div>

              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Tools & Certifications</label>
                <input className="input" value={form.tools} onChange={e => setForm(f => ({ ...f, tools: e.target.value }))} placeholder="Git, AWS CCP..." />
              </div>

              <div className="field">
                <label>Years of Experience</label>
                <input className="input" type="number" min="0" max="50" value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} />
              </div>
              <div className="field">
                <label>Additional Training</label>
                <input className="input" value={form.additional} onChange={e => setForm(f => ({ ...f, additional: e.target.value }))} />
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary" onClick={updateSelected}>Update</button>
            </div>
          </div>
        )}
      </PageContent>
    </>
  );
}

function App() {
  // auth
  const [authed, setAuthed] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('ts_user') || 'null'); } catch { return null; }
  });
  const [authScreen, setAuthScreen] = React.useState('signin');

  // nav
  const [view, setView] = React.useState(() => {
    const v = localStorage.getItem('ts_view') || 'dashboard';
    return v === 'employees' ? 'employee-amendment' : v;
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState(null);
  const [exitTargetId, setExitTargetId] = React.useState(null);

  // data
  const [employees, setEmployees] = React.useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem('ts_employees') || 'null');
      return cached || INITIAL_EMPLOYEES;
    } catch { return INITIAL_EMPLOYEES; }
  });
  const [archived, setArchived] = React.useState(() => {
    try {
      const cached = JSON.parse(localStorage.getItem('ts_archived') || 'null');
      return cached || ARCHIVED_EMPLOYEES;
    } catch { return ARCHIVED_EMPLOYEES; }
  });

  const [toasts, pushToast] = useToasts();

  // Tweaks
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [tweaksEnabled, setTweaksEnabled] = React.useState(false);

  // Apply tweak CSS vars
  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    document.documentElement.style.setProperty('--bg', tweaks.bg);
  }, [tweaks]);

  // Persist
  React.useEffect(() => { localStorage.setItem('ts_view', view); }, [view]);
  React.useEffect(() => { localStorage.setItem('ts_employees', JSON.stringify(employees)); }, [employees]);
  React.useEffect(() => { localStorage.setItem('ts_archived', JSON.stringify(archived)); }, [archived]);
  React.useEffect(() => {
    if (authed) localStorage.setItem('ts_user', JSON.stringify(authed));
    else localStorage.removeItem('ts_user');
  }, [authed]);

  // Tweaks protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksEnabled(true);
      if (e.data?.type === '__deactivate_edit_mode') { setTweaksEnabled(false); setTweaksOpen(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updateTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const nav = (v) => {
    setSelectedEmployeeId(null);
    setExitTargetId(null);
    setView(v === 'employees' ? 'employee-amendment' : v);
  };

  const openEmployee = (id) => {
    setSelectedEmployeeId(id);
    setView('detail');
  };

  const addEmployee = (emp) => {
    setEmployees(prev => [emp, ...prev]);
    pushToast(`Added ${emp.firstName} ${emp.lastName}`);
    nav('employee-amendment');
  };

  const updateEmployee = (emp) => {
    setEmployees(prev => prev.map(e => e.id === emp.id ? emp : e));
    pushToast('Employee details updated');
  };

  const processExit = (empId, exitData) => {
    const emp = employees.find(e => e.id === empId);
    if (!emp) return;
    setEmployees(prev => prev.filter(e => e.id !== empId));
    setArchived(prev => [{
      id: emp.id, firstName: emp.firstName, lastName: emp.lastName,
      designation: emp.designation, department: emp.department,
      experience: emp.experience, status: 'Exited',
      exitDate: exitData.exitDate, reason: exitData.reason, feedback: exitData.feedback,
    }, ...prev]);
    pushToast(`${emp.firstName} ${emp.lastName} archived`);
    nav('dashboard');
  };

  const initiateExit = (empId) => {
    setExitTargetId(empId);
    setView('exit');
  };

  const handleSignIn = (user) => {
    setAuthed(user);
    pushToast(`Welcome, ${user.name}`);
  };

  const handleLogout = () => {
    setAuthed(null);
    setView('dashboard');
    pushToast('Signed out');
  };

  if (!authed) {
    return (
      <>
        {authScreen === 'signin' ? (
          <SignIn onSignIn={handleSignIn} onSwitchToSignUp={() => setAuthScreen('signup')} />
        ) : (
          <SignUp onSignUp={handleSignIn} onSwitchToSignIn={() => setAuthScreen('signin')} />
        )}
        <Toast toasts={toasts} />
      </>
    );
  }

  const selectedEmp = employees.find(e => e.id === selectedEmployeeId);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar current={view} onNavigate={nav} user={authed} onLogout={handleLogout} />
      <main style={{ flex: 1, minWidth: 0 }}>
        {view === 'dashboard' && <Dashboard employees={employees} archived={archived} onNavigate={nav} />}
        {view === 'employee-amendment' && <EmployeeAmendmentPage employees={employees} onUpdate={updateEmployee} />}
        {view === 'search' && <EmployeeList employees={employees} onOpenEmployee={openEmployee} onNavigate={nav} defaultMode="search" />}
        {view === 'add' && <EmployeeForm onSave={addEmployee} onCancel={() => nav('employee-amendment')} existingIds={employees.map(e => e.id)} />}
        {view === 'detail' && selectedEmp && (
          <EmployeeDetail employee={selectedEmp} onBack={() => nav('employee-amendment')} onUpdate={updateEmployee} onInitiateExit={initiateExit} />
        )}
        {view === 'exit' && (
          <ExitManagement employees={employees} archived={archived} onExit={processExit} onBack={() => nav('dashboard')} selectedEmployeeId={exitTargetId} />
        )}
        {view === 'settings' && <SettingsPage user={authed} />}
      </main>
      <Toast toasts={toasts} />

      {tweaksEnabled && (
        <TweaksPanel
          open={tweaksOpen}
          onToggle={() => setTweaksOpen(!tweaksOpen)}
          tweaks={tweaks}
          onChange={updateTweak}
        />
      )}
    </div>
  );
}

function SettingsPage({ user }) {
  return (
    <>
      <Topbar title="Settings" subtitle="Manage your account and workspace preferences." />
      <PageContent>
        <div className="card" style={{ padding: 24, maxWidth: 640 }}>
          <div className="h2" style={{ marginBottom: 16 }}>Account</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <Avatar name={user.name} size={56} />
            <div>
              <div style={{ fontWeight: 500 }}>{user.name}</div>
              <div className="mono tiny">@{user.userId}</div>
            </div>
          </div>
          <div className="divider" style={{ marginBottom: 20 }} />
          <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Security</div>
          <button className="btn btn-secondary">Change password</button>
          <button className="btn btn-secondary" style={{ marginLeft: 8 }}>Enable 2FA</button>
        </div>
      </PageContent>
    </>
  );
}

function TweaksPanel({ open, onToggle, tweaks, onChange }) {
  return (
    <>
      <button
        onClick={onToggle}
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 800,
          background: 'var(--ink)', color: 'white', padding: '10px 14px',
          borderRadius: 'var(--radius)', fontSize: 12, fontWeight: 500,
          boxShadow: 'var(--shadow-lg)', display: 'flex', gap: 6, alignItems: 'center',
        }}
      >
        <IconSettings size={13} /> Tweaks
      </button>
      {open && (
        <div style={{
          position: 'fixed', bottom: 70, right: 20, zIndex: 800,
          width: 260, background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
          padding: 18,
        }}>
          <div className="h3" style={{ marginBottom: 14 }}>Tweaks</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field">
              <label>Accent color</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['#3A3F5C', '#1A1A1A', '#4A6B4A', '#6B4A3A', '#3A5F6B', '#5C3A5F'].map(c => (
                  <button
                    key={c}
                    onClick={() => onChange('accent', c)}
                    style={{
                      width: 28, height: 28, borderRadius: 4, background: c,
                      border: tweaks.accent === c ? '2px solid var(--ink)' : '1px solid var(--border)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="field">
              <label>Background tone</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['#FAFAF7', 'Warm'], ['#F7F8FA', 'Cool'], ['#FFFFFF', 'White'], ['#F4F3EE', 'Cream']].map(([c, l]) => (
                  <button
                    key={c}
                    onClick={() => onChange('bg', c)}
                    style={{
                      flex: 1, padding: '8px 6px', borderRadius: 4, background: c,
                      border: tweaks.bg === c ? '2px solid var(--accent)' : '1px solid var(--border)',
                      fontSize: 11,
                    }}
                  >{l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
