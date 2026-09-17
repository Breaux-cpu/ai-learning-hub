export const PROMPTS = [
  {
    id: 'p1',
    category: 'Coding',
    title: 'Implement a feature',
    prompt: `Implement [feature] in [file/project].

Requirements:
- Follow the existing code style and patterns
- No new dependencies unless necessary
- No over-engineering

Verify:
- Run the test suite and paste results
- Run lint and typecheck
- Show me the diff`,
  },
  {
    id: 'p2',
    category: 'Coding',
    title: 'Explain code',
    prompt: `Explain what this code does, section by section. Be concise.

[Paste code]

For each section, note:
1. What it does
2. Any bugs or risks you spot
3. How it could be simplified`,
  },
  {
    id: 'p3',
    category: 'Debugging',
    title: 'Debug a failure',
    prompt: `I'm getting this error:

[Paste error]

Context:
- What I'm trying to do: [goal]
- What I've tried: [attempts]
- Relevant code: [paste]

Diagnose the root cause, then propose the minimal fix. Do not guess — trace the actual flow.`,
  },
  {
    id: 'p4',
    category: 'Debugging',
    title: 'Investigate a bug',
    prompt: `Something is wrong but I don't know why.

Symptom: [describe what happens]
Expected: [what should happen]
When it started: [if known]

Investigate systematically:
1. List hypotheses ranked by likelihood
2. For each, what evidence would confirm or rule it out
3. Check the most likely one first and report what you find`,
  },
  {
    id: 'p5',
    category: 'Writing',
    title: 'Draft and tighten',
    prompt: `Write a [type: email/post/doc] about [topic] for [audience].

Tone: [professional / casual / persuasive]
Length: [target]

Then:
- Cut every word that doesn't add value
- Remove clichés and filler
- Keep the strongest point first`,
  },
  {
    id: 'p6',
    category: 'Writing',
    title: 'Summarize',
    prompt: `Summarize the following in [N] bullet points. Capture the key facts and decisions, skip the fluff. If anything is ambiguous, flag it.

[Paste text]`,
  },
  {
    id: 'p7',
    category: 'Analysis',
    title: 'Compare options',
    prompt: `Compare [option A] vs [option B] for [use case].

Evaluate on:
- [criterion 1]
- [criterion 2]
- [criterion 3]

Give a recommendation with reasoning, and state what would change your mind.`,
  },
  {
    id: 'p8',
    category: 'Analysis',
    title: 'Review a decision',
    prompt: `Here's a decision I'm considering: [describe].

Play devil's advocate:
1. What are the strongest arguments against it?
2. What assumptions am I making that could be wrong?
3. What would a smart opponent say?

Then give your honest assessment.`,
  },
  {
    id: 'p9',
    category: 'Security',
    title: 'Review for injection',
    prompt: `Review this prompt/system prompt for prompt-injection weaknesses.

[Paste prompt]

Check:
- Can user input override instructions?
- Are there explicit boundaries and refusal rules?
- Is sensitive data exposed to the model unnecessarily?
- What happens if the model output is treated as trusted?

Report concrete fixes.`,
  },
  {
    id: 'p10',
    category: 'Security',
    title: 'Threat-model an AI feature',
    prompt: `Threat-model this AI feature: [describe feature, data flow, tools].

Using the OWASP Top 10 for LLM Applications, identify:
1. The top 3 risks for this specific design
2. Concrete mitigations for each
3. What to monitor in production`,
  },
  {
    id: 'p11',
    category: 'Learning',
    title: 'Teach me a concept',
    prompt: `Teach me [concept] as if I'm new to it.

- Start with an analogy
- Then the precise definition
- Then a worked example
- Then common misconceptions
- End with 3 questions to test myself`,
  },
  {
    id: 'p12',
    category: 'Learning',
    title: 'Quiz me',
    prompt: `Quiz me on [topic]. Ask one question at a time, starting easy and getting harder. After I answer, tell me if I'm right, explain the answer briefly, and track my score. Stop after 5 questions and give me a summary of what to review.`,
  },
]