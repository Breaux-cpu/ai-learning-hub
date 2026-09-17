import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ModulePage from './components/ModulePage'
import Dashboard from './components/Dashboard'
import Flashcards from './components/Flashcards'
import Labs from './components/Labs'
import Exam from './components/Exam'
import CheatSheet from './components/CheatSheet'
import TokenCalculator from './components/TokenCalculator'
import Glossary from './components/Glossary'
import PromptBuilder from './components/PromptBuilder'
import PromptLibrary from './components/PromptLibrary'
import PracticeQuiz from './components/PracticeQuiz'
import Search from './components/Search'
import Certificate from './components/Certificate'
import { CURRICULUM } from './data'

export default function App() {
  const first = CURRICULUM[0].id
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={first} replace />} />
        {CURRICULUM.map((m) => (
          <Route key={m.id} path={`/${m.id}`} element={<ModulePage module={m} />} />
        ))}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/cheatsheet" element={<CheatSheet />} />
        <Route path="/tokencalc" element={<TokenCalculator />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/promptbuilder" element={<PromptBuilder />} />
        <Route path="/promptlib" element={<PromptLibrary />} />
        <Route path="/practice" element={<PracticeQuiz />} />
        <Route path="/search" element={<Search />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="*" element={<Navigate to={first} replace />} />
      </Route>
    </Routes>
  )
}