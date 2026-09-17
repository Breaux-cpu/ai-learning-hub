import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import Quiz from '../components/Quiz'

export const PART11 = [
  {
    id: 'm43',
    num: 43,
    title: 'AI Interview Questions',
    group: 'Interview Prep',
    kicker: 'INTERVIEW 01',
    body: (
      <>
        <p>The questions that come up again and again — with the answers that actually land. Read them, then test yourself at the bottom.</p>

        <h3>Foundations</h3>
        <div className="qa"><div className="qa-q">What is a token?</div><div className="qa-a">A chunk of text — roughly 4 characters or 0.75 of an English word. Models read, generate, and bill in tokens, and the context window is measured in them.</div></div>
        <div className="qa"><div className="qa-q">Explain temperature.</div><div className="qa-a">A sampling parameter that controls randomness. Low (0–0.3) for factual or code tasks; high (0.7–1.0) for creative work. At 0 the model is as deterministic as the hardware allows.</div></div>
        <div className="qa"><div className="qa-q">What's the difference between training and inference?</div><div className="qa-a">Training adjusts the model's weights on data (expensive, done by labs). Inference is using the frozen model to answer prompts (what your app does).</div></div>
        <div className="qa"><div className="qa-q">Why do LLMs hallucinate?</div><div className="qa-a">They predict plausible tokens, not verified facts. There's no internal truth check — fluency and accuracy are separate. RAG and grounding reduce it; nothing eliminates it.</div></div>

        <h3>Architecture & application</h3>
        <div className="qa"><div className="qa-q">RAG vs fine-tuning — when do you use each?</div><div className="qa-a">RAG for knowledge that changes or must be cited; fine-tuning for behavior, format, or tone. RAG answers "what should it know"; fine-tuning answers "how should it behave."</div></div>
        <div className="qa"><div className="qa-q">Walk me through a RAG pipeline.</div><div className="qa-a">Ingest → chunk → embed → store in a vector DB → embed the query → retrieve top-k (often with metadata filters + keyword hybrid) → inject into the prompt → generate → cite. Then evaluate retrieval and generation separately.</div></div>
        <div className="qa"><div className="qa-q">What makes something an agent?</div><div className="qa-a">Tools plus a loop plus autonomy — it plans, acts, observes results, and iterates toward a goal without a human in every step. A chatbot with no tools and no loop is not an agent.</div></div>
        <div className="qa"><div className="qa-q">How do you control agent cost and runaway loops?</div><div className="qa-a">Cap steps, cap tokens per run, prefer cheap models for routing, cache, and require human approval for destructive or high-cost actions.</div></div>
        <div className="qa"><div className="qa-q">How would you cut LLM costs by 80%?</div><div className="qa-a">Measure first. Then: route easy requests to a small/local model, cache repeated queries, trim prompts and context, shorten outputs, and batch. Often the biggest win is sending less context.</div></div>

        <h3>Evaluation & reliability</h3>
        <div className="qa"><div className="qa-q">How do you test an LLM feature?</div><div className="qa-a">Build a golden set of real inputs with known-good answers, run it on every change, and use LLM-as-judge with a rubric for open-ended outputs. Track regressions like you would with unit tests.</div></div>
        <div className="qa"><div className="qa-q">What's the difference between offline and online evaluation?</div><div className="qa-a">Offline runs your golden set before shipping. Online watches real traffic with metrics, logging, and sampling. You need both — offline prevents known regressions, online catches what you didn't anticipate.</div></div>

        <h3>Security</h3>
        <div className="qa"><div className="qa-q">What is prompt injection?</div><div className="qa-a">Crafted input that overrides your instructions. Direct (a user types it) or indirect (it rides in on a web page, file, or email the model processes). Mitigate with boundaries, least privilege, output filtering, and human approval for actions.</div></div>
        <div className="qa"><div className="qa-q">Why is "just filter the input" not enough?</div><div className="qa-a">Attackers adapt, indirect injections bypass user-facing filters, and filters create false positives. Defense in depth — input, output, tool limits, monitoring — is the answer.</div></div>
        <div className="qa"><div className="qa-q">What is excessive agency?</div><div className="qa-a">When an agent has more tools, permissions, or autonomy than the task needs. It turns a prompt injection into real damage. Fix it with least privilege and approval gates.</div></div>

        <Callout good label="How to answer well">
          Name the trade-off. Interviewers care less about the "right" tool and more about whether you can reason about cost, latency, quality, and risk. Say "it depends, and here's what it depends on."
        </Callout>

        <Quiz scoreKey="m43" questions={[
          {
            q: 'Best one-line distinction between RAG and fine-tuning?',
            options: [
              'RAG is cheaper',
              'RAG supplies knowledge, fine-tuning shapes behavior',
              'Fine-tuning is newer',
              'They are interchangeable',
            ],
            answer: 1,
            explain: 'Knowledge vs behavior is the cleanest framing.',
          },
          {
            q: 'What is indirect prompt injection?',
            options: [
              'A user typing "ignore instructions"',
              'Instructions hidden in content the model reads (web, file, email)',
              'A model refusing to answer',
              'A slow API call',
            ],
            answer: 1,
            explain: 'It arrives via untrusted content, not the user.',
          },
          {
            q: 'How do you control agent cost?',
            options: [
              'Use the biggest model always',
              'Cap steps/tokens, route cheap, cache, send less context',
              'Disable logging',
              'Raise temperature',
            ],
            answer: 1,
            explain: 'Measure, then route, cache, and trim context.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm44',
    num: 44,
    title: 'System Design for AI Apps',
    group: 'Interview Prep',
    kicker: 'INTERVIEW 02',
    body: (
      <>
        <p>The system-design round for AI roles: given a vague product ask, design a system and defend the trade-offs. Here's the framework and a worked example.</p>

        <h3>The framework (do these in order)</h3>
        <ol>
          <li><strong>Clarify requirements</strong> — users, scale, latency budget, cost ceiling, data sensitivity.</li>
          <li><strong>Define success</strong> — how you'll measure quality before building.</li>
          <li><strong>Sketch the flow</strong> — request path, retrieval, model call, output handling.</li>
          <li><strong>Pick components</strong> — models, vector store, orchestration, hosting.</li>
          <li><strong>Handle failure</strong> — timeouts, fallbacks, guardrails, retries.</li>
          <li><strong>Address cost & scale</strong> — caching, routing, batching.</li>
          <li><strong>Plan operations</strong> — evals, monitoring, logging.</li>
        </ol>

        <h3>Worked example: "Build a support bot for our docs"</h3>
        <table>
          <thead><tr><th>Step</th><th>Decision</th></tr></thead>
          <tbody>
            <tr><td><strong>Requirements</strong></td><td>10k users/day, answers under 2s, must cite sources, can't leak internal docs</td></tr>
            <tr><td><strong>Success</strong></td><td>Golden set of 200 real questions; target 90% correct, &lt;5% escalation</td></tr>
            <tr><td><strong>Flow</strong></td><td>Query → guardrail → retrieve top-k → rerank → generate with citations → output filter</td></tr>
            <tr><td><strong>Components</strong></td><td>pgvector (already on Postgres), small model for routing, frontier model for answers</td></tr>
            <tr><td><strong>Failure</strong></td><td>"I don't know" when retrieval confidence is low; escalate to human otherwise</td></tr>
            <tr><td><strong>Cost</strong></td><td>Semantic cache, route easy Qs to a small model, cap context</td></tr>
            <tr><td><strong>Ops</strong></td><td>Log every Q/A, sample for review, alert on refusal-rate spikes</td></tr>
          </tbody>
        </table>

        <h3>Trade-offs to name out loud</h3>
        <ul>
          <li><strong>Latency vs quality</strong> — a reranker improves answers but adds a step.</li>
          <li><strong>Cost vs capability</strong> — routing layers add complexity but cut cost sharply.</li>
          <li><strong>Autonomy vs safety</strong> — more tools means more capability and more risk.</li>
          <li><strong>Caching vs freshness</strong> — cached answers are fast but can go stale.</li>
        </ul>

        <Callout warn label="Common trap">
          Jumping to tools before requirements. Say "before I pick a vector DB, let me confirm the query patterns and data volume" — that's what senior candidates do.
        </Callout>

        <Quiz scoreKey="m44" questions={[
          {
            q: 'What should come first in an AI system design?',
            options: [
              'Picking the model',
              'Clarifying requirements and defining success metrics',
              'Choosing a vector DB',
              'Writing code',
            ],
            answer: 1,
            explain: 'Requirements and success metrics drive every later choice.',
          },
          {
            q: 'How do you handle low retrieval confidence?',
            options: [
              'Always answer anyway',
              'Say "I don\'t know" and/or escalate to a human',
              'Increase temperature',
              'Reduce top-k',
            ],
            answer: 1,
            explain: 'A safe refusal beats a confident hallucination.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm45',
    num: 45,
    title: 'Landing the Role',
    group: 'Interview Prep',
    kicker: 'INTERVIEW 03',
    body: (
      <>
        <p>You know the material. This module is about converting it into an offer — portfolio, resume, interviews, and negotiation.</p>

        <h3>Your portfolio</h3>
        <ul>
          <li><strong>Two to three real projects</strong> beat ten tutorials. The RAG app, the agent, and the red-team writeup from this course are enough.</li>
          <li><strong>READMEs that explain decisions</strong> — why you chose the vector store, how you evaluated, what you'd change. This is what separates candidates.</li>
          <li><strong>Show the eval set.</strong> A repo with a golden set and a passing run signals engineering maturity.</li>
          <li><strong>Include a failure.</strong> "Here's what didn't work and why" is memorable and credible.</li>
        </ul>

        <h3>Your resume</h3>
        <ul>
          <li><strong>Lead with outcomes</strong> — "cut inference cost 60% by routing small tasks to a local model," not "used LLMs."</li>
          <li><strong>Name the stack</strong> — models, vector DB, orchestration, cloud. Recruiters and ATS scan for these.</li>
          <li><strong>Quantify</strong> — latency, cost, accuracy, users. Numbers survive screening.</li>
        </ul>

        <h3>The interview loop</h3>
        <table>
          <thead><tr><th>Stage</th><th>What they're really testing</th></tr></thead>
          <tbody>
            <tr><td><strong>Screen</strong></td><td>Can you explain your own projects clearly?</td></tr>
            <tr><td><strong>Coding</strong></td><td>Can you write clean code, ideally with AI assistance and judgment?</td></tr>
            <tr><td><strong>System design</strong></td><td>Can you reason about trade-offs at scale?</td></tr>
            <tr><td><strong>ML/AI depth</strong></td><td>Do you understand the fundamentals, not just the APIs?</td></tr>
            <tr><td><strong>Behavioral</strong></td><td>Ownership, ambiguity, and collaboration</td></tr>
          </tbody>
        </table>

        <h3>Answering behavioral questions</h3>
        <p>Use STAR — Situation, Task, Action, Result — and end with what you learned. One concrete story beats three vague ones.</p>

        <h3>Negotiation</h3>
        <ul>
          <li><strong>Never accept on the call.</strong> "Thank you — I'd like a day to review." Always reasonable.</li>
          <li><strong>Negotiate the whole package</strong> — base, bonus, equity, remote, learning budget, title.</li>
          <li><strong>Anchor with evidence</strong> — market data and competing offers, not "I want more."</li>
          <li><strong>Be willing to walk</strong> for the offer to have weight — but only if it's true.</li>
        </ul>

        <Callout good label="The closing truth">
          Interviewing for AI is interviewing for judgment. Anyone can call an API. The people who get hired can say what they'd do, what it costs, and how they'd know it worked.
        </Callout>

        <Quiz scoreKey="m45" questions={[
          {
            q: 'What most separates a strong AI portfolio?',
            options: [
              'The number of projects',
              'READ ME files that explain decisions, trade-offs, and evals',
              'Using the newest model',
              'A fancy UI',
            ],
            answer: 1,
            explain: 'Decisions and evaluations show engineering maturity.',
          },
          {
            q: 'What should you do immediately after a verbal offer?',
            options: [
              'Accept on the spot',
              'Thank them and ask for a day to review, then negotiate the package',
              'Reject it',
              'Ask for a higher title only',
            ],
            answer: 1,
            explain: 'Always review and negotiate the whole package.',
          },
        ]} />
      </>
    ),
  },
]