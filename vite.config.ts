import { defineConfig } from 'vite'

// GitHub Pages configuration:
// - Custom domain (jackhoran.dev): base = '/'
// - Project page (username.github.io/repo-name): base = '/repo-name/'
// - User/org page (username.github.io): base = '/'
// 
// If using a custom domain, keep base as '/'
// If using a project page, change to: base = '/flint/'
const base = '/'

export default defineConfig({
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        photo: './photo.html',
      },
    },
  },
})

