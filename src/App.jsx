import React from 'react'
import CallControls from './components/CallControls'
import { motion } from 'framer-motion'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl max-w-md w-full dark:text-white"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-emerald-400 tracking-wide">
          📞 Twilio Web Dialer
        </h1>
        <CallControls />
        <footer className="text-center text-xs mt-6 text-white/40">
          Twilio + React + Zustand + Vite + Tailwind 💚
        </footer>
      </motion.div>
    </div>
  )
}

export default App
