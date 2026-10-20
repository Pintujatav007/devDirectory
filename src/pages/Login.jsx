import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { isAuthenticated, login } = useAuth(); const location = useLocation(); const navigate = useNavigate(); const [name, setName] = useState('Team lead');
  if (isAuthenticated) return <Navigate to="/" replace/>;
  const from = location.state?.from; const destination = from ? `${from.pathname || '/'}${from.search || ''}${from.hash || ''}` : '/';
  const signIn = (e) => { e.preventDefault(); login({ name: name.trim() || 'Team lead' }); navigate(destination, { replace: true }); };
  return <main className="login-page"><section className="login-card"><div className="login-symbol">d<span>.</span></div><div className="eyebrow"><span className="eyebrow-line"/>YOUR TEAM, IN ONE PLACE</div><h1>Welcome <em>back.</em></h1><p>Sign in to share an idea with your engineering community.</p><form onSubmit={signIn}><label className="field-label" htmlFor="display-name">Your name</label><input id="display-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required/><button type="submit" className="button button-dark login-submit">Continue to DevDirectory <span>↗</span></button></form><div className="login-note"><span>✳</span> This is a demo sign-in. No password needed.</div><Link className="back-link" to="/">← Back to overview</Link></section><div className="login-art"><span className="login-art-label">A COMMUNITY OF BUILDERS</span><div className="login-art-core">d<span>.</span></div><span className="login-art-copy">Good work starts<br/>with good people.</span><span className="login-art-spark">✳</span></div></main>;
}
