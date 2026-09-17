export default function FlipCard({ icon, title, back }) {
  return (
    <div className="flip">
      <div className="flip-inner">
        <div className="flip-face">
          <div style={{ fontSize: 34, marginBottom: 10 }}>{icon}</div>
          <h4 style={{ margin: 0 }}>{title}</h4>
          <p style={{ color: 'var(--muted)', fontSize: 12, margin: '8px 0 0' }}>Hover to flip</p>
        </div>
        <div className="flip-face flip-back">
          <p style={{ margin: 0 }}>{back}</p>
        </div>
      </div>
    </div>
  )
}