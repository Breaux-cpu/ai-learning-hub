import { useMemo, useState } from 'react'
import { GLOSSARY } from '../data/glossary'

const CATS = ['All', 'ML', 'LLMs', 'Prompting', 'Agents', 'Eval', 'Security', 'Multimodal', 'Production', 'Ethics']

export default function Glossary() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY.filter((g) => {
      const inCat = cat === 'All' || g.cat === cat
      const inQuery = !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q)
      return inCat && inQuery
    }).sort((a, b) => a.term.localeCompare(b.term))
  }, [query, cat])

  return (
    <div className="glossary">
      <p>{GLOSSARY.length} terms across the whole curriculum. Search or filter by category.</p>

      <div className="gl-controls">
        <input
          className="gl-search"
          type="text"
          placeholder="Search terms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="gl-cats">
          {CATS.map((c) => (
            <button
              key={c}
              className={`gl-cat${cat === c ? ' active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="gl-list">
        {filtered.length === 0 && <p style={{ color: 'var(--muted)' }}>No terms match.</p>}
        {filtered.map((g) => (
          <div className="gl-item" key={g.term}>
            <div className="gl-term">
              <strong>{g.term}</strong>
              <span className="gl-cat-tag">{g.cat}</span>
            </div>
            <p>{g.def}</p>
          </div>
        ))}
      </div>
    </div>
  )
}