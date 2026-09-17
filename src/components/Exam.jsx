import Quiz from './Quiz'
import { EXAM_QUESTIONS } from '../data/exam'

export default function Exam() {
  return (
    <div className="exam">
      <p>Twenty questions covering the whole curriculum — foundations, LLMs, agents, and security. Answer all of them, then grade.</p>
      <Quiz questions={EXAM_QUESTIONS} scoreKey="exam" />
    </div>
  )
}