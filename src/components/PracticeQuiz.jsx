import { useState } from 'react'
import Quiz from './Quiz'
import { QUESTION_BANK } from '../data/questions'

const ROUND_SIZE = 5

function pickRound() {
  const pool = [...QUESTION_BANK]
  const round = []
  while (round.length < ROUND_SIZE && pool.length) {
    round.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
  }
  return round
}

export default function PracticeQuiz() {
  const [round, setRound] = useState(pickRound)
  const [roundNum, setRoundNum] = useState(1)

  const newRound = () => {
    setRound(pickRound())
    setRoundNum((n) => n + 1)
  }

  return (
    <div className="practice">
      <p>Random drills from a bank of {QUESTION_BANK.length} questions. Five per round — keep going until they feel easy.</p>
      <div className="practice-head">
        <span className="kicker">ROUND {roundNum}</span>
        <button className="btn" onClick={newRound}>🔄 New round</button>
      </div>
      <Quiz key={roundNum} questions={round} scoreKey="practice" />
    </div>
  )
}