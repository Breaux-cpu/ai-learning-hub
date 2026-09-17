import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MarkComplete from './MarkComplete'
import { CURRICULUM } from '../data'

export default function ModulePage({ module }) {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [module.id])

  const idx = CURRICULUM.findIndex((m) => m.id === module.id)
  const prev = CURRICULUM[idx - 1]
  const next = CURRICULUM[idx + 1]

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowLeft' && prev) navigate(`/${prev.id}`)
      if (e.key === 'ArrowRight' && next) navigate(`/${next.id}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, navigate])

  return (
    <section className="module-page">
      <div className="section-head"><span className="kicker">{module.kicker}</span></div>
      <h2>{module.title}</h2>
      <div className="module-body">{module.body}</div>
      <MarkComplete id={module.id} />
      <nav className="module-nav">
        {prev ? (
          <Link className="nav-link" to={`/${prev.id}`}>
            <span className="nav-arrow">←</span>
            <span><span className="muted">Previous</span><br />{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link className="nav-link right" to={`/${next.id}`}>
            <span><span className="muted">Next</span><br />{next.title}</span>
            <span className="nav-arrow">→</span>
          </Link>
        ) : <span />}
      </nav>
    </section>
  )
}