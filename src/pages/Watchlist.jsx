import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const userId = 'guest'

export default function Watchlist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/watchlist?user_id=${userId}`)
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  if (loading) return <div className="max-w-7xl mx-auto px-6 py-10 text-white/70">Loading watchlist...</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white">Your Watchlist</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-white/60">No saved shows yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map(item => (
            <a key={item._id} href={`/show/${item._id}`} className="group">
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-neutral-800 ring-1 ring-neutral-800">
                {item.poster_url ? (
                  <img src={item.poster_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">No Image</div>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-white line-clamp-2">{item.title}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
