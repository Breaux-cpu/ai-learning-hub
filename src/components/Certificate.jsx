import { useState } from 'react'
import { CURRICULUM } from '../data'
import { useProgress } from '../progress'

export default function Certificate() {
  const { done } = useProgress()
  const [name, setName] = useState('')
  const total = CURRICULUM.length
  const pct = Math.round((done.size / total) * 100)
  const complete = pct === 100
  const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="certificate">
      <p>Complete all {total} modules to earn your certificate. Your progress is tracked automatically.</p>

      <div className="cert-wrap">
        <div className="cert">
          <div className="cert-top">AI LEARNING HUB</div>
          <div className="cert-title">Certificate of Completion</div>
          <div className="cert-sub">This certifies that</div>
          <input
            className="cert-name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="cert-sub">has completed the interactive curriculum</div>
          <div className="cert-course">AI Fundamentals · LLMs · Agents · Security</div>
          <div className="cert-meta">
            <span>{done.size}/{total} modules · {pct}%</span>
            <span>{date}</span>
          </div>
          {complete && <div className="cert-badge">🏆 100% COMPLETE</div>}
        </div>
      </div>

      <div className="cert-actions">
        <button className="btn" onClick={() => window.print()} disabled={!complete}>
          {complete ? '🖨 Print certificate' : `Complete ${total - done.size} more module${total - done.size === 1 ? '' : 's'} to unlock`}
        </button>
      </div>
    </div>
  )
}