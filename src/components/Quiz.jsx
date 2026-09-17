import { useEffect, useState } from 'react'
import { useProgress } from '../progress'

export default function Quiz({ questions, scoreKey }) {
  const { saveScore } = useProgress()
  const [answers, setAnswers] = useState({})
  const [graded, setGraded] = useState(false)

  const choose = (qi, oi) => {
    if (graded) return
    setAnswers((prev) => ({ ...prev, [qi]: oi }))
  }

  const grade = () => setGraded(true)

  const answeredCount = Object.keys(answers).length
  const score = questions.reduce((s, q, i) => (answers[i] === q.answer ? s + 1 : s), 0)
  const pct = Math.round((score / questions.length) * 100)

  useEffect(() => {
    if (graded && scoreKey) saveScore(scoreKey, score, questions.length)
  }, [graded])
  let verdict
  if (pct === 100) verdict = "🏆 Perfect score. You're ready to ship agentic."
  else if (pct >= 80) verdict = "🎉 Excellent. You've got the fundamentals."
  else if (pct >= 60) verdict = "👍 Solid. Re-read the modules you missed."
  else verdict = "📖 Re-read the modules and try again — you'll get there."

  return (
    <div className="quiz">
      {questions.map((q, qi) => {
        const chosen = answers[qi]
        return (
          <div className="q" key={qi}>
            <div className="qtext">{qi + 1}. {q.q}</div>
            {q.options.map((opt, oi) => {
              let cls = 'opt'
              if (graded) {
                if (oi === q.answer) cls += ' correct'
                else if (oi === chosen) cls += ' wrong'
                cls += ' disabled'
              } else if (chosen === oi) {
                cls += ' selected'
              }
              return (
                <label className={cls} key={oi} onClick={() => choose(qi, oi)}>
                  <input type="radio" name={`q${qi}`} checked={chosen === oi} readOnly />
                  {opt}
                </label>
              )
            })}
            {graded && (
              <div className="q-feedback show">
                <span className="f-text">{chosen === q.answer ? '✅ Correct!' : '❌ Not quite.'}</span>
                <div className="explain">{q.explain}</div>
              </div>
            )}
          </div>
        )
      })}
      <button className="btn" onClick={grade} disabled={graded}>
        {graded ? 'Graded' : `Grade my quiz (${answeredCount}/${questions.length} answered)`}
      </button>
      {graded && (
        <div className="quiz-result">Score: {score}/{questions.length} ({pct}%) — {verdict}</div>
      )}
    </div>
  )
}