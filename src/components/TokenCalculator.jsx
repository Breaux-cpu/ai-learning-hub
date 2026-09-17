import { useMemo, useState } from 'react'

const MODELS = [
  { name: 'Small local (8K)', ctx: 8192 },
  { name: 'Local coder (32K)', ctx: 32768 },
  { name: 'Mid cloud (128K)', ctx: 131072 },
  { name: 'Frontier (200K)', ctx: 200000 },
  { name: 'Frontier (1M)', ctx: 1000000 },
]

const SAMPLE = `# AGENTS.md

## Project
A FastAPI service for inventory management.

## Commands
- Run tests: pytest
- Lint: ruff check .
- Dev server: uvicorn app.main:app --reload

## Conventions
- Use Pydantic v2 models for all schemas.
- Database access goes through app/db.py.
- Do NOT add comments unless asked.`

export default function TokenCalculator() {
  const [text, setText] = useState(SAMPLE)
  const [modelIdx, setModelIdx] = useState(1)
  const [outputBudget, setOutputBudget] = useState(2048)

  const stats = useMemo(() => {
    const chars = text.length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const estTokens = Math.ceil(chars / 4)
    const ctx = MODELS[modelIdx].ctx
    const available = ctx - outputBudget
    const pct = Math.min(100, Math.round((estTokens / available) * 100))
    const fits = estTokens <= available
    return { chars, words, estTokens, ctx, available, pct, fits }
  }, [text, modelIdx, outputBudget])

  return (
    <div className="tokencalc">
      <p>Estimate how many tokens your text uses and whether it fits a model's context window. Rough heuristic: <strong>~4 characters ≈ 1 token</strong> for English.</p>

      <div className="grid2">
        <div className="card">
          <h4>Your text</h4>
          <textarea
            className="lab-textarea"
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here…"
          />
          <p className="fc-progress" style={{ textAlign: 'left' }}>
            {stats.chars.toLocaleString()} chars · {stats.words.toLocaleString()} words · <strong>~{stats.estTokens.toLocaleString()} tokens</strong>
          </p>
        </div>

        <div className="card">
          <h4>Model & budget</h4>
          <label className="tc-label">Context window</label>
          <select className="tc-select" value={modelIdx} onChange={(e) => setModelIdx(Number(e.target.value))}>
            {MODELS.map((m, i) => (
              <option key={m.name} value={i}>{m.name} — {m.ctx.toLocaleString()} tokens</option>
            ))}
          </select>
          <label className="tc-label">Reserve for output: <strong>{outputBudget.toLocaleString()} tokens</strong></label>
          <input
            type="range" min={256} max={16384} step={256}
            value={outputBudget}
            onChange={(e) => setOutputBudget(Number(e.target.value))}
            className="tc-range"
          />
          <div className="tc-meter">
            <div className="tc-bar">
              <div className="tc-fill" style={{ width: stats.pct + '%', background: stats.fits ? 'var(--accent2)' : 'var(--danger)' }}></div>
            </div>
            <div className="tc-meter-label">
              <span>{stats.estTokens.toLocaleString()} tokens used</span>
              <span>{stats.available.toLocaleString()} available</span>
            </div>
          </div>
          <div className={`tc-verdict${stats.fits ? ' ok' : ' bad'}`}>
            {stats.fits
              ? `✅ Fits — ${stats.pct}% of the input budget used. Room for ${(stats.available - stats.estTokens).toLocaleString()} more tokens.`
              : `❌ Overflow — needs ${(stats.estTokens - stats.available).toLocaleString()} more tokens than fit. Trim or split the text.`}
          </div>
        </div>
      </div>

      <div className="callout">
        <div className="label">Why this matters</div>
        Everything the agent knows about your task must fit in the context window. A bloated AGENTS.md or pasted file crowds out the code the model actually needs. This calculator shows you the budget — keep your prompts lean.
      </div>
    </div>
  )
}