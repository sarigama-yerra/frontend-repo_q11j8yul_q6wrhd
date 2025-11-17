import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        placeholder="Search shows..."
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  )
}
