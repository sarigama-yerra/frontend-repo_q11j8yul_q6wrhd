import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const userId = 'guest'

export default function ShowDetail() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [saving, setSaving] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${backend}/shows/${id}`)
        const data = await res.json()
        setShow(data)
      } catch (e) {
        setShow(null)
      }
    }
    load()
  }, [id])

  const addToWatchlist = async () => {
    try {
      setSaving(true)
      await fetch(`${backend}/watchlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, show_id: id })
      })
      setAdded(true)
    } finally {
      setSaving(false)
    }
  }

  if (!show) return <div className="max-w-7xl mx-auto px-6 py-10 text-white/70">Loading show...</div>

  return (
    <div>
      <div className="relative h-60 sm:h-80 md:h-96">
        {show.backdrop_url && (
          <img src={show.backdrop_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-10">
        <div className="flex gap-6">
          <div className="w-36 sm:w-44 -mt-20">
            {show.poster_url && (
              <img src={show.poster_url} className="rounded-lg ring-1 ring-neutral-800" />
            )}
          </div>
          <div className="flex-1 text-white">
            <h1 className="text-3xl sm:text-4xl font-extrabold">{show.title}</h1>
            <p className="mt-3 text-white/70 max-w-2xl">{show.description}</p>
            <div className="mt-3 text-sm text-white/60">
              {show.year} • {show.type} • {Array.isArray(show.genres) ? show.genres.join(', ') : ''}
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={addToWatchlist} disabled={saving || added} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white">
                {added ? 'Added' : saving ? 'Saving...' : 'Add to Watchlist'}
              </button>
              <a href="#episodes" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">Browse Episodes</a>
            </div>
          </div>
        </div>

        <section id="episodes" className="mt-10">
          <h2 className="text-xl font-semibold text-white/90">Episodes</h2>
          {Array.isArray(show.episodes) && show.episodes.length > 0 ? (
            <ul className="mt-4 grid sm:grid-cols-2 gap-4">
              {show.episodes.map((ep) => (
                <li key={ep.number} className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Episode {ep.number}: {ep.title}</p>
                      <p className="text-white/60 text-sm">{ep.duration_minutes} min</p>
                    </div>
                    {ep.video_url && (
                      <a href={ep.video_url} target="_blank" className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm">Play</a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-white/60">Episodes coming soon.</p>
          )}
        </section>
      </div>
    </div>
  )
}
