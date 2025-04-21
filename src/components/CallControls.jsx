import { useState } from 'react'
import { motion } from 'framer-motion'
import useCallStore from '../store/useCallStore'
import { setupTwilioDevice, makeCall, hangUpCall } from './useTwilioClient'

export default function CallControls() {
  const [to, setTo] = useState('')
  const { device, status, identity } = useCallStore()

  const handleConnect = async () => {
    await setupTwilioDevice()
  }

  const handleCall = () => {
    if (!to.startsWith('+')) {
      alert('📵 Número inválido. Usá formato internacional con + (ej: +50212345678)')
      return
    }
    makeCall(to)
  }

  const handleHangup = () => {
    hangUpCall()
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto mt-20 bg-[#1c1c28] border border-gray-700 rounded-xl p-8 shadow-lg backdrop-blur-sm text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <h2 className="text-2xl font-bold text-center text-emerald-400 mb-6">
        Twilio Web Dialer
      </h2>

      <button
        onClick={handleConnect}
        className="w-full mb-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-200"
      >
        🔑 Conectar cliente
      </button>

      <input
        type="tel"
        placeholder="Número destino (ej. +502XXXXXXX)"
        className="w-full px-4 py-2 mb-4 bg-zinc-800 text-white border border-zinc-600 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring focus:ring-emerald-500"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={handleCall}
          disabled={!device || status !== 'ready'}
          className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all duration-200 ${
            device && status === 'ready'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          📞 Llamar
        </button>

        <button
          onClick={handleHangup}
          disabled={status !== 'in-call'}
          className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all duration-200 ${
            status === 'in-call'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          ❌ Colgar
        </button>
      </div>

      <div className="mt-6 text-center text-sm">
        Estado:{' '}
        <span
          className={`font-semibold ${
            status === 'ready'
              ? 'text-emerald-400'
              : status === 'in-call'
              ? 'text-yellow-300'
              : status === 'incoming'
              ? 'text-cyan-300'
              : 'text-red-400'
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-2 text-center text-xs text-zinc-500">Identidad: <span className="text-zinc-300">{identity}</span></p>
    </motion.div>
  )
}
