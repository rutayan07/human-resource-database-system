// Exit management (Module 5)

function ExitManagement({ employees, archived, onExit, onBack, selectedEmployeeId }) {
  const [selectedId, setSelectedId] = React.useState(selectedEmployeeId || null);
  const [view, setView] = React.useState(selectedEmployeeId ? 'flow' : 'list');
  const [searchId, setSearchId] = React.useState('');
  const [searchName, setSearchName] = React.useState('');

  React.useEffect(() => {
    if (selectedEmployeeId) {
      setSelectedId(selectedEmployeeId);
      setView('flow');
    }
  }, [selectedEmployeeId]);

  const selected = employees.find(e => e.id === selectedId);

  const nameQuery = searchName.trim().toLowerCase();
  const idQuery = searchId.trim().toLowerCase();

  const scoredEmployees = employees
    .map((emp, idx) => {
      const id = String(emp.id || '').toLowerCase();
      const fullName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim().toLowerCase();

      let score = 0;
      if (idQuery) {
        if (id === idQuery) score += 200;
        else if (id.startsWith(idQuery)) score += 120;
        else if (id.includes(idQuery)) score += 60;
      }
      if (nameQuery) {
        if (fullName === nameQuery) score += 200;
        else if (fullName.startsWith(nameQuery)) score += 120;
        else if (fullName.includes(nameQuery)) score += 60;
      }
      return { emp, score, fullName, id, idx };
    })
    .sort((a, b) => (b.score - a.score) || (a.idx - b.idx));

  if (view === 'flow' && selected) {
    return <ExitFlow employee={selected} onComplete={(data) => { onExit(selected.id, data); setView('list'); setSelectedId(null); }} onCancel={() => { setView('list'); setSelectedId(null); }} />;
  }

  return (
    <>
      <Topbar
        title="Employee Exit"
        subtitle="Process employee exits, collect feedback, and maintain archives."
      />
      <PageContent>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div className="h2">Active employees</div>
                <div className="tiny" style={{ marginTop: 2 }}>Select an employee to initiate exit</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div className="field">
                <label>Employee ID</label>
                <input className="input" value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="EMP-10001" />
              </div>
              <div className="field">
                <label>Employee Name</label>
                <input className="input" value={searchName} onChange={e => setSearchName(e.target.value)} placeholder="Anika Bhatt" />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', maxHeight: 500, overflow: 'auto' }}>
              {scoredEmployees.map(({ emp: e }) => (
                <button
                  key={e.id}
                  onClick={() => { setSelectedId(e.id); setView('flow'); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 8px', borderBottom: '1px solid var(--border)',
                    textAlign: 'left', borderRadius: 0,
                    transition: 'background 100ms ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <Avatar name={`${e.firstName} ${e.lastName}`} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{e.firstName} {e.lastName}</div>
                    <div className="tiny">{e.designation} · {e.department}</div>
                  </div>
                  <IconChevronRight size={14} style={{ color: 'var(--ink-3)' }} />
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div className="h2" style={{ marginBottom: 14 }}>Exit archive</div>
            <div className="tiny" style={{ marginBottom: 14 }}>Historical records of employees who have left the organization.</div>
            {archived.length === 0 ? (
              <EmptyState title="No exits yet" description="Employees who leave will appear here for reference." />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {archived.map(e => (
                  <div key={e.id} style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface-2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                      <Avatar name={`${e.firstName} ${e.lastName}`} size={32} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{e.firstName} {e.lastName}</div>
                        <div className="tiny mono">{e.id} · {e.designation}</div>
                      </div>
                      <Badge variant="neutral">Exited</Badge>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-2)', marginBottom: 8, fontStyle: 'italic' }}>
                      "{e.feedback}"
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="tiny mono">Exit: {e.exitDate}</div>
                      <Badge variant="neutral">{e.reason}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContent>
    </>
  );
}

function ExitFlow({ employee, onComplete, onCancel }) {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    exitDate: new Date().toISOString().slice(0, 10),
    reason: '',
    feedback: '',
    rating: 5,
    wouldReturn: 'maybe',
    confirm: false,
  });
  const [errors, setErrors] = React.useState({});

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const reasons = [
    'Resignation — Career Growth',
    'Resignation — Relocation',
    'Resignation — Personal',
    'Contract End',
    'Termination',
    'Retirement',
    'Other',
  ];

  const next = () => {
    const e = {};
    if (step === 1) {
      if (!data.exitDate) e.exitDate = 'Required';
      if (!data.reason) e.reason = 'Required';
    }
    if (step === 2) {
      if (!data.feedback.trim()) e.feedback = 'Please share exit feedback';
    }
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(step + 1);
  };

  const finalize = () => {
    if (!data.confirm) { setErrors({ confirm: 'Please confirm to archive' }); return; }
    onComplete(data);
  };

  return (
    <>
      <Topbar
        breadcrumbs={[
          { label: 'Employee Exit', onClick: onCancel },
          { label: `${employee.firstName} ${employee.lastName}` },
          { label: 'Initiate Exit' },
        ]}
        title="Initiate employee exit"
        subtitle={`Process exit for ${employee.firstName} ${employee.lastName} (${employee.id}).`}
        actions={<button className="btn btn-ghost" onClick={onCancel}>Cancel</button>}
      />
      <PageContent>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
          <aside style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={`${employee.firstName} ${employee.lastName}`} size={40} />
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{employee.firstName} {employee.lastName}</div>
                  <div className="mono tiny">{employee.id}</div>
                </div>
              </div>
              <div className="divider" style={{ margin: '12px 0' }} />
              <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--ink-2)' }}>
                <div>{employee.designation}</div>
                <div>{employee.department} · {employee.experience}y</div>
                <div className="mono tiny">Joined {employee.joinDate}</div>
              </div>
            </div>

            <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, padding: '0 4px' }}>Exit steps</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Exit details', 'Feedback', 'Review & archive'].map((s, i) => {
                const n = i + 1;
                const done = step > n; const active = step === n;
                return (
                  <div key={s} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                    borderRadius: 'var(--radius)',
                    background: active ? 'var(--surface-2)' : 'transparent',
                    color: active || done ? 'var(--ink)' : 'var(--ink-3)',
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 600,
                      background: done ? 'var(--accent)' : active ? 'var(--ink)' : 'transparent',
                      color: done || active ? 'white' : 'var(--ink-3)',
                      border: active || done ? 'none' : '1px solid var(--border-strong)',
                    }}>{done ? <IconCheck size={11} /> : n}</div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s}</div>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="card" style={{ padding: 28 }}>
            {step === 1 && (
              <>
                <div className="h2" style={{ marginBottom: 4 }}>Exit details</div>
                <div className="muted" style={{ fontSize: 13, marginBottom: 24 }}>When and why is this employee leaving?</div>
                <FormGrid>
                  <FormField label="Exit date" error={errors.exitDate}>
                    <input className="input" type="date" value={data.exitDate} onChange={e => set('exitDate', e.target.value)} />
                  </FormField>
                  <FormField label="Reason for leaving" error={errors.reason}>
                    <select className="input" value={data.reason} onChange={e => set('reason', e.target.value)}>
                      <option value="">Select reason</option>
                      {reasons.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </FormField>
                </FormGrid>
              </>
            )}
            {step === 2 && (
              <>
                <div className="h2" style={{ marginBottom: 4 }}>Exit feedback</div>
                <div className="muted" style={{ fontSize: 13, marginBottom: 24 }}>Collected anonymously for organizational learning.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <FormField label="Overall experience rating">
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1,2,3,4,5].map(n => (
                        <button
                          key={n}
                          onClick={() => set('rating', n)}
                          style={{
                            width: 42, height: 42, borderRadius: 'var(--radius)',
                            border: '1px solid ' + (data.rating === n ? 'var(--accent)' : 'var(--border)'),
                            background: data.rating === n ? 'var(--accent-soft)' : 'var(--surface)',
                            color: data.rating === n ? 'var(--accent)' : 'var(--ink-2)',
                            fontWeight: 600, fontSize: 14,
                          }}
                        >{n}</button>
                      ))}
                    </div>
                  </FormField>
                  <FormField label="Exit feedback" error={errors.feedback} hint="What went well? What could have been better?">
                    <textarea className="textarea" value={data.feedback} onChange={e => set('feedback', e.target.value)} rows={5} placeholder="Share thoughts on team culture, growth opportunities, leadership..." />
                  </FormField>
                  <FormField label="Would return to TeamSync?">
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[['yes', 'Yes, absolutely'], ['maybe', 'Maybe'], ['no', 'No']].map(([v, l]) => (
                        <button
                          key={v}
                          onClick={() => set('wouldReturn', v)}
                          style={{
                            flex: 1, padding: '10px 14px', borderRadius: 'var(--radius)',
                            border: '1px solid ' + (data.wouldReturn === v ? 'var(--accent)' : 'var(--border)'),
                            background: data.wouldReturn === v ? 'var(--accent-soft)' : 'var(--surface)',
                            color: data.wouldReturn === v ? 'var(--accent)' : 'var(--ink-2)',
                            fontSize: 13, fontWeight: 500,
                          }}
                        >{l}</button>
                      ))}
                    </div>
                  </FormField>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="h2" style={{ marginBottom: 4 }}>Review & archive</div>
                <div className="muted" style={{ fontSize: 13, marginBottom: 24 }}>Confirm details before archiving the employee record.</div>

                <div style={{ background: 'var(--surface-2)', padding: 18, borderRadius: 'var(--radius)', marginBottom: 20 }}>
                  <ReviewRow label="Employee" value={`${employee.firstName} ${employee.lastName} (${employee.id})`} />
                  <ReviewRow label="Exit date" value={data.exitDate} />
                  <ReviewRow label="Reason" value={data.reason} />
                  <ReviewRow label="Rating" value={`${data.rating} / 5`} />
                  <ReviewRow label="Feedback" value={data.feedback} />
                  <ReviewRow label="Would return" value={data.wouldReturn} last />
                </div>

                <div style={{ padding: 14, border: '1px solid var(--warn-soft)', background: 'var(--warn-soft)', borderRadius: 'var(--radius)', fontSize: 12, color: 'var(--warn)', marginBottom: 14 }}>
                  <strong>System actions on confirm:</strong> record will be archived, employee removed from active resource search, and historical data preserved for future reference.
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer' }}>
                  <input type="checkbox" checked={data.confirm} onChange={e => set('confirm', e.target.checked)} />
                  <span>I confirm this employee exit and authorize archival.</span>
                </label>
                {errors.confirm && <div className="hint" style={{ color: 'var(--danger)', marginTop: 6 }}>{errors.confirm}</div>}
              </>
            )}

            <div className="divider" style={{ margin: '28px 0 20px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                <IconArrowLeft size={13} /> Back
              </button>
              {step < 3 ? (
                <button className="btn btn-primary" onClick={next}>Continue <IconArrowRight size={13} /></button>
              ) : (
                <button className="btn btn-danger" onClick={finalize}><IconDoor size={13} /> Confirm exit</button>
              )}
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}

function ReviewRow({ label, value, last }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '120px 1fr',
      padding: '8px 0', borderBottom: last ? 'none' : '1px solid var(--border)',
      fontSize: 13, gap: 16,
    }}>
      <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <div>{value}</div>
    </div>
  );
}

Object.assign(window, { ExitManagement });
