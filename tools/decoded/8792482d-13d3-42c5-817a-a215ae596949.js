// Auth screens — Sign In, Sign Up

function AuthShell({ children, title, subtitle }) {
  return (
    <div style={{
      minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
      background: 'var(--bg)',
    }}>
      {/* Left — brand panel */}
      <div style={{
        background: 'var(--ink)', color: 'white',
        padding: '48px 56px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <IconLogo size={32} />
          <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>TeamSync</div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 34, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: 420 }}>
            The HR database built for fast-moving IT teams.
          </div>
          <div style={{ marginTop: 20, fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 380, lineHeight: 1.6 }}>
            Centralize biodata, search talent by skillset in seconds, and manage the
            full employee lifecycle — hiring through exit.
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 28, color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
            <div>
              <div className="mono" style={{ color: 'white', fontSize: 22, fontWeight: 500 }}>248</div>
              <div style={{ marginTop: 2 }}>Active employees</div>
            </div>
            <div>
              <div className="mono" style={{ color: 'white', fontSize: 22, fontWeight: 500 }}>34</div>
              <div style={{ marginTop: 2 }}>Departments</div>
            </div>
            <div>
              <div className="mono" style={{ color: 'white', fontSize: 22, fontWeight: 500 }}>5s</div>
              <div style={{ marginTop: 2 }}>Avg. search time</div>
            </div>
          </div>
        </div>

        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
          v2.4.0 · secure by design
        </div>

        {/* decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* Right — form */}
      <div style={{
        padding: '48px 56px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', maxWidth: 520, margin: '0 auto', width: '100%',
      }}>
        <div style={{ marginBottom: 32 }}>
          <div className="h1" style={{ fontSize: 28 }}>{title}</div>
          <div className="muted" style={{ marginTop: 8, fontSize: 14 }}>{subtitle}</div>
        </div>
        {children}
      </div>
    </div>
  );
}

function SignIn({ onSignIn, onSwitchToSignUp }) {
  const [userId, setUserId] = React.useState('hr.admin');
  const [password, setPassword] = React.useState('teamsync2026');
  const [showPw, setShowPw] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!userId || !password) { setError('User ID and password are required'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignIn({ userId, name: userId.split('.').map(s => s[0].toUpperCase() + s.slice(1)).join(' ') });
    }, 700);
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign i to your TeamSync workspace.">
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="field">
          <label>User ID</label>
          <input className="input" value={userId} onChange={e => setUserId(e.target.value)} placeholder="e.g. hr.admin" autoFocus />
        </div>

        <div className="field">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>Password</label>
            <a href="#" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }} onClick={e => e.preventDefault()}>Forgot?</a>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              className="input"
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', display: 'flex' }}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </button>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: 'var(--ink-2)' }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
          Keep me signed in on this device
        </label>

        {error && (
          <div style={{ fontSize: 12, color: 'var(--danger)', background: 'var(--danger-soft)', padding: '8px 12px', borderRadius: 'var(--radius)' }}>
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 8 }} disabled={loading}>
          {loading ? 'Signing in…' : <>Sign in <IconArrowRight size={14} /></>}
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-3)', marginTop: 12 }}>
          New to TeamSync?{' '}
          <a href="#" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}
             onClick={e => { e.preventDefault(); onSwitchToSignUp(); }}>
            Create an account
          </a>
        </div>
      </form>
    </AuthShell>
  );
}

function SignUp({ onSignUp, onSwitchToSignIn }) {
  const [form, setForm] = React.useState({
    name: '', email: '', contact: '', address: '', userId: '', password: '', confirm: '',
  });
  const [showPw, setShowPw] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [agree, setAgree] = React.useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^[^@]+@[^@]+\.[a-z]{2,}$/i.test(form.email)) e.email = 'Valid email required';
    if (!/^[+\d\s\-()]{7,}$/.test(form.contact)) e.contact = 'Valid contact required';
    if (!form.address.trim()) e.address = 'Required';
    if (!/^[a-z0-9._-]{3,}$/i.test(form.userId)) e.userId = 'Min 3 chars, letters/numbers/._-';
    if (form.password.length < 8) e.password = 'Enter Password';
    if (form.confirm !== form.password) e.confirm = 'Does not match';
    if (!agree) e.agree = 'Required';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignUp({ userId: form.userId, name: form.name });
    }, 800);
  };

  const fieldProps = (k) => ({
    value: form[k], onChange: ev => set(k, ev.target.value),
    className: 'input', style: errors[k] ? { borderColor: 'var(--danger)' } : {},
  });

  return (
    <AuthShell title="Create your account" subtitle="Set up your HR workspace in under a minute.">
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label>Full name</label>
          <input {...fieldProps('name')} placeholder="Jane Cooper" />
          {errors.name && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.name}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="field">
            <label>Email</label>
            <input {...fieldProps('email')} type="email" placeholder="jane@company.com" />
            {errors.email && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.email}</div>}
          </div>
          <div className="field">
            <label>Contact number</label>
            <input {...fieldProps('contact')} placeholder="+91 98XXX XXXXX" />
            {errors.contact && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.contact}</div>}
          </div>
        </div>

        <div className="field">
          <label>Address</label>
          <input {...fieldProps('address')} placeholder="Street, city, PIN" />
          {errors.address && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.address}</div>}
        </div>

        <div className="field">
          <label>User ID</label>
          <input {...fieldProps('userId')} placeholder="jane.cooper" />
          {errors.userId && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.userId}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="field">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input {...fieldProps('password')} type={showPw ? 'text' : 'password'} placeholder="Enter Password" style={{ ...fieldProps('password').style, paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', display: 'flex' }}>
                {showPw ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            </div>
            {errors.password && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.password}</div>}
          </div>
          <div className="field">
            <label>Confirm password</label>
            <input {...fieldProps('confirm')} type={showPw ? 'text' : 'password'} />
            {errors.confirm && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.confirm}</div>}
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--ink-2)', marginTop: 4 }}>
          <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 2 }} />
          <span>I agree to the <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--accent)' }}>Terms of Service</a> and <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--accent)' }}>Privacy Policy</a>.</span>
        </label>
        {errors.agree && <div className="hint" style={{ color: 'var(--danger)' }}>{errors.agree}</div>}

        <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 4 }} disabled={loading}>
          {loading ? 'Creating account…' : <>Create account <IconArrowRight size={14} /></>}
        </button>

        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-3)', marginTop: 8 }}>
          Already have an account?{' '}
          <a href="#" style={{ color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}
             onClick={e => { e.preventDefault(); onSwitchToSignIn(); }}>
            Sign in
          </a>
        </div>
      </form>
    </AuthShell>
  );
}

Object.assign(window, { SignIn, SignUp });
