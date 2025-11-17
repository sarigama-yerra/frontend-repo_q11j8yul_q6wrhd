import { motion } from 'framer-motion'

export default function Hero({ onExplore }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-indigo-500/10 to-cyan-500/20" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900"
            >
              AniFlix
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-cyan-600"> Stream Anime & Cartoons</span>
            </motion.h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              A clean, fast experience for discovering and watching anime and western cartoons.
            </p>
            <div className="mt-8 flex gap-4">
              <button onClick={onExplore} className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow">
                Explore Library
              </button>
              <a href="/test" className="px-5 py-3 rounded-lg bg-white/70 hover:bg-white text-gray-900 font-semibold shadow">
                Check Backend
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1">
            <div className="rounded-xl bg-gray-900 p-6">
              <div className="grid grid-cols-3 gap-4">
                {['Attack on Titan','Demon Slayer','Avatar'].map((t,i)=> (
                  <div key={i} className="aspect-[2/3] rounded-lg bg-gray-800/80 border border-gray-700 flex items-end p-3 text-sm text-gray-200">
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