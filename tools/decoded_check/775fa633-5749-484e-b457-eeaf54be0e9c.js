// Add employee form (Module 2)

function EmployeeForm({ onSave, onCancel, existingIds }) {
  const genId = () => {
    let n; do { n = 'EMP-' + (10000 + Math.floor(Math.random() * 90000)); } while (existingIds.includes(n));
    return n;
  };

  const [form, setForm] = React.useState({
    id: genId(), firstName: '', lastName: '', dob: '', gender: 'Female',
    email: '', phone: '', address: '',
    designation: '', department: '', joinDate: new Date().toISOString().slice(0, 10),
    experience: 0, empType: 'Full-time',
    skills: [], domains: [], additionalSkills: [],
    availability: 'Available',
  });
  const [step, setStep] = React.useState(1);
  const [errors, setErrors] = React.useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required';
      if (!form.lastName.trim()) e.lastName = 'Required';
      if (!form.dob) e.dob = 'Required';
      if (!/^[^@]+@[^@]+\.[a-z]{2,}$/i.test(form.email)) e.email = 'Valid email required';
      if (!/^[+\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Valid phone required';
      if (!form.address.trim()) e.address = 'Required';
    }
    if (s === 2) {
      if (!form.designation) e.designation = 'Required';
      if (!form.department) e.department = 'Required';
      if (!form.joinDate) e.joinDate = 'Required';
      if (form.experience < 0 || form.experience > 50) e.experience = 'Invalid';
    }
    if (s === 3) {
      if (form.skills.length === 0) e.skills = 'Add at least one skill';
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(step + 1);
  };

  const save = () => {
    const allErrors = { ...validateStep(1), ...validateStep(2), ...validateStep(3) };
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) {
      onSave({ ...form, status: 'Active', project: null });
    }
  };

  const steps = ['Personal', 'Professional', 'Skills & Expertise'];

  return (
    <>
      <Topbar
        breadcrumbs={[
          { label: 'Employee Amendment', onClick: onCancel },
          { label: 'Add Employee' },
        ]}
        title="Add a new employee"
        subtitle="Collect personal, professional, and skill details during onboarding."
        actions={
          <>
            <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save & finish</button>
          </>
        }
      />
      <PageContent>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }}>
          {/* Step indicator */}
          <aside style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Progress</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {steps.map((s, i) => {
                const n = i + 1;
                const done = step > n;
                const active = step === n;
                return (
                  <button
                    key={s}
                    onClick={() => setStep(n)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', borderRadius: 'var(--radius)',
                      background: active ? 'var(--surface-2)' : 'transparent',
                      color: active || done ? 'var(--ink)' : 'var(--ink-3)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 600,
                      background: done ? 'var(--accent)' : active ? 'var(--ink)' : 'var(--surface-2)',
                      color: done || active ? 'white' : 'var(--ink-3)',
                      border: active || done ? 'none' : '1px solid var(--border-strong)',
                    }}>
                      {done ? <IconCheck size={11} /> : n}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 24, padding: 14, background: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
              <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Employee ID</div>
              <div className="mono" style={{ fontSize: 14, fontWeight: 500 }}>{form.id}</div>
              <div className="tiny" style={{ marginTop: 4 }}>Auto-generated</div>
            </div>
          </aside>

          <div className="card" style={{ padding: 28 }}>
            {step === 1 && <StepPersonal form={form} set={set} errors={errors} />}
            {step === 2 && <StepProfessional form={form} set={set} errors={errors} />}
            {step === 3 && <StepSkills form={form} set={set} errors={errors} />}

            <div className="divider" style={{ margin: '28px 0 20px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn btn-secondary" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
                <IconArrowLeft size={13} /> Previous
              </button>
              {step < 3 ? (
                <button className="btn btn-primary" onClick={next}>
                  Continue <IconArrowRight size={13} />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={save}>
                  <IconCheck size={13} /> Save employee
                </button>
              )}
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}

function FormGrid({ children, cols = 2 }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>{children}</div>;
}

function FormField({ label, error, children, hint, full }) {
  return (
    <div className="field" style={full ? { gridColumn: '1 / -1' } : {}}>
      <label>{label}</label>
      {children}
      {error && <div className="hint" style={{ color: 'var(--danger)' }}>{error}</div>}
      {!error && hint && <div className="hint">{hint}</div>}
    </div>
  );
}

function StepPersonal({ form, set, errors }) {
  return (
    <>
      <div className="h2" style={{ marginBottom: 4 }}>Personal details</div>
      <div className="muted" style={{ fontSize: 13, marginBottom: 24 }}>Basic identity and contact information.</div>
      <FormGrid>
        <FormField label="First name" error={errors.firstName}>
          <input className="input" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
        </FormField>
        <FormField label="Last name" error={errors.lastName}>
          <input className="input" value={form.lastName} onChange={e => set('lastName', e.target.value)} />
        </FormField>
        <FormField label="Date of birth" error={errors.dob}>
          <input className="input" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
        </FormField>
        <FormField label="Gender">
          <select className="input" value={form.gender} onChange={e => set('gender', e.target.value)}>
            <option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
          </select>
        </FormField>
        <FormField label="Email" error={errors.email}>
          <input className="input" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
        </FormField>
        <FormField label="Contact number" error={errors.phone}>
          <input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98XXX XXXXX" />
        </FormField>
        <FormField label="Address" error={errors.address} full>
          <textarea className="textarea" value={form.address} onChange={e => set('address', e.target.value)} rows={2} />
        </FormField>
      </FormGrid>
    </>
  );
}

function StepProfessional({ form, set, errors }) {
  return (
    <>
      <div className="h2" style={{ marginBottom: 4 }}>Professional details</div>
      <div className="muted" style={{ fontSize: 13, marginBottom: 24 }}>Role, department, and employment terms.</div>
      <FormGrid>
        <FormField label="Designation" error={errors.designation}>
          <select className="input" value={form.designation} onChange={e => set('designation', e.target.value)}>
            <option value="">Select designation</option>
            {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
          </select>
        </FormField>
        <FormField label="Department" error={errors.department}>
          <select className="input" value={form.department} onChange={e => set('department', e.target.value)}>
            <option value="">Select department</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </FormField>
        <FormField label="Date of joining" error={errors.joinDate}>
          <input className="input" type="date" value={form.joinDate} onChange={e => set('joinDate', e.target.value)} />
        </FormField>
        <FormField label="Years of experience" error={errors.experience}>
          <input className="input" type="number" min="0" max="50" value={form.experience} onChange={e => set('experience', +e.target.value)} />
        </FormField>
        <FormField label="Employment type">
          <select className="input" value={form.empType} onChange={e => set('empType', e.target.value)}>
            {EMP_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </FormField>
      </FormGrid>
    </>
  );
}

function StepSkills({ form, set, errors }) {
  return (
    <>
      <div className="h2" style={{ marginBottom: 4 }}>Skills &amp; expertise</div>
      <div className="muted" style={{ fontSize: 13, marginBottom: 24 }}>What can this person do? Used for talent search and project allocation.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <FormField label="Technologies & primary skills" error={errors.skills} hint="Press Enter to add custom skills not in the list.">
          <MultiSelect options={TECH_SKILLS} value={form.skills} onChange={v => set('skills', v)} placeholder="Type a skill..." />
        </FormField>
        <FormField label="Domain expertise">
          <MultiSelect options={DOMAINS} value={form.domains} onChange={v => set('domains', v)} placeholder="FinTech, HealthTech..." />
        </FormField>
        <FormField label="Additional skills (tools, certifications, training)">
          <MultiSelect options={['Mentoring', 'Architecture', 'Public Speaking', 'Workshops', 'AWS Solutions Architect', 'CKA', 'Scrum Master', 'PMP']} value={form.additionalSkills} onChange={v => set('additionalSkills', v)} placeholder="AWS Certified, Mentoring..." />
        </FormField>
        <FormField label="CV / Resume" hint="Drop file or click to upload. PDF, DOCX accepted.">
          <div style={{
            border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius)',
            padding: 24, textAlign: 'center', color: 'var(--ink-3)', background: 'var(--surface-2)', cursor: 'pointer',
          }}>
            <IconDownload size={18} style={{ transform: 'rotate(180deg)', marginBottom: 6 }} />
            <div style={{ fontSize: 13 }}>Drop CV here or click to browse</div>
            <div className="tiny" style={{ marginTop: 4 }}>Max 5MB · PDF, DOCX</div>
          </div>
        </FormField>
      </div>
    </>
  );
}

Object.assign(window, { EmployeeForm });
