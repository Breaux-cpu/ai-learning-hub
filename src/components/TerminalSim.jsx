import { useEffect, useRef, useState } from 'react'

export default function TerminalSim({ script }) {
  const bodyRef = useRef(null)
  const [running, setRunning] = useState(false)
  const idxRef = useRef(0)
  const runningRef = useRef(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const typeLine = (line) => {
    const el = document.createElement('div')
    el.className = line.type
    if (line.type === 'prompt') el.innerHTML = '<span class="prompt">$ </span>'
    bodyRef.current.appendChild(el)
    const text = line.text
    let i = 0
    const cursor = document.createElement('span')
    cursor.className = 'cursor'
    el.appendChild(cursor)
    const iv = setInterval(() => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor)
        i++
      } else {
        clearInterval(iv)
        cursor.remove()
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight
      }
    }, 8)
  }

  const step = () => {
    if (idxRef.current >= script.length) {
      runningRef.current = false
      setRunning(false)
      return
    }
    const line = script[idxRef.current]
    idxRef.current += 1
    const delay = line.type === 'cmd' ? 500 : line.type === 'out' ? 250 : 300
    timers.current.push(
      setTimeout(() => {
        typeLine(line)
        if (runningRef.current) step()
      }, delay)
    )
  }

  const play = () => {
    if (runningRef.current) {
      runningRef.current = false
      setRunning(false)
      return
    }
    runningRef.current = true
    setRunning(true)
    step()
  }

  const reset = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    runningRef.current = false
    setRunning(false)
    idxRef.current = 0
    if (bodyRef.current) bodyRef.current.innerHTML = ''
  }

  return (
    <div className="term">
      <div className="term-bar">
        <span className="term-dot" style={{ background: '#ff5f56' }}></span>
        <span className="term-dot" style={{ background: '#ffbd2e' }}></span>
        <span className="term-dot" style={{ background: '#27c93f' }}></span>
        <span className="t">opencode — simulated session</span>
      </div>
      <div className="term-body" ref={bodyRef}></div>
      <div className="term-controls">
        <button onClick={play}>{running ? '⏸ Pause' : idxRef.current === 0 ? '▶ Play' : '▶ Resume'}</button>
        <button onClick={reset}>↺ Reset</button>
      </div>
    </div>
  )
}