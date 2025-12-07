import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { join } from 'path'

// Plugin to create 404.html for GitHub Pages SPA routing
const create404Html = () => {
  return {
    name: 'create-404-html',
    writeBundle() {
      const distDir = join(process.cwd(), 'dist')
      try {
        copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'))
        console.log('✅ Created 404.html for GitHub Pages')
      } catch (error) {
        console.warn('⚠️ Could not create 404.html:', error)
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), create404Html()],
  base: '/',
  assetsInclude: ['**/*.svg'],
})

