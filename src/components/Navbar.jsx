import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/', { replace: true }); };
  return <header className="navbar"><div className="nav-inner">
    <Link className="brand" to="/" aria-label="DevDirectory home"><span className="brand-mark">d<span>.</span></span><span>devdirectory</span></Link>
    <nav className="nav-links" aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink><NavLink to="/users">Developers</NavLink>
      <NavLink className="nav-publish" to="/add-post"><span aria-hidden="true">＋</span> Write a post</NavLink>{isAuthenticated && <NavLink to="/admin">Admin</NavLink>}
    </nav>
    <div className="nav-account">{isAuthenticated ? <><span className="signed-in"><i /> Signed in</span><button className="button button-quiet button-small" onClick={signOut}>Sign out</button></> : <Link className="button button-dark button-small" to="/login">Sign in <span aria-hidden="true">↗</span></Link>}</div>
  </div></header>;
}
