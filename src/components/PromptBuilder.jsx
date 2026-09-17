import { useMemo, useState } from 'react'

const CONSTRAINT_OPTIONS = [
  'Make a minimal change',
  'Follow existing code style',
  'No new dependencies',
  'No over-engineering / no abstractions unless needed',
  'Do NOT add comments unless asked',
]

const VERIFY_OPTIONS = [
  'Run the test suite and paste results',
  'Run lint and typecheck',
  'Show me the diff',
  'Explain each change and why',
]

export default function PromptBuilder() {
  const [goal, setGoal] = useState('')
  const [symptom, setSymptom] = useState('')
  const [constraints, setConstraints] = useState({})
  const [verifies, setVerifies] = useState({})
  const [done, setDone] = useState('')
  const [copied, setCopied] = useState(false)

  const toggle = (setter, key) => setter((c) => ({ ...c, [key]: !c[key] }))

  const prompt = useMemo(() => {
    const parts = []
    if (goal.trim()) parts.push(`Goal: ${goal.trim()}`)
    if (symptom.trim()) parts.push(`Symptom: ${symptom.trim()}`)
    const cons = CONSTRAINT_OPTIONS.filter((_, i) => constraints[i])
    if (cons.length) parts.push(`Constraints:\n${cons.map((c) => `- ${c}`).join('\n')}`)
    const vers = VERIFY_OPTIONS.filter((_, i) => verifies[i])
    if (vers.length) parts.push(`Verify:\n${vers.map((v) => `- ${v}`).join('\n')}`)
    if (done.trim()) parts.push(`Done when: ${done.trim()}`)
    return parts.join('\n\n')
  }, [goal, symptom, constraints, verifies, done])

  const score = useMemo(() => {
    let s = 0
    if (goal.trim()) s++
    if (symptom.trim()) s++
    if (Object.values(constraints).some(Boolean)) s++
    if (Object.values(verifies).some(Boolean)) s++
    if (done.trim()) s++
    return s
  }, [goal, symptom, constraints, verifies, done])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="promptbuilder">
      <p>Assemble a strong prompt from the five ingredients. The score shows how complete it is — aim for 5/5.</p>

      <div className="grid2">
        <div className="card">
          <h4>1. Build it</h4>
          <label className="tc-label">Goal — what should be true when done</label>
          <textarea className="lab-textarea" rows={2} value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. Add a dark mode toggle to the settings page" />

          <label className="tc-label">Symptom — what's wrong now, with specifics</label>
          <textarea className="lab-textarea" rows={3} value={symptom} onChange={(e) => setSymptom(e.target.value)} placeholder="e.g. When a user uploads a file with an apostrophe in the name, the app crashes with a 500." />

          <label className="tc-label">Constraints</label>
          {CONSTRAINT_OPTIONS.map((c, i) => (
            <label className={`opt${constraints[i] ? ' selected' : ''}`} key={i} onClick={() => toggle(setConstraints, i)}>
              <input type="checkbox" checked={!!constraints[i]} readOnly />
              {c}
            </label>
          ))}

          <label className="tc-label">Verification</label>
          {VERIFY_OPTIONS.map((v, i) => (
            <label className={`opt${verifies[i] ? ' selected' : ''}`} key={i} onClick={() => toggle(setVerifies, i)}>
              <input type="checkbox" checked={!!verifies[i]} readOnly />
              {v}
            </label>
          ))}

          <label className="tc-label">Done when</label>
          <textarea className="lab-textarea" rows={2} value={done} onChange={(e) => setDone(e.target.value)} placeholder="e.g. All tests pass and the diff is reviewed" />
        </div>

        <div className="card">
          <h4>2. Your prompt</h4>
          <div className="pb-score">
            Strength: <strong>{score}/5</strong>
            <div className="tc-bar"><div className="tc-fill" style={{ width: (score / 5) * 100 + '%', background: score === 5 ? 'var(--accent2)' : 'var(--accent)' }}></div></div>
          </div>
          <pre className="pb-preview">
            <button className="copy-btn" onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
            <code>{prompt || 'Start filling the fields — your prompt appears here.'}</code>
          </pre>
          {score === 5 && (
            <div className="callout good" style={{ margin: '12px 0 0' }}>
              <div className="label">Ready to ship</div>
              This prompt has all five ingredients. Paste it into your agent.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}