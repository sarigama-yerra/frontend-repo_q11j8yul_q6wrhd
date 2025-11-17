import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const userId = 'guest'

export default function ShowGrid({ query, filter }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [addedIds, setAddedIds] = useState({})

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (filter?.type) params.set('type', filter.type)
        if (filter?.genre) params.set('genre', filter.genre)
        if (filter?.tag) params.set('tag', filter.tag)
        const res = await fetch(`${backend}/shows?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [query, filter])

  const addToWatchlist = async (id) => {
    try {
      setSavingId(id)
      await fetch(`${backend}/watchlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, show_id: id })
      })
      setAddedIds(prev => ({ ...prev, [id]: true }))
    } finally {
      setSavingId(null)
    }
  }

  if (loading) return <p className="text-white/60">Loading library...</p>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map(item => (
        <div key={item._id} className="group">
          <Link to={`/show/${item._id}`} className="block">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-neutral-800 ring-1 ring-neutral-800">
              {item.poster_url ? (
                <img src={item.poster_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40">No Image</div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
          <div className="mt-2 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium text-white line-clamp-2">{item.title}</p>
              <p className="text-xs text-white/60">{item.year || ''} {item.type ? `• ${item.type}`: ''}</p>
            </div>
            <button
              onClick={() => addToWatchlist(item._id)}
              disabled={savingId === item._id || addedIds[item._id]}
              className="shrink-0 px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-xs"
              title="Add to Watchlist"
            >
              {addedIds[item._id] ? 'Saved' : (savingId === item._id ? '...' : 'Save')}
            </button>
          </div>
        </div>
      ))}
      {items.length === 0 && (
        <p className="col-span-full text-center text-white/60">No results found.</p>
      )}
    </div>
  )
}
