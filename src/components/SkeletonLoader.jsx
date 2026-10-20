export default function SkeletonLoader({ count = 6, variant = 'card' }) {
  return <div className={`skeleton-grid ${variant === 'line' ? 'skeleton-lines' : ''}`} aria-label="Loading" role="status">
    <span className="sr-only">Loading content…</span>
    {Array.from({ length: count }, (_, i) => <div className="skeleton-card" key={i}><i /><b /><b /><b /></div>)}
  </div>;
}
