import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** На GitHub Pages сайт отдаётся из /имя-репозитория/ */
const repo = 'avtomagazin'
const base = process.env.GITHUB_ACTIONS === 'true' ? `/${repo}/` : '/'

export default defineConfig({
  root: 'web',
  publicDir: '../public',
  base,
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
