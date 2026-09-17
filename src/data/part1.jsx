import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import Quiz from '../components/Quiz'

export const PART1 = [
  {
    id: 'm01',
    num: 1,
    title: 'Welcome',
    group: 'Start',
    kicker: 'MODULE 01 · START',
    body: (
      <>
        <p>You're about to learn <strong>AI from the ground up</strong> — from what machine learning actually is, to how large language models work, to using AI agents that run on your own machine to write, edit, debug, and refactor code. This is the skill that turns a single developer into a small team.</p>
        <p>This site is interactive. Use the sidebar to navigate, mark modules complete as you go, and take the quizzes. Your progress is saved in your browser.</p>
        <div className="grid2">
          <div className="card">
            <h4>What you'll learn</h4>
            <ul>
              <li>AI fundamentals: ML, neural networks, how models learn</li>
              <li>LLMs: tokens, context, prompting, RAG, fine-tuning</li>
              <li>How coding agents actually work</li>
              <li>Local vs cloud models — and when to use each</li>
              <li>Setting up your own agent environment</li>
              <li>Context engineering (the #1 skill)</li>
              <li>Security and common pitfalls</li>
            </ul>
          </div>
          <div className="card">
            <h4>How to use this site</h4>
            <ul>
              <li>Read each module top to bottom</li>
              <li>Run the code examples yourself</li>
              <li>Try the terminal simulator</li>
              <li>Take the quizzes — they're graded</li>
              <li>Click <em>Mark complete</em> at the end of each module</li>
            </ul>
          </div>
        </div>
        <Callout variant="good" label="The big idea">
          An agentic coding agent is not autocomplete. It's a collaborator that can read your whole project, plan changes, edit files, run commands, see the results, and iterate until the job is done.
        </Callout>
      </>
    ),
  },

  {
    id: 'm02',
    num: 2,
    title: 'What Is AI?',
    group: 'AI Foundations',
    kicker: 'MODULE 02 · AI FOUNDATIONS',
    body: (
      <>
        <p>Artificial intelligence is the field of building machines that perform tasks that normally require human intelligence — seeing, understanding language, reasoning, and deciding. Today, almost all of it is <strong>machine learning</strong>: systems that learn patterns from data instead of following hand-written rules.</p>

        <h3>A very short history</h3>
        <table>
          <thead><tr><th>Era</th><th>Milestone</th></tr></thead>
          <tbody>
            <tr><td><strong>1950s</strong></td><td>Turing's "Computing Machinery and Intelligence"; the Dartmouth workshop coins "artificial intelligence"</td></tr>
            <tr><td><strong>1960s–70s</strong></td><td>Rule-based expert systems; first "AI winter" as hype outran capability</td></tr>
            <tr><td><strong>1980s–90s</strong></td><td>Neural networks return (backpropagation); machine learning goes mainstream in search, spam filters</td></tr>
            <tr><td><strong>2010s</strong></td><td>Deep learning explodes: image recognition, speech, AlphaGo, transformers (2017)</td></tr>
            <tr><td><strong>2020s</strong></td><td>LLMs and generative AI go mainstream; agents begin writing code</td></tr>
          </tbody>
        </table>

        <h3>Types of AI</h3>
        <ul>
          <li><strong>Narrow AI (ANI)</strong> — excels at one task: image recognition, translation, code completion. <em>Everything we have today is narrow AI.</em></li>
          <li><strong>General AI (AGI)</strong> — matches human ability across any intellectual task. Still research.</li>
          <li><strong>Superintelligence (ASI)</strong> — exceeds human ability everywhere. Hypothetical.</li>
        </ul>

        <h3>What AI can and can't do today</h3>
        <div className="grid2">
          <div className="card">
            <h4>✅ Can do</h4>
            <ul>
              <li>Understand and generate natural language</li>
              <li>Write, review, and debug code</li>
              <li>Recognize images, speech, and patterns</li>
              <li>Summarize, translate, and search</li>
              <li>Plan and execute multi-step tasks (agents)</li>
            </ul>
          </div>
          <div className="card">
            <h4>❌ Can't do (yet)</h4>
            <ul>
              <li>Reason reliably about novel situations</li>
              <li>Know when it's wrong (hallucination)</li>
              <li>Have persistent memory or true understanding</li>
              <li>Guarantee correctness without verification</li>
              <li>Be trusted without human review</li>
            </ul>
          </div>
        </div>

        <Callout label="Mental model">
          AI is a <em>statistical pattern matcher</em>, not a mind. It predicts what's likely given what it has seen. That makes it astonishingly useful — and means you must verify its output.
        </Callout>

        <Quiz questions={[
          {
            q: 'What is machine learning?',
            options: [
              'Programs that follow hand-written rules',
              'Systems that learn patterns from data',
              'Robots that walk',
              'A type of database',
            ],
            answer: 1,
            explain: 'ML systems learn patterns from data rather than being explicitly programmed with rules.',
          },
          {
            q: 'What kind of AI exists today?',
            options: [
              'General AI (AGI)',
              'Superintelligence (ASI)',
              'Narrow AI (ANI)',
              'All of the above',
            ],
            answer: 2,
            explain: 'Everything deployed today is narrow AI — great at specific tasks, not general intelligence.',
          },
          {
            q: 'Why must you verify AI output?',
            options: [
              'Because it is slow',
              'Because it can hallucinate confidently',
              'Because it costs money',
              'Because it runs locally',
            ],
            answer: 1,
            explain: 'Models produce plausible-sounding but wrong output. Verification is non-negotiable.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm03',
    num: 3,
    title: 'Machine Learning Fundamentals',
    group: 'AI Foundations',
    kicker: 'MODULE 03 · AI FOUNDATIONS',
    body: (
      <>
        <p>Machine learning is the engine under everything. Understand these basics and the rest of the course clicks into place.</p>

        <h3>The three learning paradigms</h3>
        <table>
          <thead><tr><th>Paradigm</th><th>Input</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><strong>Supervised</strong></td><td>Inputs + labeled answers</td><td>Emails labeled spam/not-spam → a spam filter</td></tr>
            <tr><td><strong>Unsupervised</strong></td><td>Inputs only</td><td>Customer data → clusters of similar users</td></tr>
            <tr><td><strong>Reinforcement</strong></td><td>Actions + rewards</td><td>Game moves → a policy that wins</td></tr>
          </tbody>
        </table>

        <h3>Key vocabulary</h3>
        <ul>
          <li><strong>Features</strong> — the inputs a model looks at (pixels, words, numbers).</li>
          <li><strong>Labels</strong> — the correct answers used in supervised learning.</li>
          <li><strong>Training</strong> — the process of adjusting the model to fit the data.</li>
          <li><strong>Inference</strong> — using the trained model to make predictions on new data.</li>
          <li><strong>Parameters</strong> — the internal numbers the model learns (weights and biases).</li>
        </ul>

        <h3>Overfitting vs underfitting</h3>
        <div className="grid2">
          <div className="card">
            <h4>Underfitting</h4>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>The model is too simple — it misses the pattern entirely. High error on both training and new data.</p>
          </div>
          <div className="card">
            <h4>Overfitting</h4>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>The model memorizes the training data instead of learning the pattern. Great on training, terrible on new data.</p>
          </div>
        </div>

        <h3>The train / validation / test split</h3>
        <p>You never evaluate a model on the data it trained on — it would just be memorization. Split your data:</p>
        <ul>
          <li><strong>Train</strong> (usually ~80%) — the model learns from this.</li>
          <li><strong>Validation</strong> (~10%) — tune hyperparameters and check progress.</li>
          <li><strong>Test</strong> (~10%) — final, untouched evaluation.</li>
        </ul>

        <Callout warn label="Why this matters for agents">
          When an agent "verifies" by running your tests, it's doing the same thing: checking generalization on data it didn't see. A test that was written to pass is worthless — the same way a model evaluated on its training data looks perfect but is useless.
        </Callout>

        <Quiz questions={[
          {
            q: 'Spam filtering with labeled emails is an example of:',
            options: ['Unsupervised learning', 'Supervised learning', 'Reinforcement learning', 'Rule-based programming'],
            answer: 1,
            explain: 'Labeled inputs (spam/not-spam) with known answers = supervised learning.',
          },
          {
            q: 'A model that memorizes training data but fails on new data is:',
            options: ['Underfitting', 'Overfitting', 'Well-tuned', 'Reinforced'],
            answer: 1,
            explain: 'Overfitting = memorizing the training set instead of learning the underlying pattern.',
          },
          {
            q: 'Why do we keep a separate test set?',
            options: [
              'To make training faster',
              'To evaluate on data the model never saw',
              'To store backups',
              'To label more data',
            ],
            answer: 1,
            explain: 'The test set measures real generalization, untouched by training.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm04',
    num: 4,
    title: 'Neural Networks & Deep Learning',
    group: 'AI Foundations',
    kicker: 'MODULE 04 · AI FOUNDATIONS',
    body: (
      <>
        <p>Neural networks are the workhorse of modern AI. They're loosely inspired by neurons in the brain — but really they're just <strong>layers of math</strong> that learn to transform input into output.</p>

        <h3>The building blocks</h3>
        <ul>
          <li><strong>Neuron (unit)</strong> — takes several inputs, multiplies each by a weight, adds a bias, and passes the sum through an activation function.</li>
          <li><strong>Layer</strong> — a group of neurons. Deep networks stack many layers.</li>
          <li><strong>Weights & biases</strong> — the learnable parameters. Training adjusts them.</li>
          <li><strong>Activation function</strong> — adds non-linearity (ReLU, sigmoid, tanh), letting the network learn complex patterns.</li>
        </ul>

        <CodeBlock code={`// A single neuron, in spirit
function neuron(inputs, weights, bias) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) sum += inputs[i] * weights[i];
  return activation(sum);   // e.g. ReLU: max(0, sum)
}`} />

        <h3>How a network is structured</h3>
        <pre><code>Input layer ──▶ Hidden layers ──▶ Output layer
   (features)      (learned        (prediction)
                    features)</code></pre>
        <p>Each layer transforms its input into a slightly more abstract representation. Early layers detect simple things (edges, letters); later layers combine them into complex concepts (faces, sentences, code patterns).</p>

        <h3>Backpropagation — how it learns</h3>
        <ol>
          <li><strong>Forward pass</strong> — data flows through the network, producing a prediction.</li>
          <li><strong>Loss</strong> — a number measuring how wrong the prediction was.</li>
          <li><strong>Backward pass</strong> — the error is propagated backward, computing how much each weight contributed.</li>
          <li><strong>Update</strong> — weights shift slightly to reduce the loss.</li>
        </ol>
        <p>Repeat millions of times and the network "learns." This is gradient descent — covered next.</p>

        <Callout label="Deep learning">
          "Deep" just means <em>many layers</em>. Deep networks can represent far more complex functions than shallow ones — which is why they dominate image, speech, and language tasks.
        </Callout>
      </>
    ),
  },

  {
    id: 'm05',
    num: 5,
    title: 'How Models Learn',
    group: 'AI Foundations',
    kicker: 'MODULE 05 · AI FOUNDATIONS',
    body: (
      <>
        <p>Training a model is an optimization problem: <strong>find the parameters that minimize the loss</strong>. Here's the machinery.</p>

        <h3>Loss functions</h3>
        <p>A loss function scores how wrong a prediction is. Common ones:</p>
        <ul>
          <li><strong>Mean squared error</strong> — for regression (predicting numbers).</li>
          <li><strong>Cross-entropy</strong> — for classification (predicting categories).</li>
          <li><strong>Perplexity</strong> — for language models (how surprised the model is by real text).</li>
        </ul>

        <h3>Gradient descent</h3>
        <p>Imagine standing on a foggy hill and trying to reach the valley. You feel the slope under your feet and step downhill. That's gradient descent:</p>
        <CodeBlock code={`# Pseudocode
for each epoch:
    for each batch of data:
        loss = model(batch)          # how wrong are we?
        gradient = derivative(loss)  # which way is downhill?
        weights -= learning_rate * gradient  # take a step`} />

        <h3>Key hyperparameters</h3>
        <table>
          <thead><tr><th>Hyperparameter</th><th>What it controls</th></tr></thead>
          <tbody>
            <tr><td><strong>Learning rate</strong></td><td>Step size. Too big → overshoot; too small → painfully slow.</td></tr>
            <tr><td><strong>Batch size</strong></td><td>How many examples per update. Affects stability and speed.</td></tr>
            <tr><td><strong>Epochs</strong></td><td>How many full passes over the data.</td></tr>
            <tr><td><strong>Regularization</strong></td><td>Penalties that fight overfitting (dropout, weight decay).</td></tr>
          </tbody>
        </table>

        <h3>Data quality beats everything</h3>
        <p>The single biggest lever on model quality is the data. Garbage in, garbage out — no amount of clever training fixes bad data. This is why <strong>your project's tests and docs</strong> matter so much for agents: they're the "data" the agent learns from.</p>

        <Callout good label="The takeaway">
          Training = minimizing loss by nudging parameters downhill. Everything else — architectures, tricks, scaling — is engineering around this one idea.
        </Callout>
      </>
    ),
  },
]