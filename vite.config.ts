import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 3001,
    allowedHosts: ['3001-in240dzdyub05l0nbks1e-ab21c4e8.us2.manus.computer'],
  },
})
