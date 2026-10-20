import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/userService';
import { getAllPosts } from '../services/postService';
import AlertBanner from '../components/AlertBanner';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const loadStats = async () => { setError(''); try { const [users, posts] = await Promise.all([getUsers(), getAllPosts()]); setStats({ users: users.length, posts: posts.length }); } catch { setError('Live platform stats are unavailable right now. You can still explore the directory.'); } };
  useEffect(() => { loadStats(); }, []);
  return <main>
    <section className="hero"><div className="hero-grid" />
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" />THE ENGINEERING DIRECTORY</div><h1>Good work starts<br />with <em>good people.</em></h1><p className="hero-description">Discover the people building things, learn from what they share, and bring your team closer together.</p><div className="hero-actions"><Link className="button button-lime" to="/users">Explore the directory <span>↗</span></Link><Link className="text-link hero-secondary" to="/add-post">Share an article <span>→</span></Link></div>
        <div className="hero-footnote"><div className="avatar-stack"><span>LA</span><span>EB</span><span>CL</span><span>+</span></div><span>Curious minds, building together</span></div>
      </div><div className="hero-art" aria-label="Abstract illustration of connected developer profiles"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orbit-center"><span className="orbit-logo">d<span>.</span></span></div><div className="orbit-node node-a"><span>👩🏽‍💻</span></div><div className="orbit-node node-b"><span>👨🏻‍💻</span></div><div className="orbit-node node-c"><span>👩🏼‍💻</span></div><div className="orbit-note"><span className="note-dot"/>People over profiles<br/><small>Built for your team</small></div><span className="spark spark-a">✳</span><span className="spark spark-b">✦</span><span className="art-label">01 / PEOPLE</span></div>
    </section>
    <section className="stats-band"><div className="stats-intro"><span className="eyebrow eyebrow-light">A LITTLE CONTEXT</span><p>Your next great idea<br />could start here.</p></div><div className="stat-item"><span className="stat-value">{stats ? stats.users : <span className="stat-pending">···</span>}</span><span className="stat-label">Developers<br />in the directory</span></div><div className="stat-item"><span className="stat-value">{stats ? stats.posts : <span className="stat-pending">···</span>}</span><span className="stat-label">Ideas shared<br />by the community</span></div><div className="stats-aside">{error ? <><p>Live stats are unavailable.</p><button className="stats-retry" onClick={loadStats}>Try again →</button></> : <p><span className="live-dot"/> Live community data</p>}</div></section>
    <section className="home-bottom"><div><div className="eyebrow"><span className="eyebrow-line"/>A BETTER WAY TO CONNECT</div><h2>Find your people.<br /><em>Find your next idea.</em></h2></div><div className="bottom-right"><p>Meet the engineers behind the work, discover what they are building, and add your perspective to the conversation.</p><Link to="/users" className="text-link">Meet the community <span>→</span></Link></div></section>
    {error && <div className="home-error-mobile"><AlertBanner onDismiss={() => setError('')}>{error}</AlertBanner><button className="button button-quiet" onClick={loadStats}>Retry</button></div>}
  </main>;
}
