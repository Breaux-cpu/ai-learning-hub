import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import Quiz from '../components/Quiz'

export const PART7 = [
  {
    id: 'm27',
    num: 27,
    title: 'AI Ethics & Responsible AI',
    group: 'Advanced',
    kicker: 'MODULE 27 · ADVANCED',
    body: (
      <>
        <p>AI systems inherit the values of their data and their builders. Responsible AI is the practice of building systems that are <strong>fair, transparent, private, and accountable</strong> — not just capable.</p>

        <h3>Bias & fairness</h3>
        <ul>
          <li><strong>Data bias</strong> — models learn the biases in their training data. If hiring data is biased, the model is biased.</li>
          <li><strong>Representation bias</strong> — under-represented groups get worse results (e.g., speech recognition failing on certain accents).</li>
          <li><strong>Feedback loops</strong> — biased outputs shape future data, amplifying the bias over time.</li>
        </ul>
        <p>The fix starts with <strong>auditing your data</strong>, measuring outcomes across groups, and testing for disparate impact before shipping.</p>

        <h3>Privacy</h3>
        <ul>
          <li>Minimize data collection — only gather what the task needs.</li>
          <li>Anonymize and de-identify where possible.</li>
          <li>Know what your model provider does with your data (this is why local models matter — Module 13).</li>
          <li>Respect retention limits — don't keep data forever.</li>
        </ul>

        <h3>Transparency & explainability</h3>
        <ul>
          <li>Users should know when they're interacting with AI.</li>
          <li>Document what a model can and can't do (model cards).</li>
          <li>For high-stakes decisions, prefer explainable methods or add human review.</li>
        </ul>

        <h3>Accountability</h3>
        <p>An AI system can't be responsible — <strong>people are</strong>. Someone must own the outcome: the developer, the deployer, the operator. That's why "the agent writes the code, you own the quality" is an ethics principle, not just a workflow tip.</p>

        <h3>The regulatory landscape</h3>
        <table>
          <thead><tr><th>Framework</th><th>What it does</th></tr></thead>
          <tbody>
            <tr><td><strong>EU AI Act</strong></td><td>Risk-based regulation: bans unacceptable uses, strict rules for high-risk systems</td></tr>
            <tr><td><strong>GDPR</strong></td><td>Data protection: consent, right to explanation, data minimization</td></tr>
            <tr><td><strong>NIST AI RMF</strong></td><td>Voluntary framework: govern, map, measure, manage</td></tr>
          </tbody>
        </table>

        <Callout good label="A practical checklist before you ship">
          <ul>
            <li>Have I tested outcomes across different groups?</li>
            <li>Do users know they're talking to AI?</li>
            <li>Is there a human accountable for failures?</li>
            <li>What data am I collecting, and is it necessary?</li>
            <li>Can I explain what the system does and its limits?</li>
          </ul>
        </Callout>

        <Quiz questions={[
          {
            q: 'Where does model bias come from?',
            options: [
              'The hardware it runs on',
              'The data it was trained on',
              'The programming language',
              'The API key',
            ],
            answer: 1,
            explain: 'Models learn patterns — including biases — from their training data.',
          },
          {
            q: 'Who is accountable for an AI system\'s failures?',
            options: [
              'The model itself',
              'The people who build and deploy it',
              'Nobody',
              'The users',
            ],
            answer: 1,
            explain: 'AI can\'t be responsible. People own the outcomes.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm28',
    num: 28,
    title: 'Evaluation & LLMOps',
    group: 'Advanced',
    kicker: 'MODULE 28 · ADVANCED',
    body: (
      <>
        <p>You can't improve what you can't measure. <strong>Evaluation</strong> is the discipline of testing AI output systematically — and it's the difference between a demo and a product.</p>

        <h3>Why evals matter</h3>
        <p>LLMs are stochastic — the same prompt can give different answers. "It worked in my test" is not evidence. You need a <strong>golden set</strong>: a fixed set of inputs with known-good answers, run on every change.</p>

        <h3>Types of evaluation</h3>
        <table>
          <thead><tr><th>Method</th><th>What it measures</th><th>When to use</th></tr></thead>
          <tbody>
            <tr><td><strong>Golden set</strong></td><td>Accuracy against curated Q&A pairs</td><td>Always — the baseline</td></tr>
            <tr><td><strong>LLM-as-judge</strong></td><td>Another model scores output quality</td><td>Subjective tasks: tone, helpfulness, structure</td></tr>
            <tr><td><strong>Reference metrics</strong></td><td>ROUGE, BLEU, F1 vs a reference</td><td>Summarization, translation</td></tr>
            <tr><td><strong>Human review</strong></td><td>People rate a sample</td><td>High-stakes or ambiguous output</td></tr>
          </tbody>
        </table>

        <h3>LLM-as-judge</h3>
        <p>Use a strong model to grade a weaker one. Give it a rubric and ask for a score with reasoning:</p>
        <CodeBlock code={`You are an evaluator. Score the assistant's
answer on: correctness (0-5), completeness
(0-5), and clarity (0-5). Explain each score.

Question: {question}
Reference: {reference}
Assistant: {answer}`} />
        <Callout warn label="Judge bias">
          LLM judges have biases — they favor longer answers, their own style, and position in the list. Mitigate with clear rubrics, reference answers, and multiple judges.
        </Callout>

        <h3>Evals as a regression gate</h3>
        <p>Wire evals into CI. Every prompt change, model swap, or RAG update runs the golden set. If scores drop, the change is rejected. This is the same discipline as unit tests for code — and it's what makes agent sessions safe (Module 18).</p>
        <CodeBlock code={`# CI pipeline (conceptual)
1. run golden set against new config
2. compare scores to baseline
3. if any metric drops > threshold → fail
4. if pass → promote to production`} />

        <h3>Production monitoring</h3>
        <ul>
          <li><strong>Latency & cost</strong> — track tokens per request, p95 latency.</li>
          <li><strong>Drift</strong> — watch for input distribution changes over time.</li>
          <li><strong>Feedback</strong> — collect thumbs up/down and sample for review.</li>
          <li><strong>Incidents</strong> — log failures and feed them back into the eval set.</li>
        </ul>

        <Callout label="The eval loop">
          Golden set → run on every change → catch regressions → add real failures to the set → repeat. Your eval set is the memory of everything you've learned.
        </Callout>
      </>
    ),
  },

  {
    id: 'm29',
    num: 29,
    title: 'Multimodal AI',
    group: 'Advanced',
    kicker: 'MODULE 29 · ADVANCED',
    body: (
      <>
        <p>Text is just one modality. Modern AI also sees, hears, and generates images and audio — and multimodal models combine several at once.</p>

        <h3>Vision</h3>
        <ul>
          <li><strong>CNNs</strong> — classic image models using convolutional filters to detect edges, textures, objects.</li>
          <li><strong>Vision Transformers (ViT)</strong> — apply attention to image patches; the modern standard.</li>
          <li><strong>CLIP</strong> — learns a shared space for images and text, enabling zero-shot classification and image search.</li>
        </ul>

        <h3>Audio & speech</h3>
        <ul>
          <li><strong>Speech-to-text</strong> — Whisper and similar transcribe audio.</li>
          <li><strong>Text-to-speech</strong> — natural voices from text.</li>
          <li><strong>Voice agents</strong> — STT → LLM → TTS pipelines for phone and assistant use.</li>
        </ul>

        <h3>Image generation</h3>
        <p><strong>Diffusion models</strong> generate images by learning to reverse a process that adds noise to pictures. Start from pure noise, denoise step by step, and a coherent image emerges. Text-to-image (Stable Diffusion, DALL·E) conditions this on a prompt; img2img and inpainting edit existing images.</p>

        <h3>Multimodal LLMs</h3>
        <p>Frontier models accept images, audio, and video alongside text. A coding agent can look at a screenshot of a bug, read the error, and fix the code. This is where agents are heading — perception plus action.</p>

        <Callout label="Why it matters for you">
          Multimodal capability is now table stakes for frontier models and increasingly for local ones. When choosing a model, ask what modalities your task actually needs — don't pay for vision you never use.
        </Callout>

        <Quiz questions={[
          {
            q: 'How do diffusion models generate images?',
            options: [
              'By copying from a database',
              'By reversing a noise-adding process step by step',
              'By drawing with vectors',
              'By filtering photos',
            ],
            answer: 1,
            explain: 'Diffusion learns to denoise: start from noise, remove it iteratively, and an image emerges.',
          },
          {
            q: 'What does CLIP enable?',
            options: [
              'Faster training',
              'A shared space between images and text',
              'Better compression',
              'Smaller models',
            ],
            answer: 1,
            explain: 'CLIP maps images and text into one space, enabling zero-shot classification and image search.',
          },
        ]} />
      </>
    ),
  },

  {
    id: 'm30',
    num: 30,
    title: 'Production & Deployment',
    group: 'Advanced',
    kicker: 'MODULE 30 · ADVANCED',
    body: (
      <>
        <p>Getting a model from a notebook to a reliable service is its own skill. Here's the production stack in one module.</p>

        <h3>Serving models</h3>
        <table>
          <thead><tr><th>Tool</th><th>Best for</th></tr></thead>
          <tbody>
            <tr><td><strong>Ollama / LM Studio</strong></td><td>Local dev, single user, quick start</td></tr>
            <tr><td><strong>vLLM</strong></td><td>High-throughput serving with PagedAttention; the production standard</td></tr>
            <tr><td><strong>Text Generation Inference (TGI)</strong></td><td>Hugging Face's optimized server</td></tr>
            <tr><td><strong>Cloud APIs</strong></td><td>Frontier models without infrastructure</td></tr>
          </tbody>
        </table>

        <h3>Quantization in production</h3>
        <p>Quantized formats (GGUF for llama.cpp, AWQ/GPTQ for GPU) shrink models dramatically. A Q4 32B model fits in ~20GB VRAM. The trade-off is a small quality dip for a big cost saving — usually worth it.</p>

        <h3>MCP — Model Context Protocol</h3>
        <p>MCP is the emerging open standard for connecting models to tools and data. Instead of every agent reinventing tool integration, MCP defines a common protocol: a <strong>host</strong> (the agent), <strong>clients</strong> (apps), and <strong>servers</strong> (tools/data providers). One MCP server works across many agents.</p>
        <CodeBlock code={`# Conceptual MCP layout
Agent (host)
 ├── MCP client ──▶ filesystem server
 ├── MCP client ──▶ database server
 └── MCP client ──▶ web-search server`} />

        <h3>Cost control</h3>
        <ul>
          <li>Track tokens per request and per user.</li>
          <li>Cache repeated prompts/responses.</li>
          <li>Route easy tasks to cheap/small models, hard ones to frontier models.</li>
          <li>Set hard caps — unbounded consumption is OWASP LLM #10.</li>
        </ul>

        <h3>Observability</h3>
        <p>Log prompts, completions, latency, cost, and errors. Sample for review. Feed failures back into your eval set (Module 28). A model you can't observe is a model you can't trust.</p>

        <Callout good label="The production checklist">
          <ul>
            <li>Eval gate in CI before deploy</li>
            <li>Quantized model sized to your hardware</li>
            <li>Rate limits and cost caps</li>
            <li>Prompt/completion logging with sampling</li>
            <li>Rollback plan (version your prompts and models)</li>
          </ul>
        </Callout>
      </>
    ),
  },
]