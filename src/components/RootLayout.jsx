import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer className="py-10 text-center text-sm text-white/50">
        Built for anime and cartoons.
      </footer>
    </div>
  )
}
