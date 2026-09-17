import { useProgress } from '../progress'

export default function MarkComplete({ id }) {
  const { done, toggle } = useProgress()
  const isDone = done.has(id)
  return (
    <button className={`mark-done${isDone ? ' done' : ''}`} onClick={() => toggle(id)}>
      {isDone ? '✓ Completed' : '✓ Mark module complete'}
    </button>
  )
}