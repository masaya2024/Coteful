import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-03-06',
  srcDir: '.',
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/icon'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'Conteful',
      titleTemplate: '%s | Conteful',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Bilingual Contentful-like headless CMS admin MVP.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap',
        },
      ],
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'lucide:layout-dashboard',
        'lucide:folder-kanban',
        'lucide:folder-plus',
        'lucide:blocks',
        'lucide:file-pen-line',
        'lucide:image',
        'lucide:key-round',
        'lucide:webhook',
        'lucide:users',
        'lucide:user-plus',
        'lucide:plus',
        'lucide:check',
        'lucide:chevron-right',
        'lucide:arrow-up-right',
        'lucide:log-in',
        'lucide:log-out',
        'lucide:save',
        'lucide:trash-2',
        'lucide:eye',
        'lucide:search',
      ],
      sizeLimitKb: 128,
    },
  },
  routeRules: {
    '/api/**': {
      cors: true,
    },
  },
})
