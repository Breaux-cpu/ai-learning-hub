import { useEffect, useState } from 'react'

const KEY = 'ai-learning-theme'

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(KEY) || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(KEY, theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}

export function applyStoredTheme() {
  const theme = localStorage.getItem(KEY) || 'dark'
  document.documentElement.setAttribute('data-theme', theme)
}