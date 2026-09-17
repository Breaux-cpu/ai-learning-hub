import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'

export const PART4 = [
  {
    id: 'm18',
    num: 18,
    title: 'Best Practices',
    group: 'Practice',
    kicker: 'MODULE 18 · PRACTICE',
    body: (
      <>
        <p>These habits separate people who get great results from agents and people who get broken code.</p>

        <h3>1. Small, focused changes</h3>
        <p>Ask for one logical change at a time. "Add a dark mode toggle" is a good task. "Rewrite the whole app" is a recipe for disaster. Small changes are easier to review and easier to debug when something breaks.</p>

        <h3>2. Read before you edit</h3>
        <p>Make sure the agent (and you) understand the existing code before changing it. Editing blind is how you break working features.</p>

        <h3>3. Always verify</h3>
        <p>Never accept "I think it works." Demand test runs, lint passes, typecheck passes. If the project has no tests, that's the first thing to fix.</p>

        <h3>4. Review every diff</h3>
        <p>You are the senior developer. Read what the agent changed. Use <code>git diff</code> before committing. If you don't understand a change, ask the agent to explain it.</p>

        <h3>5. Keep a clean git history</h3>
        <p>Commit early and often. If the agent breaks something, you can revert. A clean baseline also gives the agent a safe place to experiment.</p>

        <h3>6. Give feedback in-session</h3>
        <p>Correct mistakes immediately in the same conversation. The agent learns from your corrections and the final result gets better.</p>

        <h3>7. Write tests as you go</h3>
        <p>Ask the agent to write tests alongside code. Tests are the safety net that makes future agent sessions safe and fast.</p>

        <Callout good label="The golden rule">
          The agent writes the code. <strong>You</strong> own the quality. Review, verify, and understand everything before it lands.
        </Callout>
      </>
    ),
  },

  {
    id: 'm19',
    num: 19,
    title: 'Real-World Workflows',
    group: 'Practice',
    kicker: 'MODULE 19 · PRACTICE',
    body: (
      <>
        <p>Here are battle-tested workflows for the most common tasks.</p>

        <h3>🐛 Bug fix</h3>
        <CodeBlock code={`1. Reproduce: "When X happens, I see Y. Expected Z."
2. Explore: agent reads the relevant code path.
3. Hypothesize: agent explains the likely cause.
4. Fix: minimal change.
5. Test: add a regression test, run the suite.
6. Review: you read the diff, then commit.`} />

        <h3>✨ New feature</h3>
        <CodeBlock code={`1. Spec: describe the feature and its behavior.
2. Plan: agent outlines files it will touch.
3. Approve: you OK the plan.
4. Build: agent implements in small steps.
5. Test: agent writes tests and runs them.
6. Review: you check the diff and refine.`} />

        <h3>🔧 Refactor</h3>
        <CodeBlock code={`1. Baseline: run the full test suite first.
2. Scope: name the exact refactor (e.g., "extract
   the payment logic into its own module").
3. Safety: keep behavior identical — tests must
   pass before and after.
4. Verify: run tests + lint + typecheck.
5. Commit: one commit per logical step.`} />

        <h3>🔍 Code review</h3>
        <CodeBlock code={`1. "Review this diff for bugs, security issues,
   and style problems."
2. Agent reads the diff and surrounding code.
3. Agent lists issues with severity and file:line.
4. You decide what to fix.`} />

        <h3>📚 Learn a codebase</h3>
        <CodeBlock code={`1. "Explain the architecture of this project."
2. "Where is the entry point? How does a request
   flow through?"
3. "What are the main modules and their
   responsibilities?"
4. "What are the biggest risks or pain points?"`} />

        <Callout label="The common thread">
          Every good workflow has the same shape: <strong>understand → plan → small steps → verify → review</strong>. The agent does the heavy lifting; you keep it honest.
        </Callout>
      </>
    ),
  },

  {
    id: 'm20',
    num: 20,
    title: 'Common Pitfalls',
    group: 'Practice',
    kicker: 'MODULE 20 · PRACTICE',
    body: (
      <>
        <p>These are the ways agentic coding goes wrong. Know them so you can catch them early.</p>

        <details>
          <summary>Hallucination — the agent invents things</summary>
          <div className="body">
            <p>Models confidently produce plausible-sounding but wrong code, APIs that don't exist, or file paths that aren't there. The fix: <strong>demand verification</strong>. Run the code. Check the docs. If the agent cites an API, have it show you where it's used in your own codebase.</p>
          </div>
        </details>

        <details>
          <summary>Context overflow — the agent forgets</summary>
          <div className="body">
            <p>When the context window fills up, the agent starts forgetting earlier instructions and making inconsistent changes. The fix: keep sessions focused, keep AGENTS.md small, split big tasks, and restart with a fresh session when a task drifts too far.</p>
          </div>
        </details>

        <details>
          <summary>Over-engineering — gold-plating</summary>
          <div className="body">
            <p>Agents love abstractions, config files, and "future-proofing." You asked for a button; you got a plugin system. The fix: set constraints up front — "simplest possible solution, no new dependencies, no abstractions unless needed."</p>
          </div>
        </details>

        <details>
          <summary>Silent breakage — it "works" but broke something else</summary>
          <div className="body">
            <p>The agent fixes the bug but breaks a test you didn't run, or changes behavior in an unrelated path. The fix: always run the <em>full</em> test suite, not just the one test, and review the whole diff.</p>
          </div>
        </details>

        <details>
          <summary>Blind trust — accepting output without review</summary>
          <div className="body">
            <p>The most dangerous pitfall. The agent is a tool, not an oracle. If you merge without reading, you own the bugs. The fix: review every diff, understand every change, and never let the agent touch production without your eyes on it.</p>
          </div>
        </details>

        <details>
          <summary>Runaway loops — it won't stop</summary>
          <div className="body">
            <p>An agent can get stuck iterating on the same failing test, or spiral into unrelated changes. The fix: set a step limit, define "done" clearly, and don't be afraid to stop it and redirect.</p>
          </div>
        </details>

        <Callout danger label="The meta-pitfall">
          All of these get worse with a weak model, a huge messy codebase, and no tests. Invest in your project's health — it makes every future agent session better.
        </Callout>
      </>
    ),
  },

  {
    id: 'm21',
    num: 21,
    title: 'Security',
    group: 'Practice',
    kicker: 'MODULE 21 · PRACTICE',
    body: (
      <>
        <p>An agent with shell access is powerful — and dangerous if not controlled. Treat it like any other tool with write access to your machine.</p>

        <h3>Secrets</h3>
        <ul>
          <li>Never put API keys, tokens, or passwords in files the agent might read or write.</li>
          <li>Use environment variables or a git-ignored <code>.env</code> file.</li>
          <li>Before committing, check <code>git diff</code> for accidentally committed secrets.</li>
          <li>If a secret leaks, rotate it immediately — don't just delete the file.</li>
        </ul>

        <h3>Permissions</h3>
        <ul>
          <li>Most harnesses let you control what the agent can do: read-only, ask-before-bash, ask-before-edit, etc.</li>
          <li>Start restrictive. Loosen only when you trust the workflow.</li>
          <li>Be very careful with destructive commands (<code>rm -rf</code>, <code>git push --force</code>, DB migrations).</li>
        </ul>

        <h3>Sandboxing</h3>
        <ul>
          <li>Run agents in a container or VM for risky work (e.g., processing untrusted input).</li>
          <li>Keep the agent scoped to the project directory, not your whole home folder.</li>
          <li>Don't give an agent access to production credentials unless absolutely necessary.</li>
        </ul>

        <h3>Supply chain</h3>
        <ul>
          <li>Agents may suggest installing packages. Verify the package name and source before installing.</li>
          <li>Be alert to typosquatted packages (e.g., <code>requets</code> instead of <code>requests</code>).</li>
          <li>Pin dependencies and review lockfile changes.</li>
        </ul>

        <Callout danger label="Golden rule">
          The agent can only do what you let it do. Review its actions, especially anything involving credentials, network, or destructive commands. When in doubt, say no.
        </Callout>
      </>
    ),
  },
]