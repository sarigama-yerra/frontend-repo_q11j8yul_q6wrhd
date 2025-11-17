import { motion } from 'framer-motion'

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(239,68,68,0.35),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(239,68,68,0.25),transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
            >
              AniFlix
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white/90"> Stream Anime & Cartoons</span>
            </motion.h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl">
              A clean, fast experience for discovering and watching anime and western cartoons.
            </p>
            <div className="mt-8 flex gap-4">
              <button onClick={onExplore} className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow">
                Explore Library
              </button>
              <a href="/test" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold shadow">
                Check Backend
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-1">
            <div className="rounded-xl bg-neutral-950 p-6">
              <div className="grid grid-cols-3 gap-4">
                {['Attack on Titan','Demon Slayer','Avatar'].map((t,i)=> (
                  <div key={i} className="aspect-[2/3] rounded-lg bg-neutral-900 border border-neutral-800 flex items-end p-3 text-sm text-white/80">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
