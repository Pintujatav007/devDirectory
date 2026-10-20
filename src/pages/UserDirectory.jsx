import { useEffect, useMemo, useState } from 'react';
import UserCard from '../components/UserCard';
import SkeletonLoader from '../components/SkeletonLoader';
import AlertBanner from '../components/AlertBanner';
import useDebounce from '../hooks/useDebounce';
import { getUsers } from '../services/userService';

export default function UserDirectory() {
  const [users, setUsers] = useState([]); const [query, setQuery] = useState(''); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const loadUsers = async () => { setLoading(true); setError(''); try { setUsers(await getUsers()); } catch { setError('We couldn’t load the directory. Check your connection and try again.'); } finally { setLoading(false); } };
  useEffect(() => { loadUsers(); }, []);
  const filtered = useMemo(() => { const term = debouncedQuery.trim().toLowerCase(); return term ? users.filter((u) => `${u.name} ${u.company?.name || ''}`.toLowerCase().includes(term)) : users; }, [users, debouncedQuery]);
  return <main className="page-shell"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/>PEOPLE, NOT JUST PROFILES</div><h1>Developer <em>directory</em></h1><p className="page-lede">Get to know the people behind the code.</p></div><div className="directory-count"><span>{loading ? '—' : String(filtered.length).padStart(2, '0')}</span><small>{filtered.length === 1 ? 'developer' : 'developers'}</small></div></div>
    <div className="directory-toolbar"><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search developers by name or company" type="search" placeholder="Search by name or company…" value={query} onChange={(e) => setQuery(e.target.value)}/>{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}<kbd>⌘ K</kbd></label><p>Browse developers across your team <span>↘</span></p></div>
    {error && <AlertBanner onDismiss={() => setError('')}><span>{error} </span><button className="alert-action" onClick={loadUsers}>Try again</button></AlertBanner>}
    {loading ? <SkeletonLoader count={6}/> : !error && filtered.length ? <section className="user-grid" aria-label="Developers">{filtered.map((user, i) => <UserCard key={user.id} user={user} index={i}/>)}</section> : !error && <div className="empty-state"><span className="empty-icon">⌕</span><h2>No developers found</h2><p>Try a different name or company, or clear your search.</p><button className="button button-dark" onClick={() => setQuery('')}>Clear search</button></div>}
  </main>;
}
