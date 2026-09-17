import { useEffect, useMemo, useState } from 'react'
import { FLASHCARDS } from '../data/flashcards'

const KEY = 'ai-flashcards'
const DAY = 86400000

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export default function Flashcards() {
  const [state, setState] = useState(loadState)
  const [queue, setQueue] = useState([])
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [sessionDone, setSessionDone] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const dueCards = useMemo(() => {
    const now = Date.now()
    const due = FLASHCARDS.filter((c) => !state[c.id] || state[c.id].due <= now)
    return due.length ? due : FLASHCARDS
  }, [state])

  const startSession = () => {
    setQueue(dueCards.map((c) => c.id))
    setIdx(0)
    setFlipped(false)
    setSessionDone(false)
    setSessionCount(0)
  }

  const rate = (rating) => {
    const id = queue[idx]
    const prev = state[id] || { ease: 2.5, interval: 0, reps: 0, due: 0 }
    let { ease, interval, reps } = prev
    if (rating === 'again') {
      reps = 0
      interval = 0
      ease = Math.max(1.3, ease - 0.2)
    } else {
      reps += 1
      if (rating === 'hard') {
        interval = Math.max(1, Math.round(interval * 1.2))
        ease = Math.max(1.3, ease - 0.15)
      } else if (rating === 'good') {
        interval = interval === 0 ? 1 : Math.round(interval * ease)
        ease += 0.05
      } else {
        interval = interval === 0 ? 4 : Math.round(interval * ease * 1.3)
        ease += 0.15
      }
    }
    const next = { ...state, [id]: { ease, interval, reps, due: Date.now() + interval * DAY } }
    setState(next)
    setSessionCount((n) => n + 1)

    const q = [...queue]
    if (rating === 'again') {
      q.push(id)
    }
    q.splice(idx, 1)
    if (q.length === 0) {
      setSessionDone(true)
      setQueue([])
      return
    }
    setQueue(q)
    setIdx(0)
    setFlipped(false)
  }

  const learned = Object.values(state).filter((s) => s.reps > 0).length
  const current = queue[idx] ? FLASHCARDS.find((c) => c.id === queue[idx]) : null

  return (
    <div className="flashcards">
      <div className="fc-stats">
        <span>🃏 {FLASHCARDS.length} cards</span>
        <span>✅ {learned} learned</span>
        <span>📅 {dueCards.length} due now</span>
      </div>

      {!current && !sessionDone && (
        <div className="fc-empty">
          <p>Ready to review? Cards due now will be shown. If none are due, all cards are available.</p>
          <button className="btn" onClick={startSession}>Start session</button>
        </div>
      )}

      {current && (
        <>
          <div className={`fc-card${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className="fc-inner">
              <div className="fc-face fc-front">
                <div className="fc-hint">Click to flip</div>
                <p>{current.front}</p>
              </div>
              <div className="fc-face fc-back">
                <div className="fc-hint">Click to flip back</div>
                <p>{current.back}</p>
              </div>
            </div>
          </div>
          <div className="fc-controls">
            <button className="btn ghost fc-again" onClick={() => rate('again')}>Again</button>
            <button className="btn ghost" onClick={() => rate('hard')}>Hard</button>
            <button className="btn" onClick={() => rate('good')}>Good</button>
            <button className="btn" onClick={() => rate('easy')}>Easy</button>
          </div>
          <p className="fc-progress">Card {idx + 1} of {queue.length} in this session · {sessionCount} rated</p>
        </>
      )}

      {sessionDone && (
        <div className="fc-done">
          <p>🎉 Session complete! You rated {sessionCount} cards.</p>
          <button className="btn" onClick={startSession}>Review again</button>
        </div>
      )}
    </div>
  )
}