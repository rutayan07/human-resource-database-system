// Employee list + search + filters (Module 3)

function EmployeeList({ employees, onOpenEmployee, onNavigate, defaultMode }) {
  const [query, setQuery] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(true);
  const [filters, setFilters] = React.useState({
    department: 'All',
    minExp: 0,
    empType: 'All',
    availability: 'All',
    skills: [],
  });

  const filtered = employees.filter(e => {
    const q = query.trim().toLowerCase();
    if (q) {
      const hay = [
        e.id, e.firstName, e.lastName, e.designation, e.department,
        ...(e.skills || []), ...(e.domains || []),
      ].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.department !== 'All' && e.department !== filters.department) return false;
    if (filters.empType !== 'All' && e.empType !== filters.empType) return false;
    if (filters.availability !== 'All' && e.availability !== filters.availability) return false;
    if (e.experience < filters.minExp) return false;
    if (filters.skills.length && !filters.skills.every(s => e.skills.includes(s))) return false;
    return true;
  });

  const isSearchMode = defaultMode === 'search';
  const pageTitle = isSearchMode ? 'Employee Search' : 'Employees';
  const pageSub = isSearchMode
    ? 'Find the right HR resources to assign to projects in under 5 seconds.'
    : `${employees.length} active employees across your organization.`;

  return (
    <>
      <Topbar
        title={pageTitle}
        subtitle={pageSub}
        actions={
          <button className="btn btn-primary" onClick={() => onNavigate('add')}>
            <IconPlus size={14} /> Add employee
          </button>
        }
      />
      <PageContent>
        <div style={{ display: 'grid', gridTemplateColumns: filterOpen ? '260px 1fr' : '1fr', gap: 20 }}>
          {filterOpen && (
            <aside className="card" style={{ padding: 18, height: 'fit-content', position: 'sticky', top: 110 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <IconFilter size={14} />
                  <div className="h3">Filters</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setFilters({
                  department: 'All', minExp: 0, empType: 'All', availability: 'All', skills: [],
                })}>Reset</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="field">
                  <label>Department</label>
                  <select className="select input" value={filters.department} onChange={e => setFilters(f => ({ ...f, department: e.target.value }))}>
                    <option>All</option>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label>Employment type</label>
                  <select className="select input" value={filters.empType} onChange={e => setFilters(f => ({ ...f, empType: e.target.value }))}>
                    <option>All</option>
                    {EMP_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label>Availability</label>
                  <select className="select input" value={filters.availability} onChange={e => setFilters(f => ({ ...f, availability: e.target.value }))}>
                    <option>All</option>
                    <option>Available</option>
                    <option>On Project</option>
                  </select>
                </div>

                <div className="field">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label>Min. experience</label>
                    <span className="mono tiny">{filters.minExp}y+</span>
                  </div>
                  <input
                    type="range" min="0" max="15" value={filters.minExp}
                    onChange={e => setFilters(f => ({ ...f, minExp: +e.target.value }))}
                    style={{ width: '100%', accentColor: 'var(--accent)' }}
                  />
                </div>

                <div className="field">
                  <label>Tech skills (must-have)</label>
                  <MultiSelect
                    options={TECH_SKILLS}
                    value={filters.skills}
                    onChange={v => setFilters(f => ({ ...f, skills: v }))}
                    placeholder="React, AWS..."
                  />
                </div>
              </div>
            </aside>
          )}

          <div>
            <div style={{
              display: 'flex', gap: 10, alignItems: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '4px 4px 4px 14px', borderRadius: 'var(--radius-lg)', marginBottom: 14,
            }}>
              <IconSearch size={15} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, ID, skill, designation..."
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', padding: '10px 0', fontSize: 14 }}
                autoFocus={isSearchMode}
              />
              {query && (
                <button className="btn btn-ghost btn-sm" onClick={() => setQuery('')}>
                  <IconX size={13} />
                </button>
              )}
              <button className="btn btn-secondary btn-sm" onClick={() => setFilterOpen(!filterOpen)}>
                <IconFilter size={13} /> {filterOpen ? 'Hide' : 'Show'} filters
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div className="tiny">
                <span className="mono" style={{ color: 'var(--ink)', fontWeight: 500 }}>{filtered.length}</span>
                {' '}of {employees.length} employees
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-ghost btn-sm"><IconDownload size={12} /> Export</button>
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 60 }}>
                  <EmptyState title="No matches found" description="Try adjusting your filters or search query.">
                    <button className="btn btn-secondary" onClick={() => { setQuery(''); setFilters({ department: 'All', minExp: 0, empType: 'All', availability: 'All', skills: [] }); }}>Reset all</button>
                  </EmptyState>
                </div>
              ) : (
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Skills</th>
                      <th>Exp.</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(e => (
                      <tr key={e.id} onClick={() => onOpenEmployee(e.id)}>
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
                        <td>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 240 }}>
                            {e.skills.slice(0, 3).map(s => <Badge key={s} variant="neutral">{s}</Badge>)}
                            {e.skills.length > 3 && <Badge variant="neutral">+{e.skills.length - 3}</Badge>}
                          </div>
                        </td>
                        <td className="mono" style={{ fontSize: 13 }}>{e.experience}y</td>
                        <td>
                          {e.availability === 'Available'
                            ? <Badge variant="success">Available</Badge>
                            : <Badge variant="warn">On Project</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}

Object.assign(window, { EmployeeList });
