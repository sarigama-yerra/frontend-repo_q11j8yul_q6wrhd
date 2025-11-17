import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-900/70 bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-white font-extrabold tracking-tight text-xl">
          AniFlix <span className="text-red-500">•</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/" className={isActive('/') ? 'text-white' : 'text-white/70 hover:text-white'}>
            Home
          </Link>
          <Link to="/watchlist" className={isActive('/watchlist') ? 'text-white' : 'text-white/70 hover:text-white'}>
            Watchlist
          </Link>
          <a href="/test" className="text-white/70 hover:text-white">Backend</a>
        </nav>
      </div>
    </header>
  )
}
