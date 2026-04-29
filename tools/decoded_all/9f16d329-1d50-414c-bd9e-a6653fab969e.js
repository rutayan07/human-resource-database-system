// Employee detail view + amendment (Module 4)

function EmployeeDetail({ employee, onBack, onUpdate, onInitiateExit }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(employee);

  React.useEffect(() => { setDraft(employee); }, [employee]);

  const saveEdit = () => {
    onUpdate(draft);
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(employee);
    setEditing(false);
  };

  const set = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <>
      <Topbar
        breadcrumbs={[
          { label: 'Employee Amendment', onClick: onBack },
          { label: fullName },
        ]}
        title={fullName}
        subtitle={`${employee.designation} · ${employee.department}`}
        actions={
          editing ? (
            <>
              <button className="btn btn-ghost" onClick={cancelEdit}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}><IconCheck size={13} /> Save changes</button>
            </>
          ) : (
            <>
              <button className="btn btn-danger" onClick={() => onInitiateExit(employee.id)}>
                <IconDoor size={13} /> Initiate exit
              </button>
              <button className="btn btn-primary" onClick={() => setEditing(true)}>
                <IconEdit size={13} /> Amend details
              </button>
            </>
          )
        }
      />
      <PageContent>
        {/* Profile header */}
        <div className="card" style={{ padding: 24, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar name={fullName} size={72} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{fullName}</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 6, color: 'var(--ink-3)', fontSize: 13, flexWrap: 'wrap' }}>
              <span className="mono">{employee.id}</span>
              <span>·</span>
              <span>{employee.designation}</span>
              <span>·</span>
              <span>{employee.department}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <Badge variant="success">{employee.status}</Badge>
              {employee.availability === 'Available'
                ? <Badge variant="accent">Available for projects</Badge>
                : <Badge variant="warn">On project · {employee.project}</Badge>}
              <Badge variant="neutral">{employee.empType}</Badge>
              <Badge variant="neutral" >{employee.experience}y experience</Badge>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          {/* Main */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <DetailCard title="Contact">
              <DetailRow icon={<IconMail size={13} />} label="Email">
                {editing ? <input className="input" value={draft.email} onChange={e => set('email', e.target.value)} /> : employee.email}
              </DetailRow>
              <DetailRow icon={<IconPhone size={13} />} label="Phone">
                {editing ? <input className="input" value={draft.phone} onChange={e => set('phone', e.target.value)} /> : employee.phone}
              </DetailRow>
              <DetailRow icon={<IconMapPin size={13} />} label="Address">
                {editing ? <textarea className="textarea" value={draft.address} onChange={e => set('address', e.target.value)} rows={2} /> : employee.address}
              </DetailRow>
            </DetailCard>

            <DetailCard title="Role & employment">
              <DetailRow icon={<IconBriefcase size={13} />} label="Designation">
                {editing ? (
                  <select className="input" value={draft.designation} onChange={e => set('designation', e.target.value)}>
                    {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                ) : employee.designation}
              </DetailRow>
              <DetailRow icon={<IconBuilding size={13} />} label="Department">
                {editing ? (
                  <select className="input" value={draft.department} onChange={e => set('department', e.target.value)}>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                ) : employee.department}
              </DetailRow>
              <DetailRow icon={<IconCalendar size={13} />} label="Joining date">
                <span className="mono">{employee.joinDate}</span>
              </DetailRow>
              <DetailRow label="Years of experience">
                {editing ? (
                  <input className="input" type="number" min="0" max="50" value={draft.experience} onChange={e => set('experience', +e.target.value)} style={{ maxWidth: 120 }} />
                ) : <span className="mono">{employee.experience} years</span>}
              </DetailRow>
              <DetailRow label="Employment type">
                {editing ? (
                  <select className="input" value={draft.empType} onChange={e => set('empType', e.target.value)}>
                    {EMP_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                ) : employee.empType}
              </DetailRow>
            </DetailCard>

            <DetailCard title="Skills & technologies">
              {editing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div className="field">
                    <label>Primary skills</label>
                    <MultiSelect options={TECH_SKILLS} value={draft.skills || []} onChange={v => set('skills', v)} />
                  </div>
                  <div className="field">
                    <label>Domain expertise</label>
                    <MultiSelect options={DOMAINS} value={draft.domains || []} onChange={v => set('domains', v)} />
                  </div>
                  <div className="field">
                    <label>Additional skills & certifications</label>
                    <MultiSelect options={['Mentoring', 'Architecture', 'AWS Certified', 'CKA', 'Scrum Master']} value={draft.additionalSkills || []} onChange={v => set('additionalSkills', v)} />
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Primary skills</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {employee.skills.map(s => <Badge key={s} variant="accent">{s}</Badge>)}
                    </div>
                  </div>
                  {employee.domains?.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Domain expertise</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {employee.domains.map(d => <Badge key={d} variant="neutral">{d}</Badge>)}
                      </div>
                    </div>
                  )}
                  {employee.additionalSkills?.length > 0 && (
                    <div>
                      <div className="tiny" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Additional skills</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {employee.additionalSkills.map(s => <Badge key={s} variant="neutral">{s}</Badge>)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </DetailCard>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <DetailCard title="Current project">
              {employee.project ? (
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{employee.project}</div>
                  <div className="tiny">Allocated since {employee.joinDate}</div>
                  <div className="divider" style={{ margin: '14px 0' }} />
                  <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Reassign</button>
                </div>
              ) : (
                <div>
                  <Badge variant="success">Available</Badge>
                  <div className="tiny" style={{ marginTop: 8 }}>Ready for new project assignment.</div>
                  <div className="divider" style={{ margin: '14px 0' }} />
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>Assign to project</button>
                </div>
              )}
            </DetailCard>

            <DetailCard title="Timeline">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <TimelineItem date={employee.joinDate} title="Joined TeamSync" description={`As ${employee.designation}`} />
                {employee.project && <TimelineItem date="2025-03-14" title={`Assigned to ${employee.project}`} description="Project allocation" />}
                <TimelineItem date="2025-10-01" title="Annual review" description="Performance rating: Exceeds expectations" />
              </div>
            </DetailCard>

            <DetailCard title="Documents">
              <DocRow name="Resume.pdf" size="342 KB" />
              <DocRow name="Offer Letter.pdf" size="180 KB" />
              <DocRow name="AWS Certificate.pdf" size="210 KB" />
            </DetailCard>
          </div>
        </div>
      </PageContent>
    </>
  );
}

function DetailCard({ title, children }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="h3" style={{ marginBottom: 16, letterSpacing: '0.01em' }}>{title}</div>
      {children}
    </div>
  );
}

function DetailRow({ icon, label, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-3)', fontSize: 12 }}>
        {icon}{label}
      </div>
      <div style={{ fontSize: 13 }}>{children}</div>
    </div>
  );
}

function TimelineItem({ date, title, description }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 12, position: 'relative' }}>
      <div style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent)', marginTop: 5, border: '2px solid var(--surface)', boxShadow: '0 0 0 1px var(--accent)' }} />
      <div>
        <div className="mono tiny">{date}</div>
        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{title}</div>
        {description && <div className="tiny" style={{ marginTop: 2 }}>{description}</div>}
      </div>
    </div>
  );
}

function DocRow({ name, size }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: 28, height: 28, borderRadius: 4, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="mono" style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)' }}>PDF</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        <div className="tiny">{size}</div>
      </div>
      <button className="btn btn-ghost btn-sm" style={{ padding: 4 }}><IconDownload size={13} /></button>
    </div>
  );
}

Object.assign(window, { EmployeeDetail });
