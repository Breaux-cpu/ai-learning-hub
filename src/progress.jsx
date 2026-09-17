import { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'ai-learning-progress'
const SCORE_KEY = 'ai-learning-scores'
const ProgressCtx = createContext(null)

export function ProgressProvider({ children }) {
  const [done, setDone] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'))
    } catch {
      return new Set()
    }
  })
  const [scores, setScores] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SCORE_KEY) || '{}')
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify([...done]))
  }, [done])

  useEffect(() => {
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores))
  }, [scores])

  const toggle = (id) =>
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const saveScore = (key, score, total) =>
    setScores((prev) => ({ ...prev, [key]: { score, total, at: Date.now() } }))

  const replaceAll = (newDone, newScores) => {
    setDone(new Set(newDone))
    setScores(newScores || {})
  }

  return (
    <ProgressCtx.Provider value={{ done, scores, toggle, saveScore, replaceAll }}>
      {children}
    </ProgressCtx.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressCtx)
}