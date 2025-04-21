# 📞 Twilio Web Dialer

Un marcador web moderno que permite realizar llamadas reales desde el navegador usando **Twilio Client JS**, WebRTC, **React + Vite**, y estilo con **TailwindCSS** y animaciones con **Framer Motion**.

---

## 🧠 Tecnologías usadas

- ✅ React + Vite
- 🎨 TailwindCSS + Framer Motion
- 📞 Twilio Client JS (Voice SDK)
- 🌐 Zustand para manejo de estado
- 🔐 Backend Express + Twilio SDK
- 🌍 Render (backend) + Vercel (frontend)

---

## 🚀 Cómo correrlo localmente

### 1. Clona este repo

```bash
git clone https://github.com/tu-usuario/twilio-web-dialer.git
cd twilio-web-dialer
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crea un archivo `.env` con la URL del backend:

```env
VITE_BACKEND_URL=https://tu-backend-en-render.com
```

### 4. Ejecutá el frontend

```bash
npm run dev
```

---

## 🔧 Backend necesario

Este frontend requiere un backend Express que:

- Genere tokens para el cliente Twilio.
- Administre llamadas entrantes y salientes.
- Tenga las siguientes rutas:

```
GET    /token
POST   /incoming
POST   /recording
POST   /make-call
```

> Repositorio recomendado para el backend: [twilioapp-backend](https://github.com/tu-usuario/twilioapp-backend)

---

## 📷 Vista previa

![UI Preview](./preview.png)

---

## 💬 Comentarios

> Este proyecto fue construido con 💚 y un montón de bugs en el camino. ¡Pero funciona!

Con cariño,  
**Milton**
