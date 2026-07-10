import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    // Include .js files for JSX transformation
    include: '**/*.js',
  })],
})