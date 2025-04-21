import { create } from 'zustand'

const useCallStore = create((set) => ({
    identity: 'webuser',
    device: null,
    status: 'disconnected',
    incomingConnection: null,

    setIdentity: (id) => set({ identity: id }),
    setDevice: (dev) => set({ device: dev }),
    setStatus: (status) => set({ status }),
    setIncomingConnection: (conn) => set({ incomingConnection: conn }),
}))

export default useCallStore
