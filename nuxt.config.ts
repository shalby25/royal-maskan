export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/estimator.css', '~/assets/css/arabic.css', '~/assets/css/royal-maskan-theme.css', '~/assets/css/visual-upgrade.css', '~/assets/css/local-assets.css'],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://royalmaskan.com',
      whatsappUrl: process.env.NUXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/971000000000'
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://royalmaskan.com',
    name: 'Al Maskan Al Malaky'
  },
  app: {
    // Keep generated assets inside /tools so WordPress continues to own the domain root.
    buildAssetsDir: '/tools/_nuxt/',
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#13261f' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/tools/images/royal-maskan/favicon.png' },
        { rel: 'apple-touch-icon', href: '/tools/images/royal-maskan/favicon.png' }
      ]
    }
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        '/tools/',
        '/tools/uae-villa-construction-cost-calculator/',
        '/tools/villa-renovation-cost-calculator/',
        '/tools/abu-dhabi-fit-out-cost-calculator/'
        ,'/ar/حاسبات-تكلفة-البناء/'
        ,'/ar/حاسبة-تكلفة-بناء-فيلا-في-الإمارات/'
        ,'/ar/حاسبة-تكلفة-تجديد-وترميم-فيلا/'
        ,'/ar/حاسبة-تكلفة-تشطيب-مكتب-في-أبوظبي/'
      ]
    }
  },
  routeRules: {
    '/tools/**': { prerender: true }
  }
})
