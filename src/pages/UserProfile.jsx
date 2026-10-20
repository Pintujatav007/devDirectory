import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../services/userService';
import { getPosts } from '../services/postService';
import AlertBanner from '../components/AlertBanner';
import SkeletonLoader from '../components/SkeletonLoader';
import { INDIA_ENGLISH_POSTS } from '../data/indiaEnglishPosts';

export default function UserProfile() {
  const { id } = useParams(); const [user, setUser] = useState(null); const [posts, setPosts] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [notFound, setNotFound] = useState(false);
  const load = useCallback(async () => { setLoading(true); setError(''); setNotFound(false); try { const [profile, articles] = await Promise.all([getUser(id), getPosts(id)]); if (!profile?.id) { setNotFound(true); return; } setUser(profile); setPosts(articles.map((post) => ({ ...post, ...(INDIA_ENGLISH_POSTS[post.id] || {}) }))); } catch (e) { if (e.response?.status === 404) setNotFound(true); else setError('We couldn’t load this profile. Please check your connection and retry.'); } finally { setLoading(false); } }, [id]);
  useEffect(() => { load(); }, [load]);
  if (loading) return <main className="page-shell"><SkeletonLoader count={2} variant="line"/></main>;
  if (notFound) return <main className="page-shell"><div className="empty-state"><span className="empty-icon">?</span><h1>Developer not found</h1><p>That profile doesn’t exist or may have moved.</p><Link className="button button-dark" to="/users">Back to directory</Link></div></main>;
  if (error) return <main className="page-shell"><AlertBanner>{error} <button className="alert-action" onClick={load}>Retry</button></AlertBanner><Link className="back-link" to="/users">← Back to directory</Link></main>;
  const initials = user.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  return <main className="page-shell profile-page"><Link className="back-link" to="/users">← All developers</Link><section className="profile-card"><div className="profile-top"><div className="avatar avatar-lavender avatar-large">{initials}</div><div className="profile-identity"><span className="eyebrow">DEVELOPER PROFILE · #{user.id}</span><h1>{user.name}</h1><p>@{user.username}</p></div><a className="button button-quiet profile-email" href={`mailto:${user.email}`}>✉ &nbsp;Contact</a></div><div className="profile-details"><div><span className="detail-label">COMPANY</span><strong>{user.company?.name || 'Independent'}</strong><small>{user.company?.catchPhrase || 'Building great things.'}</small></div><div><span className="detail-label">LOCATION</span><strong>{user.address?.city || 'Remote'}</strong><small>{user.address?.street ? `${user.address.street}, ${user.address.zipcode}` : 'Location not listed'}</small></div><div><span className="detail-label">WEBSITE</span><strong>{user.website || 'Not listed'}</strong><small>{user.phone || 'Contact details not listed'}</small></div></div></section>
    <section className="posts-section"><div className="section-title"><div><div className="eyebrow"><span className="eyebrow-line"/>SHARED BY {user.name.split(' ')[0].toUpperCase()}</div><h2>Ideas & articles</h2></div><span className="post-count">{posts.length} {posts.length === 1 ? 'POST' : 'POSTS'}</span></div>{posts.length ? <div className="post-list">{posts.map((post, i) => <article className="post-card" key={post.id}><span className="post-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{post.title}</h3><p>{post.body}</p></div><span className="post-arrow">↗</span></article>)}</div> : <div className="empty-inline">No articles shared yet.</div>}</section>
  </main>;
}
