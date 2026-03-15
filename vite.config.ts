import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/randomdinner/',   // MUST match your repo name exactly (lowercase)
  plugins: [react()],
})
