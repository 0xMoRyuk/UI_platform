import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import devServer from '@hono/vite-dev-server'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devServer({
      entry: './server.dev.ts',
      exclude: [
        // Vite internals and static assets
        /^\/(src|node_modules|@.+)\/.*/,
        /\.(ts|tsx|css|html|svg|png|jpg|jpeg|gif|ico|woff|woff2)$/,
        // SPA routes — bypass Hono, let Vite serve index.html
        // Matches anything that is NOT a known Hono route prefix
        /^(?!\/(?:api|s|\.well-known)(?:\/|$))(?!\/(?:robots\.txt|sitemap\.xml|llm\.txt)$)/,
      ],
      injectClientScript: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Force local React 19 instead of workspace React 18
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
      'react/jsx-dev-runtime': path.resolve(__dirname, './node_modules/react/jsx-dev-runtime'),
    },
  },
  server: {
    port: 3000,
  },
})
