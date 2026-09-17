import { useState } from 'react'
import { PROMPTS } from '../data/prompts'

const CATEGORIES = ['All', ...new Set(PROMPTS.map((p) => p.category))]

export default function PromptLibrary() {
  const [cat, setCat] = useState('All')
  const [copied, setCopied] = useState(null)

  const list = cat === 'All' ? PROMPTS : PROMPTS.filter((p) => p.category === cat)

  const copy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="promptlib">
      <p>Ready-to-use prompts, organized by job. Copy one, fill in the brackets, and go.</p>

      <div className="pl-cats">
        {CATEGORIES.map((c) => (
          <button key={c} className={`pl-cat${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="pl-grid">
        {list.map((p) => (
          <div className="card pl-card" key={p.id}>
            <div className="pl-head">
              <span className="kicker">{p.category}</span>
              <button className="copy-btn" onClick={() => copy(p.id, p.prompt)}>
                {copied === p.id ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <h4>{p.title}</h4>
            <pre className="pl-prompt"><code>{p.prompt}</code></pre>
          </div>
        ))}
      </div>
    </div>
  )
}