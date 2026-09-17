import Callout from '../components/Callout'
import FlipCard from '../components/FlipCard'
import Quiz from '../components/Quiz'

export const PART5 = [
  {
    id: 'm22',
    num: 22,
    title: 'Final Assessment',
    group: 'Assessment',
    kicker: 'MODULE 22 · ASSESSMENT',
    body: (
      <>
        <p>Ten questions covering everything. Answer all of them, then check your score.</p>

        <Quiz questions={[
          {
            q: 'What is the key difference between an agent and autocomplete?',
            options: [
              'Autocomplete is faster',
              'An agent can use tools, read the project, and act on it in a loop',
              'An agent runs in the cloud only',
              'There is no difference',
            ],
            answer: 1,
            explain: 'Agents have tools (file read/write, shell, search) and an act→observe→iterate loop. Autocomplete just predicts the next lines.',
          },
          {
            q: 'The agent loop is best described as:',
            options: ['Ask → answer → done', 'Type → compile → ship', 'Plan → act → observe → iterate', 'Download → install → run'],
            answer: 2,
            explain: 'The agent plans, calls tools, observes results, and iterates until the goal is met.',
          },
          {
            q: 'What is the scarcest resource in agentic coding?',
            options: ['Context window', 'Disk space', 'Internet bandwidth', 'Number of monitors'],
            answer: 0,
            explain: 'Everything the agent knows about your project must fit in its context window. Managing it is the #1 skill.',
          },
          {
            q: 'Which is a real advantage of running a local model?',
            options: [
              "It's always smarter than cloud models",
              'It has an unlimited context window',
              'It never makes mistakes',
              'Your code never leaves your machine',
            ],
            answer: 3,
            explain: 'Privacy is the big win — code stays local. Trade-offs are capability, context size, and speed.',
          },
          {
            q: 'What is AGENTS.md for?',
            options: [
              'A changelog of agent sessions',
              'Project instructions loaded into every agent session',
              'A list of API keys',
              'A build script',
            ],
            answer: 1,
            explain: 'AGENTS.md (or CLAUDE.md) tells the agent how your project works: commands, conventions, gotchas.',
          },
          {
            q: 'Which prompt is strongest?',
            options: [
              '"Fix the 500 error on login with expired sessions. Find the cause in src/auth.py, fix minimally, add a regression test, run pytest, show the diff."',
              '"Fix the login bug."',
              '"Make the code better."',
              '"Do something about auth."',
            ],
            answer: 0,
            explain: 'Specific symptom + location + steps + verification. The others are too vague to act on well.',
          },
          {
            q: 'Why is running tests important for agentic coding?',
            options: [
              'It makes the agent faster',
              "It's required by law",
              'It gives the agent a feedback loop to self-correct',
              "It's only for humans",
            ],
            answer: 2,
            explain: 'Tests let the agent verify its work and fix mistakes automatically. Without them it\'s flying blind.',
          },
          {
            q: 'The most dangerous pitfall in agentic coding is:',
            options: [
              'Using a local model',
              'Writing too many tests',
              'Asking for small changes',
              'Merging agent output without reviewing it',
            ],
            answer: 3,
            explain: 'Blind trust. The agent is a tool — you own the quality. Always review the diff.',
          },
          {
            q: 'Where should API keys live?',
            options: [
              'In a file you commit to git',
              'In environment variables or a git-ignored .env file',
              'In AGENTS.md',
              'In the README',
            ],
            answer: 1,
            explain: 'Secrets belong in env vars or git-ignored files. Never commit them.',
          },
          {
            q: "What should you do if the agent's first attempt is wrong?",
            options: [
              'Correct it in the same session with specifics',
              'Restart from scratch every time',
              'Give up on agents',
              'Blame the model',
            ],
            answer: 0,
            explain: 'Iterate in-session — the agent keeps context. Restarting throws away useful context.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm23',
    num: 23,
    title: 'Big Pickle',
    group: 'Bonus',
    kicker: 'BONUS MODULE',
    body: (
      <>
        <p>Big Pickle is the model powering this very session — a local-first coding model built for agentic work. Here's what it's especially good at. <em>Hover the cards to flip them.</em></p>

        <div className="grid2">
          <FlipCard icon="🔒" title="Privacy" back="Runs entirely on your machine. Proprietary code, credentials, and trade secrets never leave your disk." />
          <FlipCard icon="🧠" title="Reasoning" back="Strong multi-step reasoning for the agent loop — planning, debugging, and self-correcting across tool calls." />
          <FlipCard icon="⚡" title="Speed" back="Fast token generation means quick iterations — read, edit, test, repeat — without waiting on a remote API." />
          <FlipCard icon="💰" title="Cost" back="No per-token pricing. Run unlimited sessions, experiments, and long agent loops for the price of your hardware." />
          <FlipCard icon="🛠️" title="Tool Use" back="Reliable function calling — reads, edits, shell commands, and searches — so it works cleanly inside opencode." />
          <FlipCard icon="📚" title="Context" back="A generous context window that holds your project structure, AGENTS.md, and the current task without crowding out the code." />
        </div>

        <Callout variant="good" label="Best for">
          Everyday agentic coding: bug fixes, features, refactors, and code review on your own machine. Pair it with a cloud frontier model when you hit a genuinely hard architectural problem.
        </Callout>
      </>
    ),
  },
]