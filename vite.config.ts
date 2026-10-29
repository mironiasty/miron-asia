import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteStaticCopy({
      targets: [
        {
          src: 'nereczka',
          dest: ''
        },
        {
          src: 'przepisy',
          dest: ''
        },
        {
          src: 'skigraphs',
          dest: ''
        },
      ],
    }),],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        photos: 'photos/index.html',
      },
    },
  },

})
