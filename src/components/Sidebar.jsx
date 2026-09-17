import { NavLink } from 'react-router-dom'
import { CURRICULUM, GROUPS, TOOLS } from '../data'
import { useProgress } from '../progress'
import { useTheme } from '../theme'

export default function Sidebar() {
  const { done } = useProgress()
  const { theme, toggle } = useTheme()
  const pct = Math.round((done.size / CURRICULUM.length) * 100)

  return (
    <nav className="sidebar">
      <div className="brand">
        <div className="brand-logo">⚡</div>
        <div>
          <h1>AI Learning Hub</h1>
          <div className="sub">Interactive curriculum · {CURRICULUM.length} modules</div>
        </div>
        <button className="theme-toggle" onClick={toggle} title="Toggle theme" aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="progress-wrap"><div className="progress-bar" style={{ width: pct + '%' }}></div></div>
      <div className="progress-label">
        <span>{done.size} / {CURRICULUM.length} modules</span>
        <b>{pct}%</b>
      </div>
      <div id="nav">
        {GROUPS.map((group) => (
          <div className="nav-group" key={group}>
            <div className="nav-group-title">{group}</div>
            {CURRICULUM.filter((m) => m.group === group).map((m) => (
              <NavLink
                key={m.id}
                to={`/${m.id}`}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}${done.has(m.id) ? ' done' : ''}`}
              >
                <span className="num">{String(m.num).padStart(2, '0')}</span>
                <span className="dot"></span>
                {m.title}
              </NavLink>
            ))}
          </div>
        ))}
        <div className="nav-group">
          <div className="nav-group-title">Tools</div>
          {TOOLS.map((t) => (
            <NavLink
              key={t.id}
              to={`/${t.id}`}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="num">{t.icon}</span>
              <span className="dot"></span>
              {t.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}