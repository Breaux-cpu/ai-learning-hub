import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Outlet />
        <div className="footer">
          <p><strong>You made it to the end.</strong> 🎉 You now know the fundamentals of AI and agentic local coding. The best next step: open a real project, write an AGENTS.md, and start with one small task.</p>
          <p style={{ marginTop: 8 }}>Built with React + Vite. Progress is stored in your browser's localStorage.</p>
        </div>
      </main>
    </div>
  )
}