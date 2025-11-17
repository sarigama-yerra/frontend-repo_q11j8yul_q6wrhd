import { useEffect, useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ShowGrid({ query, filter }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <p className="text-white/60">Loading library...</p>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map(item => (
        <a key={item._id} href={`/#show-${item._id}`} className="group">
          <div className="aspect-[2/3] rounded-lg overflow-hidden bg-neutral-800 ring-1 ring-neutral-800">
            {item.poster_url ? (
              <img src={item.poster_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/40">No Image</div>
            )}
          </div>
          <p className="mt-2 text-sm font-medium text-white line-clamp-2">{item.title}</p>
          <p className="text-xs text-white/60">{item.year || ''} {item.type ? `• ${item.type}`: ''}</p>
        </a>
      ))}
      {items.length === 0 && (
        <p className="col-span-full text-center text-white/60">No results found.</p>
      )}
    </div>
  )
}
