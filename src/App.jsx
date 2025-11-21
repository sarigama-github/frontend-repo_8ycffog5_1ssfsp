import { useState } from 'react'
import Hero from './components/Hero'
import SearchForm from './components/SearchForm'
import Results from './components/Results'
import BookModal from './components/BookModal'

function App() {
  const [results, setResults] = useState([])
  const [chosen, setChosen] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <Hero />
      <SearchForm onResults={setResults} />
      <Results results={results} onSelect={(r)=>setChosen(r)} />
      <BookModal open={!!chosen} chosen={chosen} onClose={()=>setChosen(null)} />
      <footer className="mt-12 py-12 text-center text-white/50">
        Built for seamless travel • Live updates and smooth booking flow
      </footer>
    </div>
  )
}

export default App
