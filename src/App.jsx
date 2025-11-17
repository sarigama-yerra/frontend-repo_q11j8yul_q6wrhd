import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import ShowGrid from './components/ShowGrid'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function HomePage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const [genre, setGenre] = useState('')
  const [seeded, setSeeded] = useState(false)
  const exploreRef = useRef(null)

  useEffect(() => {
    const seed = async () => {
      try {
        const res = await fetch(`${backend}/seed`, { method: 'POST' })
        if (res.ok) setSeeded(true)
      } catch {}
    }
    seed()
  }, [])

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <Hero onExplore={scrollToExplore} />

      <section ref={exploreRef} className="max-w-7xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-xl font-semibold text-white/90">Explore</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex items-center gap-3">
            <select value={type} onChange={e=>setType(e.target.value)} className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">All Types</option>
              <option value="anime">Anime</option>
              <option value="cartoon">Cartoons</option>
            </select>
            <select value={genre} onChange={e=>setGenre(e.target.value)} className="px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">All Genres</option>
              <option>action</option>
              <option>adventure</option>
              <option>drama</option>
              <option>fantasy</option>
              <option>comedy</option>
            </select>
          </div>
        </div>
        <ShowGrid query={query} filter={{ type, genre }} />

        <p className="pt-6 text-center text-sm text-white/50">Demo data {seeded ? 'ready' : 'loading...'}</p>
      </section>
    </div>
  )
}

export default HomePage
