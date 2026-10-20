import { Link } from 'react-router-dom';

const colors = ['lavender', 'mint', 'peach', 'blue', 'rose', 'lime'];
export default function UserCard({ user, index = 0 }) {
  const initials = user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  return <article className="user-card">
    <div className={`avatar avatar-${colors[index % colors.length]}`} aria-hidden="true">{initials}</div>
    <div className="user-card-main"><div className="user-card-title"><h2>{user.name}</h2><span className="user-id">#{String(user.id).padStart(2, '0')}</span></div><p className="user-handle">@{user.username}</p>
      <div className="user-card-meta"><span className="company-dot" />{user.company?.name || 'Independent'}<span className="meta-divider">·</span>{user.address?.city || 'Remote'}</div>
      <Link className="card-link" to={`/users/${user.id}`}>View profile <span aria-hidden="true">↗</span></Link>
    </div>
  </article>;
}
