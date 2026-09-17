import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import TerminalSim from '../components/TerminalSim'

export const PART3 = [
  {
    id: 'm10',
    num: 10,
    title: 'What Is Agentic Coding?',
    group: 'Agents',
    kicker: 'MODULE 10 · AGENTS',
    body: (
      <>
        <p>Three levels of AI assistance — know the difference:</p>
        <table>
          <thead><tr><th>Level</th><th>Example</th><th>What it does</th></tr></thead>
          <tbody>
            <tr><td><strong>Autocomplete</strong></td><td>Copilot inline suggestions</td><td>Predicts the next few lines as you type. You stay in the driver's seat.</td></tr>
            <tr><td><strong>Chat</strong></td><td>ChatGPT, Claude chat</td><td>Answers questions, generates snippets. You copy-paste the result.</td></tr>
            <tr><td><strong>Agent</strong></td><td>opencode, Claude Code, Cursor agent</td><td>Reads your repo, plans, edits files, runs commands, tests, iterates. It <em>does the work</em>.</td></tr>
          </tbody>
        </table>

        <h3>What makes something an "agent"?</h3>
        <ul>
          <li><strong>Tools</strong> — it can read/write files, run shell commands, search code, fetch the web.</li>
          <li><strong>A loop</strong> — it acts, observes the result, and acts again until done.</li>
          <li><strong>Project awareness</strong> — it sees your whole codebase, not just one file.</li>
          <li><strong>Autonomy</strong> — you give it a goal, it figures out the steps.</li>
        </ul>

        <Callout label="Mental model">
          Think of an agent as a junior developer who is extremely fast, never sleeps, and has read every file in your repo. Your job is to be the senior: give clear goals, review the work, and catch mistakes.
        </Callout>
      </>
    ),
  },

  {
    id: 'm11',
    num: 11,
    title: 'Core Concepts',
    group: 'Agents',
    kicker: 'MODULE 11 · AGENTS',
    body: (
      <>
        <p>Five ideas you must understand before anything else:</p>

        <h3>1. The LLM</h3>
        <p>A large language model is a neural network trained on enormous amounts of text. It predicts the next token (roughly a word fragment) given everything before it. That's it — everything else is engineering on top.</p>

        <h3>2. The context window</h3>
        <p>Every model has a maximum amount of text it can "see" at once — its <strong>context window</strong>. For coding agents this is measured in tokens. Small local models might have 8K–32K tokens; top cloud models have 200K–1M. Everything the agent knows about your project must fit in this window.</p>
        <Callout warn label="Why this matters">
          Context is the scarcest resource in agentic coding. A bloated project, huge files, or verbose prompts crowd out the code the agent actually needs to see. Managing context is the #1 skill — covered in Module 15.
        </Callout>

        <h3>3. Tools (function calling)</h3>
        <p>An agent isn't just text-in/text-out. It can emit structured calls to tools, and the harness executes them and feeds results back. Typical tools:</p>
        <ul>
          <li><code>read</code> — read a file or directory</li>
          <li><code>edit</code> — make a precise change to a file</li>
          <li><code>write</code> — create or overwrite a file</li>
          <li><code>bash</code> — run a shell command</li>
          <li><code>grep</code> / <code>glob</code> — search code and filenames</li>
          <li><code>web</code> — fetch docs or search the internet</li>
        </ul>

        <h3>4. The system prompt</h3>
        <p>Before your request, the agent receives a <strong>system prompt</strong> — instructions that define its behavior, its available tools, and rules it must follow. Tools like opencode let you add your own project-level instructions (see Module 15).</p>

        <h3>5. The agent loop</h3>
        <CodeBlock code={`┌─────────────┐
│  You give   │
│  a goal     │
└──────┬──────┘
       ▼
┌─────────────┐     ┌──────────────┐
│  Agent      │────▶│  Calls a     │
│  plans      │     │  tool        │
└──────┬──────┘     └──────┬───────┘
       │                   │
       │                   ▼
       │            ┌──────────────┐
       │            │  Tool runs,  │
       │            │  result      │
       │            │  returned    │
       │            └──────┬───────┘
       ▼                   │
┌─────────────┐            │
│  Agent      │◀───────────┘
│  observes   │
│  & iterates │
└──────┬──────┘
       ▼
   Done? ──no──▶ loop again
       │yes
       ▼
  Result to you`} />
        <p>This loop — <strong>plan → act → observe → iterate</strong> — is the heart of every agent. The number of iterations is often capped (e.g., a max step limit) so a runaway agent can't loop forever.</p>
      </>
    ),
  },

  {
    id: 'm12',
    num: 12,
    title: 'The Agent Loop in Action',
    group: 'Agents',
    kicker: 'MODULE 12 · AGENTS',
    body: (
      <>
        <p>Watch a real agent session. This is a simulation of how opencode behaves when you ask it to fix a bug.</p>

        <TerminalSim script={[
          { type: 'prompt', text: 'opencode' },
          { type: 'cmd', text: 'Fix the bug: when a user logs in with a valid password but an expired session, they get a 500 error instead of being redirected to /login.' },
          { type: 'out', text: 'Let me investigate. First I\'ll look at the auth flow.' },
          { type: 'cmd', text: 'glob "src/**/*.py"' },
          { type: 'out', text: 'src/main.py\nsrc/auth.py\nsrc/session.py\nsrc/db.py\ntests/test_auth.py' },
          { type: 'cmd', text: 'grep "def login" src/auth.py' },
          { type: 'out', text: 'src/auth.py:42: def login(request):\n  src/auth.py:58:   session = get_session(request)' },
          { type: 'cmd', text: 'read src/auth.py:42' },
          { type: 'out', text: 'def login(request):\n    user = authenticate(request)\n    session = get_session(request)\n    if not session.is_valid():\n        return jsonify({"error": "expired"}), 500   # ← BUG: should redirect\n    return redirect("/dashboard")' },
          { type: 'out', text: 'Found it. When the session is expired, the code returns a 500 instead of redirecting to /login. I\'ll fix it and add a regression test.' },
          { type: 'cmd', text: 'edit src/auth.py:58' },
          { type: 'out', text: 'Changed: return jsonify({"error": "expired"}), 500  →  return redirect("/login")' },
          { type: 'cmd', text: 'edit tests/test_auth.py' },
          { type: 'out', text: 'Added test: test_login_with_expired_session_redirects_to_login' },
          { type: 'cmd', text: 'pytest tests/test_auth.py' },
          { type: 'out', text: '============================= test session starts =============================\ncollected 12 items\n\ntests/test_auth.py ...........F..\n\nFAILED test_login_with_expired_session_redirects_to_login\nassert response.status_code == 302, got 500' },
          { type: 'out', text: 'Hmm, still failing. The redirect is happening but something else returns 500. Let me check the session module.' },
          { type: 'cmd', text: 'read src/session.py:10' },
          { type: 'out', text: 'def is_valid(self):\n    return self.expires_at > now()  # ← BUG: comparing datetime to int' },
          { type: 'out', text: 'Found a second bug — expires_at is stored as an int timestamp but compared to a datetime. Fixing that too.' },
          { type: 'cmd', text: 'edit src/session.py:10' },
          { type: 'out', text: 'Changed: self.expires_at > now()  →  datetime.fromtimestamp(self.expires_at) > now()' },
          { type: 'cmd', text: 'pytest tests/test_auth.py' },
          { type: 'out', text: 'collected 12 items\n\ntests/test_auth.py ............\n\n12 passed in 0.42s ✅' },
          { type: 'out', text: 'All tests pass. Summary:\n1. Fixed expired-session handling in src/auth.py to redirect to /login.\n2. Fixed a datetime/int comparison bug in src/session.py that caused the 500.\n3. Added a regression test.\n\nHere\'s the diff for your review:' },
        ]} />

        <h3>What just happened?</h3>
        <ol>
          <li><strong>You gave a goal</strong> — a bug report, not a step-by-step recipe.</li>
          <li><strong>The agent explored</strong> — it read files to understand the code.</li>
          <li><strong>It formed a hypothesis</strong> — found the likely cause.</li>
          <li><strong>It edited</strong> — made a precise, minimal change.</li>
          <li><strong>It verified</strong> — ran the test to confirm the fix.</li>
          <li><strong>It reported</strong> — summarized what it did and why.</li>
        </ol>
        <Callout good label="Key insight">
          The agent never "just answers." It <em>does</em> — reads, edits, runs, verifies. Your job is to give it a clear goal and then review the diff it produces.
        </Callout>
      </>
    ),
  },

  {
    id: 'm13',
    num: 13,
    title: 'Local vs Cloud Models',
    group: 'Agents',
    kicker: 'MODULE 13 · AGENTS',
    body: (
      <>
        <p>You can run agents against models in two places. Each has real trade-offs.</p>

        <table>
          <thead><tr><th></th><th><span className="tag local">LOCAL</span> On your machine</th><th><span className="tag cloud">CLOUD</span> Remote API</th></tr></thead>
          <tbody>
            <tr><td><strong>Privacy</strong></td><td>Code never leaves your machine</td><td>Code is sent to a third party</td></tr>
            <tr><td><strong>Cost</strong></td><td>Free after hardware</td><td>Per-token pricing</td></tr>
            <tr><td><strong>Speed</strong></td><td>Depends on your GPU/CPU</td><td>Fast, scales with demand</td></tr>
            <tr><td><strong>Capability</strong></td><td>Smaller models, smaller context</td><td>Frontier models, huge context</td></tr>
            <tr><td><strong>Offline</strong></td><td>Works with no internet</td><td>Requires connection</td></tr>
            <tr><td><strong>Setup</strong></td><td>Install runtime + download weights</td><td>Sign up, get an API key</td></tr>
          </tbody>
        </table>

        <h3>Popular local models for coding</h3>
        <table>
          <thead><tr><th>Model</th><th>Context</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Qwen2.5-Coder (7B / 14B / 32B)</td><td>32K–128K</td><td>Excellent open-weight coder; 32B is the sweet spot for a good GPU</td></tr>
            <tr><td>DeepSeek-Coder-V2</td><td>128K</td><td>Strong, but large (236B MoE — needs serious hardware)</td></tr>
            <tr><td>Llama 3.x</td><td>8K–128K</td><td>Generalist; good with the right fine-tune</td></tr>
            <tr><td>Mistral / Codestral</td><td>32K–256K</td><td>Fast, good code quality</td></tr>
            <tr><td>Phi-3 / Phi-4</td><td>128K</td><td>Small (3.8B–14B), runs on modest hardware</td></tr>
          </tbody>
        </table>

        <h3>Hardware reality check</h3>
        <ul>
          <li><strong>7B models</strong> — run on ~8GB VRAM (quantized) or even CPU with patience.</li>
          <li><strong>14B models</strong> — comfortable on 12–16GB VRAM.</li>
          <li><strong>32B models</strong> — need ~24GB VRAM (quantized) for good speed.</li>
          <li><strong>70B+ models</strong> — 48GB+ VRAM, or multi-GPU, or accept slow CPU inference.</li>
        </ul>
        <Callout warn label="Quantization">
          Models are often shipped quantized (e.g., Q4, Q5, Q8) — weights compressed to fewer bits. This shrinks memory use dramatically with a small quality cost. A Q4 32B model fits in ~20GB VRAM. Tools like <code>llama.cpp</code>, <code>Ollama</code>, and <code>LM Studio</code> handle this for you.
        </Callout>

        <h3>How to choose</h3>
        <div className="grid2">
          <div className="card">
            <h4>Choose local when</h4>
            <ul>
              <li>Code is proprietary / sensitive</li>
              <li>You're offline or on a plane</li>
              <li>You want no per-token cost</li>
              <li>Your tasks are small and focused</li>
            </ul>
          </div>
          <div className="card">
            <h4>Choose cloud when</h4>
            <ul>
              <li>You need frontier-level reasoning</li>
              <li>You work on huge codebases</li>
              <li>You want max speed and reliability</li>
              <li>You're fine sharing code with the provider</li>
            </ul>
          </div>
        </div>
        <Callout label="Hybrid is normal">
          Many people use a local model for quick, private edits and a cloud model for hard architectural problems. Tools like opencode let you switch providers per session.
        </Callout>
      </>
    ),
  },

  {
    id: 'm14',
    num: 14,
    title: 'Setting Up Your Environment',
    group: 'Agents',
    kicker: 'MODULE 14 · AGENTS',
    body: (
      <>
        <p>You need three things: a <strong>harness</strong> (the agent tool), a <strong>model</strong> (local or cloud), and a <strong>project</strong> to work on.</p>

        <h3>Choose a harness</h3>
        <table>
          <thead><tr><th>Tool</th><th>Type</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><strong>opencode</strong></td><td>Terminal agent</td><td>Open-source, runs in your terminal, supports local + cloud models, highly configurable</td></tr>
            <tr><td><strong>Claude Code</strong></td><td>Terminal agent</td><td>Anthropic's agent, strong default model, great for large repos</td></tr>
            <tr><td><strong>Cursor</strong></td><td>IDE</td><td>VS Code fork with agent mode built in</td></tr>
            <tr><td><strong>Aider</strong></td><td>Terminal agent</td><td>Mature, pairs well with local models, git-integrated</td></tr>
            <tr><td><strong>Continue</strong></td><td>IDE plugin</td><td>Open-source, works in VS Code / JetBrains</td></tr>
          </tbody>
        </table>

        <h3>Run a local model</h3>
        <p>The easiest path is <strong>Ollama</strong> or <strong>LM Studio</strong>. They download models, handle quantization, and expose a local API that agents can talk to.</p>
        <CodeBlock code={`# Install Ollama, then pull a coding model
ollama pull qwen2.5-coder:14b

# It now serves an OpenAI-compatible API at http://localhost:11434
# Point your agent harness at it`} />

        <h3>Configure opencode</h3>
        <p>opencode is configured with a JSON file. A minimal setup:</p>
        <CodeBlock code={`// opencode.json
{
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/ollama",
      "options": { "baseURL": "http://localhost:11434/api" },
      "models": {
        "qwen2.5-coder:14b": { "name": "Qwen Coder 14B" }
      }
    }
  },
  "model": "qwen2.5-coder:14b"
}`} />
        <p>For cloud models you typically just set an API key (e.g., <code>ANTHROPIC_API_KEY</code> or <code>OPENAI_API_KEY</code>) and pick the model.</p>

        <Callout danger label="Never commit secrets">
          API keys belong in environment variables or a git-ignored config file — never in a file you commit. See Module 21.
        </Callout>
      </>
    ),
  },

  {
    id: 'm15',
    num: 15,
    title: 'Context Engineering',
    group: 'Agents',
    kicker: 'MODULE 15 · AGENTS',
    body: (
      <>
        <p>This is the single most important skill in agentic coding. The agent can only work with what fits in its context window. Your job is to make sure the <em>right</em> context is there and the <em>wrong</em> context is not.</p>

        <h3>Project instructions: AGENTS.md</h3>
        <p>Most harnesses read a project-level instruction file — <code>AGENTS.md</code> (opencode), <code>CLAUDE.md</code> (Claude Code), or similar. This file tells the agent how your project works. It's loaded into every session.</p>
        <CodeBlock code={`# AGENTS.md

## Project
A FastAPI service for inventory management.

## Commands
- Run tests: \`pytest\`
- Lint: \`ruff check .\`
- Typecheck: \`mypy src/\`
- Dev server: \`uvicorn app.main:app --reload\`

## Conventions
- Use Pydantic v2 models for all request/response schemas.
- Database access goes through \`app/db.py\` — never raw SQL in routes.
- Follow existing naming: snake_case for functions, PascalCase for classes.
- Do NOT add comments unless asked.

## Gotchas
- The \`inventory\` table uses soft deletes (deleted_at column).
- Tests must not hit the real database — use the fixtures in \`tests/conftest.py\`.`} />
        <Callout good label="What to put in AGENTS.md">
          <ul>
            <li>How to run tests, lint, typecheck, build</li>
            <li>Architecture overview and where things live</li>
            <li>Code conventions and style rules</li>
            <li>Known gotchas and traps</li>
            <li>What the agent should <em>never</em> do</li>
          </ul>
        </Callout>

        <h3>Keep it small</h3>
        <p>AGENTS.md is loaded into <em>every</em> session. If it's 2,000 lines, it eats context on every single task. Aim for under ~100 lines. Put deep detail in files the agent can read on demand.</p>

        <h3>Context hygiene rules</h3>
        <ul>
          <li><strong>Point, don't dump.</strong> Say "see <code>src/auth.py</code>" instead of pasting the whole file.</li>
          <li><strong>Ask for targeted reads.</strong> "Read the <code>handle_payment</code> function" beats "read the whole file."</li>
          <li><strong>Exclude noise.</strong> Keep generated files, node_modules, build output out of the agent's view.</li>
          <li><strong>Split big files.</strong> A 5,000-line file is hard for any model to work with.</li>
          <li><strong>Restate the goal.</strong> Long sessions drift; remind the agent what it's doing.</li>
        </ul>

        <h3>Memory across sessions</h3>
        <p>Agents don't remember past sessions by default. Persist knowledge in <code>AGENTS.md</code>, docs, or a notes file. If you solved a tricky problem, write down the solution so the next session knows.</p>
      </>
    ),
  },

  {
    id: 'm16',
    num: 16,
    title: 'Prompting Agents',
    group: 'Agents',
    kicker: 'MODULE 16 · AGENTS',
    body: (
      <>
        <p>Prompting an agent is different from prompting a chatbot. You're giving a task to a worker, not asking a question. Be specific, give constraints, and demand verification.</p>

        <h3>Bad vs good</h3>
        <div className="grid2">
          <div className="card">
            <h4>❌ Weak prompt</h4>
            <CodeBlock code={`Fix the login bug.`} />
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>Too vague. Which bug? What behavior is wrong? How will we know it's fixed?</p>
          </div>
          <div className="card">
            <h4>✅ Strong prompt</h4>
            <CodeBlock code={`When a user logs in with a valid
password but an expired session,
they get a 500 error instead of
being redirected to /login.

1. Find the cause in src/auth.py
2. Fix it with a minimal change
3. Add a regression test
4. Run pytest and confirm it passes
5. Show me the diff`} />
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>Specific symptom, expected behavior, explicit steps, and verification.</p>
          </div>
        </div>

        <h3>The recipe</h3>
        <ol>
          <li><strong>State the goal</strong> — what should be true when done.</li>
          <li><strong>Give the symptom</strong> — what's wrong now, with specifics.</li>
          <li><strong>Set constraints</strong> — "minimal change," "follow existing style," "no new dependencies."</li>
          <li><strong>Demand verification</strong> — "run the tests," "show me the diff."</li>
          <li><strong>Define done</strong> — "stop when all tests pass."</li>
        </ol>

        <h3>Useful prompt patterns</h3>
        <table>
          <thead><tr><th>Pattern</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td>Explain first</td><td>"Before changing anything, explain what you think the bug is."</td></tr>
            <tr><td>Plan approval</td><td>"Outline your plan first, then wait for my OK before editing."</td></tr>
            <tr><td>Small steps</td><td>"Do this in small commits, one logical change each."</td></tr>
            <tr><td>No over-engineering</td><td>"Solve the problem as simply as possible. No abstractions unless needed."</td></tr>
            <tr><td>Teach me</td><td>"Explain each change you make and why."</td></tr>
            <tr><td>Verify</td><td>"Run the test suite and paste the results."</td></tr>
          </tbody>
        </table>

        <Callout warn label="Iterate, don't restart">
          Agents keep the conversation context. If the first attempt is wrong, correct it in the same session: "That's not quite it — the error is actually in the token refresh, not the password check." Restarting loses all that context.
        </Callout>
      </>
    ),
  },

  {
    id: 'm17',
    num: 17,
    title: 'Tools & Capabilities',
    group: 'Agents',
    kicker: 'MODULE 17 · AGENTS',
    body: (
      <>
        <p>An agent is only as good as its tools. Here's the standard toolkit and how to use each one well.</p>

        <table>
          <thead><tr><th>Tool</th><th>What it does</th><th>Pro tip</th></tr></thead>
          <tbody>
            <tr><td><code>read</code></td><td>Read a file or directory</td><td>Read a function, not a whole 3,000-line file. Use offsets/limits.</td></tr>
            <tr><td><code>edit</code></td><td>Precise find-and-replace in a file</td><td>Give exact surrounding context so the match is unambiguous.</td></tr>
            <tr><td><code>write</code></td><td>Create or overwrite a file</td><td>Only for new files or full rewrites.</td></tr>
            <tr><td><code>bash</code></td><td>Run shell commands</td><td>Use it to run tests, builds, git, installs. This is how the agent verifies.</td></tr>
            <tr><td><code>grep</code></td><td>Regex search across files</td><td>Fastest way to find where a symbol is used.</td></tr>
            <tr><td><code>glob</code></td><td>Find files by name pattern</td><td>Great for "where are the test files?"</td></tr>
            <tr><td><code>web</code></td><td>Fetch URLs / search</td><td>For docs, library APIs, error messages.</td></tr>
          </tbody>
        </table>

        <h3>How the tools work together</h3>
        <CodeBlock code={`# A typical exploration sequence
glob "src/**/*.py"            # 1. what files exist?
grep "def handle_payment"     # 2. where is the function?
read src/payments.py:120      # 3. read just that function
bash "pytest tests/test_pay"  # 4. run the relevant test`} />

        <Callout label="The verification loop">
          The most powerful capability is <code>bash</code>. An agent that can run your tests and see the output can self-correct. An agent that can't is flying blind. Always make sure your project has fast, reliable test and lint commands — they're the agent's feedback loop.
        </Callout>
      </>
    ),
  },
]