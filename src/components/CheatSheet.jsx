import CodeBlock from './CodeBlock'

function Section({ title, children }) {
  return (
    <div className="cs-section">
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default function CheatSheet() {
  return (
    <div className="cheatsheet">
      <div className="cs-actions">
        <button className="btn ghost" onClick={() => window.print()}>🖨 Print / Save PDF</button>
      </div>

      <Section title="LLM basics">
        <table>
          <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><strong>Token</strong></td><td>Chunk of text the model reads (~1.3 tokens per English word)</td></tr>
            <tr><td><strong>Context window</strong></td><td>Max text the model can see at once — the scarcest resource</td></tr>
            <tr><td><strong>Temperature</strong></td><td>Higher = more random; lower = more deterministic</td></tr>
            <tr><td><strong>Top-p</strong></td><td>Sample only from the most probable tokens summing to p</td></tr>
            <tr><td><strong>System prompt</strong></td><td>Standing instructions loaded before your request</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="The prompt recipe">
        <ol>
          <li><strong>Goal</strong> — what should be true when done</li>
          <li><strong>Symptom</strong> — what's wrong now, with specifics</li>
          <li><strong>Constraints</strong> — minimal change, follow style, no new deps</li>
          <li><strong>Verification</strong> — run tests, show the diff</li>
          <li><strong>Done</strong> — stop when all tests pass</li>
        </ol>
      </Section>

      <Section title="The agent loop">
        <CodeBlock code={`Plan → Act → Observe → Iterate
Tools: read, edit, write, bash, grep, glob, web`} />
      </Section>

      <Section title="AGENTS.md structure">
        <CodeBlock code={`## Project      — what this is
## Commands     — test / lint / typecheck / dev
## Conventions  — style rules, architecture
## Gotchas      — traps, soft deletes, fixtures
Keep it under ~100 lines.`} />
      </Section>

      <Section title="OWASP Top 10 for LLMs">
        <ol>
          <li>Prompt Injection</li>
          <li>Sensitive Information Disclosure</li>
          <li>Supply Chain</li>
          <li>Data & Model Poisoning</li>
          <li>Improper Output Handling</li>
          <li>Excessive Agency</li>
          <li>System Prompt Leakage</li>
          <li>Vector & Embedding Weaknesses</li>
          <li>Misinformation</li>
          <li>Unbounded Consumption</li>
        </ol>
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>Defenses: least privilege · human-in-the-loop · treat output as untrusted · segregate external content · adversarial testing · rate limits.</p>
      </Section>

      <Section title="Pentest lifecycle">
        <CodeBlock code={`1. Recon          — theHarvester, Shodan, cert logs
2. Scanning       — Nmap, ffuf, GoBuster
3. Exploitation   — Burp/ZAP, Metasploit, sqlmap
4. Post-exploit   — LinPEAS, Mimikatz
5. Reporting      — what, where, how, impact, fix
Only test systems you own or have permission for.`} />
      </Section>

      <Section title="Key tools">
        <table>
          <thead><tr><th>Tool</th><th>Use</th></tr></thead>
          <tbody>
            <tr><td>Ollama / LM Studio</td><td>Run local models</td></tr>
            <tr><td>opencode / Claude Code</td><td>Agent harnesses</td></tr>
            <tr><td>Nmap</td><td>Port scanning</td></tr>
            <tr><td>Burp Suite / OWASP ZAP</td><td>Web interception proxy</td></tr>
            <tr><td>Metasploit</td><td>Exploitation framework</td></tr>
            <tr><td>DVWA / Juice Shop</td><td>Intentionally vulnerable practice targets</td></tr>
          </tbody>
        </table>
      </Section>
    </div>
  )
}