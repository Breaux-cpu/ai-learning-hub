export default function Callout({ variant = 'info', label, children }) {
  const cls = variant === 'info' ? 'callout' : `callout ${variant}`
  return (
    <div className={cls}>
      {label && <div className="label">{label}</div>}
      {children}
    </div>
  )
}