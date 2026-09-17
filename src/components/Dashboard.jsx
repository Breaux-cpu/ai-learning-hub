import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CURRICULUM, GROUPS, TOOLS } from '../data'
import { useProgress } from '../progress'

const SCORE_LABELS = {
  exam: 'Mock Exam',
  practice: 'Practice Quiz',
  m36: 'Guardrails quiz',
  m39: 'Chatbot quiz',
  m42: 'History quiz',
}

export default function Dashboard() {
  const { done, scores, replaceAll } = useProgress()
  const fileRef = useRef(null)
  const total = CURRICULUM.length
  const pct = Math.round((done.size / total) * 100)
  const next = CURRICULUM.find((m) => !done.has(m.id))

  let verdict
  if (pct === 100) verdict = '🏆 Complete! You\'ve finished every module.'
  else if (pct >= 60) verdict = '🎉 Strong progress — keep going.'
  else if (pct >= 25) verdict = '👍 Good start — you\'re building momentum.'
  else verdict = '🚀 Let\'s get started.'

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ done: [...done], scores }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-learning-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result)
        if (Array.isArray(data.done)) replaceAll(data.done, data.scores || {})
      } catch {
        /* invalid file */
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const scoreEntries = Object.entries(scores).sort((a, b) => b[1].at - a[1].at)

  return (
    <div className="dashboard">
      <div className="db-hero">
        <h2>Your Progress</h2>
        <p className="db-verdict">{verdict}</p>
        <div className="progress-wrap db-bar"><div className="progress-bar" style={{ width: pct + '%' }}></div></div>
        <p className="db-pct">{done.size} / {total} modules · {pct}%</p>
      </div>

      <div className="grid2">
        <div className="card">
          <h4>Modules by group</h4>
          {GROUPS.map((g) => {
            const mods = CURRICULUM.filter((m) => m.group === g)
            if (!mods.length) return null
            const gDone = mods.filter((m) => done.has(m.id)).length
            const gPct = Math.round((gDone / mods.length) * 100)
            return (
              <div className="db-group" key={g}>
                <div className="db-group-head">
                  <span>{g}</span>
                  <span className="db-group-num">{gDone}/{mods.length}</span>
                </div>
                <div className="tc-bar">
                  <div className="tc-fill" style={{ width: gPct + '%', background: 'var(--accent)' }}></div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="card">
          <h4>Continue learning</h4>
          {next ? (
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              Next up: <strong style={{ color: 'var(--text)' }}>{next.title}</strong>
            </p>
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>All modules complete!</p>
          )}
          <div className="db-links">
            {next && <Link className="btn" to={`/${next.id}`}>▶ Continue →</Link>}
            <Link className="btn ghost" to="/flashcards">🃏 Review flashcards</Link>
          </div>
          <h4 style={{ marginTop: 24 }}>Practice tools</h4>
          <div className="db-tools">
            {TOOLS.map((t) => (
              <Link className="db-tool" to={`/${t.id}`} key={t.id}>
                <span className="db-tool-icon">{t.icon}</span>
                <span>{t.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <h4>Quiz scores</h4>
          {scoreEntries.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>No quizzes graded yet. Try the Mock Exam or Practice Quiz.</p>
          ) : (
            scoreEntries.map(([key, s]) => (
              <div className="db-score" key={key}>
                <span>{SCORE_LABELS[key] || key}</span>
                <span className="db-score-num">{s.score}/{s.total} · {Math.round((s.score / s.total) * 100)}%</span>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h4>Backup & restore</h4>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            Export your progress and quiz scores to a file, or restore them on another browser.
          </p>
          <div className="db-links">
            <button className="btn" onClick={exportData}>⬇ Export progress</button>
            <button className="btn ghost" onClick={() => fileRef.current?.click()}>⬆ Import progress</button>
            <input ref={fileRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={importData} />
          </div>
        </div>
      </div>
    </div>
  )
}