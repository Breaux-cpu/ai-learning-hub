import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CURRICULUM, GROUPS, TOOLS } from '../data'
import { GLOSSARY } from '../data/glossary'
import { FLASHCARDS } from '../data/flashcards'

export default function Search() {
  const [q, setQ] = useState('')

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return null
    const hit = (s) => s.toLowerCase().includes(term)

    const modules = CURRICULUM.filter((m) => hit(m.title) || hit(m.kicker) || hit(m.group))
    const groups = GROUPS.filter((g) => hit(g))
    const tools = TOOLS.filter((t) => hit(t.title))
    const glossary = GLOSSARY.filter((g) => hit(g.term) || hit(g.def))
    const cards = FLASHCARDS.filter((f) => hit(f.front) || hit(f.back))

    return { modules, groups, tools, glossary, cards }
  }, [q])

  return (
    <div className="search">
      <p>Search modules, tools, glossary terms, and flashcards.</p>
      <input
        className="search-input"
        type="text"
        placeholder="Try 'agent', 'injection', 'RAG'…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
      />

      {results && (
        <div className="search-results">
          {results.modules.length > 0 && (
            <div className="search-group">
              <h4>Modules ({results.modules.length})</h4>
              {results.modules.map((m) => (
                <Link className="search-item" to={`/${m.id}`} key={m.id}>
                  <span className="kicker">{m.kicker}</span>
                  <strong>{m.title}</strong>
                  <span className="muted">{m.group}</span>
                </Link>
              ))}
            </div>
          )}

          {results.tools.length > 0 && (
            <div className="search-group">
              <h4>Tools ({results.tools.length})</h4>
              {results.tools.map((t) => (
                <Link className="search-item" to={`/${t.id}`} key={t.id}>
                  <span>{t.icon}</span>
                  <strong>{t.title}</strong>
                </Link>
              ))}
            </div>
          )}

          {results.groups.length > 0 && (
            <div className="search-group">
              <h4>Groups ({results.groups.length})</h4>
              {results.groups.map((g) => (
                <div className="search-item" key={g}>
                  <strong>{g}</strong>
                </div>
              ))}
            </div>
          )}

          {results.glossary.length > 0 && (
            <div className="search-group">
              <h4>Glossary ({results.glossary.length})</h4>
              {results.glossary.map((g) => (
                <div className="search-item" key={g.term}>
                  <strong>{g.term}</strong>
                  <span className="muted">{g.def}</span>
                </div>
              ))}
            </div>
          )}

          {results.cards.length > 0 && (
            <div className="search-group">
              <h4>Flashcards ({results.cards.length})</h4>
              {results.cards.map((c) => (
                <div className="search-item" key={c.id}>
                  <strong>{c.front}</strong>
                  <span className="muted">{c.back}</span>
                </div>
              ))}
            </div>
          )}

          {results.modules.length + results.tools.length + results.groups.length + results.glossary.length + results.cards.length === 0 && (
            <p className="muted">No matches for "{q}". Try a different term.</p>
          )}
        </div>
      )}
    </div>
  )
}