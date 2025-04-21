import useCallStore from '../store/useCallStore'

export default function IncomingCall() {
    const incoming = useCallStore(state => state.incomingConnection)
    const setStatus = useCallStore(state => state.setStatus)
    const setIncomingConnection = useCallStore(state => state.setIncomingConnection)

    if (!incoming) return null

    const answer = () => {
        incoming.accept()
        setIncomingConnection(null)
        setStatus('in-call')
    }

    const decline = () => {
        incoming.reject()
        setIncomingConnection(null)
        setStatus('ready')
    }

    return (
        <div className="bg-yellow-500 text-black p-4 rounded shadow animate-pulse text-center space-y-2">
        <p className="font-bold">📲 Llamada entrante</p>
        <div className="flex gap-4 justify-center">
            <button onClick={answer} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition">
            ✅ Contestar
            </button>
            <button onClick={decline} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition">
            ❌ Rechazar
            </button>
        </div>
        </div>
    )
}