import { useState } from 'react'

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <pre>
      <button className="copy-btn" onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
      <code>{code}</code>
    </pre>
  )
}