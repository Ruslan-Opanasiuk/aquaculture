// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Не забуваємо про плагін React
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // Додаємо плагін React
    tailwindcss(), // ✅ Додаємо плагін Tailwind
  ],
})