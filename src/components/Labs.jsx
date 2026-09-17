import { useState } from 'react'
import { LABS } from '../data/labs'
import CodeBlock from './CodeBlock'

function McqLab({ lab }) {
  const [chosen, setChosen] = useState(null)
  const pick = (i) => {
    if (chosen !== null) return
    setChosen(i)
  }
  return (
    <div className="lab">
      <div className="lab-scenario">{lab.scenario}</div>
      <div className="qtext">{lab.q}</div>
      {lab.options.map((opt, i) => {
        let cls = 'opt'
        if (chosen !== null) {
          if (i === lab.answer) cls += ' correct'
          else if (i === chosen) cls += ' wrong'
          cls += ' disabled'
        } else if (chosen === i) cls += ' selected'
        return (
          <label className={cls} key={i} onClick={() => pick(i)}>
            <input type="radio" name={lab.id} checked={chosen === i} readOnly />
            {opt}
          </label>
        )
      })}
      {chosen !== null && (
        <div className="q-feedback show">
          <span className="f-text">{chosen === lab.answer ? '✅ Correct!' : '❌ Not quite.'}</span>
          <div className="explain">{lab.explain}</div>
        </div>
      )}
    </div>
  )
}

function MultiLab({ lab }) {
  const [checked, setChecked] = useState({})
  const [graded, setGraded] = useState(false)
  const toggle = (i) => {
    if (graded) return
    setChecked((c) => ({ ...c, [i]: !c[i] }))
  }
  const grade = () => setGraded(true)
  const score = lab.options.filter((o, i) => checked[i] === o.correct).length
  return (
    <div className="lab">
      <div className="lab-scenario">{lab.scenario}</div>
      <div className="qtext">{lab.q}</div>
      {lab.options.map((opt, i) => {
        let cls = 'opt'
        if (graded) {
          if (opt.correct) cls += ' correct'
          else if (checked[i]) cls += ' wrong'
          cls += ' disabled'
        } else if (checked[i]) cls += ' selected'
        return (
          <label className={cls} key={i} onClick={() => toggle(i)}>
            <input type="checkbox" checked={!!checked[i]} readOnly />
            {opt.text}
          </label>
        )
      })}
      {!graded && <button className="btn" onClick={grade}>Check my answer</button>}
      {graded && (
        <div className="q-feedback show">
          <span className="f-text">{score === lab.options.length ? '✅ Perfect!' : `✅ ${score}/${lab.options.length} correct`}</span>
          <div className="explain">{lab.explain}</div>
        </div>
      )}
    </div>
  )
}

function RewriteLab({ lab }) {
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [checks, setChecks] = useState({})
  const toggle = (i) => setChecks((c) => ({ ...c, [i]: !c[i] }))
  const score = Object.values(checks).filter(Boolean).length
  return (
    <div className="lab">
      <div className="lab-scenario">{lab.scenario}</div>
      <div className="qtext">The weak prompt: <code>{lab.weakPrompt}</code></div>
      <p style={{ color: 'var(--muted)', fontSize: 13 }}>Rewrite it as a strong prompt below.</p>
      <textarea
        className="lab-textarea"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your improved prompt here…"
      />
      <div className="lab-actions">
        <button className="btn ghost" onClick={() => setRevealed(!revealed)}>
          {revealed ? 'Hide model answer' : 'Reveal model answer'}
        </button>
      </div>
      {revealed && (
        <div className="lab-answer">
          <p><strong>Model answer:</strong></p>
          <CodeBlock code={lab.modelAnswer} />
        </div>
      )}
      <div className="qtext" style={{ marginTop: 16 }}>Self-grade: did your prompt include these?</div>
      {lab.checklist.map((item, i) => (
        <label className={`opt${checks[i] ? ' selected' : ''}`} key={i} onClick={() => toggle(i)}>
          <input type="checkbox" checked={!!checks[i]} readOnly />
          {item}
        </label>
      ))}
      <p className="fc-progress">Checklist score: {score}/{lab.checklist.length}</p>
    </div>
  )
}

export default function Labs() {
  return (
    <div className="labs">
      <p>Interactive prompt-engineering challenges. Each one grades you instantly — no setup, no API keys.</p>
      {LABS.map((lab) => (
        <div className="lab-card" key={lab.id}>
          <div className="section-head"><span className="kicker">LAB {lab.id.replace('lab', '')}</span></div>
          <h3 style={{ margin: '0 0 12px' }}>{lab.title}</h3>
          {lab.type === 'mcq' && <McqLab lab={lab} />}
          {lab.type === 'multi' && <MultiLab lab={lab} />}
          {lab.type === 'rewrite' && <RewriteLab lab={lab} />}
        </div>
      ))}
    </div>
  )
}