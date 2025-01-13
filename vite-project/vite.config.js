import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middleware: [
      (req, res, next) => {
        res.setHeader(
          'Content-Security-Policy',
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com https://accounts.google.com; frame-src https://accounts.google.com;"
        );
        next();
      }
    ]
  }
})
