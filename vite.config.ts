import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig(() => {
  return {
    build: { outDir: 'build' },
    plugins: [
      react(),
      svgr({ svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true }, include: '**/*.svg' })
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      coverage: { provider: 'istanbul', reporter: ['text', 'json', 'html'], reportsDirectory: './coverage' }
    },
    resolve: {
      alias: {
        '@fonts': path.resolve(__dirname, './src/assets/fonts'),
        '@assets': path.resolve(__dirname, './src/assets')
      }
    },
    server: { port: 3000, fs: { allow: [path.resolve(__dirname), path.resolve(__dirname, './src')] } }
  }
})
