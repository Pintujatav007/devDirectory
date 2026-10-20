export default function AlertBanner({ children, onDismiss, variant = 'error', role }) {
  return <div className={`alert alert-${variant}`} role={role || (variant === 'success' ? 'status' : 'alert')}>
    <span className="alert-mark" aria-hidden="true">{variant === 'success' ? '✓' : '!'}</span>
    <span>{children}</span>
    {onDismiss && <button className="alert-dismiss" type="button" onClick={onDismiss} aria-label="Dismiss notification">×</button>}
  </div>;
}
