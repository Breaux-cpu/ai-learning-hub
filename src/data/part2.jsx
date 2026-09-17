import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import Quiz from '../components/Quiz'

export const PART2 = [
  {
    id: 'm06',
    num: 6,
    title: 'What Is an LLM?',
    group: 'LLMs',
    kicker: 'MODULE 06 · LLMs',
    body: (
      <>
        <p>A <strong>large language model</strong> (LLM) is a neural network trained on enormous amounts of text. It predicts the next token (roughly a word fragment) given everything before it. That's it — everything else is engineering on top.</p>

        <h3>Tokens</h3>
        <p>Models don't read characters or words — they read <strong>tokens</strong>, which are chunks of text. "Hello world" might be 2 tokens; a rare word might be 3. Token count is how context windows and API pricing are measured.</p>
        <CodeBlock code={`"The quick brown fox"  →  ["The", " quick", " brown", " fox"]
# ~4 tokens. A typical English word ≈ 1.3 tokens.`} />

        <h3>The context window</h3>
        <p>Every model has a maximum amount of text it can "see" at once — its <strong>context window</strong>. Small local models might have 8K–32K tokens; top cloud models have 200K–1M. Everything the model knows about your task must fit in this window.</p>
        <Callout warn label="Why this matters">
          Context is the scarcest resource in AI work. A bloated project, huge files, or verbose prompts crowd out the code the model actually needs to see. Managing context is the #1 skill — covered in Module 15.
        </Callout>

        <h3>How an LLM is built</h3>
        <ol>
          <li><strong>Pretraining</strong> — predict the next token across trillions of tokens of internet text. This is where the model learns language, facts, and reasoning. Costs millions of dollars.</li>
          <li><strong>Supervised fine-tuning (SFT)</strong> — train on curated question/answer pairs to behave like an assistant.</li>
          <li><strong>RLHF / preference tuning</strong> — humans rank outputs; the model learns to prefer the good ones. This is what makes models helpful and safe.</li>
        </ol>

        <h3>Sampling: temperature and friends</h3>
        <p>At inference, the model assigns probabilities to every possible next token, then <em>samples</em> one. Controls:</p>
        <ul>
          <li><strong>Temperature</strong> — higher = more random/creative; lower = more deterministic.</li>
          <li><strong>Top-p</strong> — only sample from the most probable tokens whose combined mass reaches p.</li>
          <li><strong>Max tokens</strong> — cap on output length.</li>
        </ul>

        <h3>The transformer</h3>
        <p>Modern LLMs use the <strong>transformer</strong> architecture (2017). Its key idea is <strong>attention</strong>: every token looks at every other token and decides how much to weigh it. That's how "it" in "the cat sat on the mat because <em>it</em> was tired" knows to refer to the cat.</p>

        <Quiz questions={[
          {
            q: 'What does an LLM fundamentally do?',
            options: [
              'Executes code',
              'Predicts the next token given the previous ones',
              'Searches the web',
              'Stores facts in a database',
            ],
            answer: 1,
            explain: 'An LLM predicts the next token. Everything else is built on top of that.',
          },
          {
            q: 'What is the context window?',
            options: [
              'A popup in the browser',
              'The maximum text the model can see at once',
              'The model\'s training data',
              'A debugging tool',
            ],
            answer: 1,
            explain: 'The context window is the max tokens the model can process at once — the scarcest resource.',
          },
          {
            q: 'Higher temperature makes output:',
            options: ['More deterministic', 'More random and creative', 'Faster', 'Shorter'],
            answer: 1,
            explain: 'Higher temperature increases randomness; lower makes output more predictable.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm07',
    num: 7,
    title: 'Prompt Engineering',
    group: 'LLMs',
    kicker: 'MODULE 07 · LLMs',
    body: (
      <>
        <p>Prompting is how you steer a model without retraining it. Good prompts are specific, structured, and give the model a role and constraints.</p>

        <h3>Core techniques</h3>
        <table>
          <thead><tr><th>Technique</th><th>What it is</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><strong>Zero-shot</strong></td><td>Ask directly, no examples</td><td>"Summarize this email."</td></tr>
            <tr><td><strong>Few-shot</strong></td><td>Give 2–5 examples first</td><td>"Here are 3 examples of good summaries. Now summarize this."</td></tr>
            <tr><td><strong>Chain-of-thought</strong></td><td>Ask the model to reason step by step</td><td>"Think through this step by step before answering."</td></tr>
            <tr><td><strong>Role prompting</strong></td><td>Assign a persona</td><td>"You are a senior Python reviewer."</td></tr>
            <tr><td><strong>Structured output</strong></td><td>Demand a format</td><td>"Return JSON with keys: title, summary, risk."</td></tr>
          </tbody>
        </table>

        <h3>System prompts</h3>
        <p>Before your request, the model receives a <strong>system prompt</strong> — standing instructions that define behavior, tone, and rules. In agent tools, project files like <code>AGENTS.md</code> are injected here (see Module 15).</p>
        <CodeBlock code={`You are a careful coding assistant.
- Read code before editing it.
- Make minimal changes.
- Never add comments unless asked.
- Run tests and report results.`} />

        <h3>Common mistakes</h3>
        <ul>
          <li><strong>Vague goals</strong> — "make it better" produces random changes.</li>
          <li><strong>No constraints</strong> — the model over-engineers by default.</li>
          <li><strong>No verification demand</strong> — you get confident, untested output.</li>
          <li><strong>Too much context</strong> — dumping whole files crowds out the important parts.</li>
        </ul>

        <Callout good label="The recipe">
          State the goal → give the symptom with specifics → set constraints → demand verification → define "done."
        </Callout>

        <Quiz questions={[
          {
            q: 'Few-shot prompting means:',
            options: [
              'Using a small model',
              'Giving a few examples before the real request',
              'Asking a short question',
              'Running the model on a GPU',
            ],
            answer: 1,
            explain: 'Few-shot = providing 2–5 examples to show the model the desired pattern.',
          },
          {
            q: 'Chain-of-thought prompting:',
            options: [
              'Makes output longer for no reason',
              'Asks the model to reason step by step, improving accuracy',
              'Only works on cloud models',
              'Is a security risk',
            ],
            answer: 1,
            explain: 'Step-by-step reasoning measurably improves performance on complex tasks.',
          },
          {
            q: 'A system prompt is:',
            options: [
              'The model\'s operating system',
              'Standing instructions loaded before your request',
              'A prompt that crashes the model',
              'A type of few-shot example',
            ],
            answer: 1,
            explain: 'System prompts define behavior and rules for the whole session.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm08',
    num: 8,
    title: 'RAG & Grounding',
    group: 'LLMs',
    kicker: 'MODULE 08 · LLMs',
    body: (
      <>
        <p>Models only know what was in their training data — which is frozen in time and may not include <em>your</em> code, docs, or private knowledge. <strong>Retrieval-Augmented Generation (RAG)</strong> fixes this by giving the model relevant documents at query time.</p>

        <h3>The RAG flow</h3>
        <ol>
          <li><strong>Index</strong> — split your documents into chunks and store them in a vector database.</li>
          <li><strong>Embed</strong> — convert text into vectors (lists of numbers) where similar meaning = nearby vectors.</li>
          <li><strong>Retrieve</strong> — at query time, find the chunks most similar to the question.</li>
          <li><strong>Generate</strong> — stuff the retrieved chunks into the prompt and let the model answer with them as context.</li>
        </ol>
        <CodeBlock code={`# Conceptual
question = embed("How does auth work here?")
chunks   = vector_db.search(question, top_k=5)
answer   = llm(f"Context:\\n{chunks}\\n\\nQuestion: {question}")`} />

        <h3>Why RAG matters</h3>
        <ul>
          <li><strong>Grounding</strong> — the model answers from your actual documents, not its guesses.</li>
          <li><strong>Freshness</strong> — no retraining needed when docs change; just re-index.</li>
          <li><strong>Privacy</strong> — you control what goes into the prompt.</li>
          <li><strong>Hallucination reduction</strong> — with the right context, the model is far less likely to invent things.</li>
        </ul>

        <h3>RAG vs fine-tuning</h3>
        <table>
          <thead><tr><th></th><th>RAG</th><th>Fine-tuning</th></tr></thead>
          <tbody>
            <tr><td><strong>Best for</strong></td><td>Facts, docs, changing knowledge</td><td>Style, format, behavior</td></tr>
            <tr><td><strong>Cost</strong></td><td>Cheap, no training</td><td>Expensive, needs GPU time</td></tr>
            <tr><td><strong>Freshness</strong></td><td>Instant (re-index)</td><td>Requires retraining</td></tr>
            <tr><td><strong>Risk</strong></td><td>Retrieval can miss</td><td>Can degrade other abilities</td></tr>
          </tbody>
        </table>

        <Callout label="In agent tools">
          When an agent reads your files before answering, it's doing a form of RAG — retrieving the relevant context and grounding its answer in it. That's why "read the code first" is such a powerful instruction.
        </Callout>
      </>
    ),
  },

  {
    id: 'm09',
    num: 9,
    title: 'Fine-Tuning & Customization',
    group: 'LLMs',
    kicker: 'MODULE 09 · LLMs',
    body: (
      <>
        <p>Fine-tuning continues training a pretrained model on your own data. It's powerful — and usually unnecessary. Know when to reach for it.</p>

        <h3>When to fine-tune</h3>
        <div className="grid2">
          <div className="card">
            <h4>✅ Good reasons</h4>
            <ul>
              <li>You need a consistent output format (e.g., always JSON)</li>
              <li>Your domain has unusual vocabulary or style</li>
              <li>You want a smaller, cheaper model to match a big one on a narrow task</li>
              <li>Prompting + RAG already hit their ceiling</li>
            </ul>
          </div>
          <div className="card">
            <h4>❌ Bad reasons</h4>
            <ul>
              <li>"To teach it facts" — use RAG instead</li>
              <li>"To make it smarter" — use a bigger model</li>
              <li>You have no evaluation set to measure improvement</li>
              <li>You haven't tried good prompting yet</li>
            </ul>
          </div>
        </div>

        <h3>Efficient methods</h3>
        <p>Full fine-tuning updates every parameter — expensive. Modern approaches are far cheaper:</p>
        <ul>
          <li><strong>LoRA</strong> — trains small low-rank adapter matrices instead of the whole model. A few GB of VRAM can fine-tune a 7B model.</li>
          <li><strong>QLoRA</strong> — LoRA on a quantized base model. Runs on consumer GPUs.</li>
          <li><strong>Adapter weights</strong> — the base model stays frozen; you ship a small adapter file.</li>
        </ul>

        <h3>The fine-tuning pipeline</h3>
        <ol>
          <li><strong>Collect data</strong> — hundreds to thousands of high-quality examples of the exact behavior you want.</li>
          <li><strong>Clean it</strong> — remove errors, contradictions, and duplicates. Quality beats quantity.</li>
          <li><strong>Split</strong> — keep a held-out eval set you never train on.</li>
          <li><strong>Train</strong> — with LoRA/QLoRA on a modest GPU.</li>
          <li><strong>Evaluate</strong> — compare against the base model on your eval set. If it's not clearly better, don't ship it.</li>
        </ol>

        <Callout danger label="The trap">
          Fine-tuning is a project, not a setting. It needs data, compute, and evaluation. For most people, <strong>prompting + RAG + a good agent harness</strong> deliver 90% of the value at 1% of the cost.
        </Callout>
      </>
    ),
  },
]