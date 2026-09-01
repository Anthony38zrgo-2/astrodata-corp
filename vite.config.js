import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'astrodata-corp'

export default defineConfig(({ mode }) => ({
  base: mode === 'deployment' ? `/${repoName}/` : '/',

  plugins: [
    vue(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
