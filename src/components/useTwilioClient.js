import { Device } from '@twilio/voice-sdk';
import useCallStore from '../store/useCallStore';

let currentConnection = null;

// Inicializa y registra el Twilio Device
export async function setupTwilioDevice() {
  const { identity, setDevice, setStatus, setIncomingConnection } = useCallStore.getState();

  try {
    console.log('🛠️ Obteniendo token desde backend...');
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/token?identity=${identity}`);
    if (!res.ok) throw new Error(`❌ Error HTTP al obtener token: ${res.status}`);

    const { token } = await res.json();
    console.log('🔑 Token recibido:', token.slice(0, 30) + '...');

    const device = new Device(token, { debug: true });

    device.on('registered', () => {
      console.log('✅ Dispositivo registrado con éxito');
      setStatus('ready');
    });

    device.on('ready', () => {
      console.log('✅ Twilio Device está listo');
      setStatus('ready');
    });

    device.on('connect', () => {
      console.log('🔗 Llamada conectada');
      setStatus('in-call');
    });

    device.on('disconnect', () => {
      console.log('🔚 Llamada finalizada');
      setStatus('ready');
    });

    device.on('incoming', conn => {
      console.log('📲 Llamada entrante...');
      setIncomingConnection(conn);
      setStatus('incoming');
    });

    device.on('error', err => {
      console.error('💥 Error del dispositivo Twilio:', err);
      setStatus('error');
    });

    console.log('📞 Registrando dispositivo...');
    await device.register();
    setDevice(device);
  } catch (err) {
    console.error('❌ Error en setupTwilioDevice:', err);
    useCallStore.getState().setStatus('error');
  }
}

// Realiza una llamada a número real (PSTN)
export async function makeCall(toNumber) {
  const { device, setStatus } = useCallStore.getState();

  if (!device) {
    console.error('❌ Dispositivo Twilio no inicializado');
    return;
  }
  if (!toNumber || !toNumber.startsWith('+')) {
    alert('📵 Número inválido. Usá formato internacional con + (ej: +50212345678)');
    return;
  }

  console.log('📞 Iniciando llamada a:', toNumber);
  try {
    const connection = await device.connect({ params: { To: toNumber } });
    currentConnection = connection;

    connection.on('accept', () => {
      console.log('✅ Llamada aceptada');
      setStatus('in-call');
    });

    connection.on('disconnect', () => {
      console.log('📴 Llamada desconectada');
      setStatus('ready');
    });

    connection.on('error', err => {
      console.error('❌ Error en la llamada:', err);
      setStatus('error');
    });
  } catch (err) {
    console.error('❌ No se pudo iniciar la llamada:', err);
    setStatus('error');
  }
}

// Cuelga la llamada activa
export function hangUpCall() {
  const { setStatus } = useCallStore.getState();

  if (currentConnection) {
    console.log('❎ Colgando llamada...');
    currentConnection.disconnect();
    setStatus('ready');
  } else {
    console.warn('⚠️ No hay llamada activa para colgar');
  }
}
