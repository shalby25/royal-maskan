type Faq = { question: string; answer: string }

export function useCalculatorSeo(input: {
  title: string
  description: string
  path: string
  faqs: Faq[]
}) {
  const config = useRuntimeConfig()
  const canonical = `${config.public.siteUrl}${input.path}`
  const arabicPaths: Record<string, string> = {
    '/tools/uae-villa-construction-cost-calculator/': '/ar/حاسبة-تكلفة-بناء-فيلا-في-الإمارات/',
    '/tools/villa-renovation-cost-calculator/': '/ar/حاسبة-تكلفة-تجديد-وترميم-فيلا/',
    '/tools/abu-dhabi-fit-out-cost-calculator/': '/ar/حاسبة-تكلفة-تشطيب-مكتب-في-أبوظبي/'
  }

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: input.title,
    ogDescription: input.description,
    ogType: 'website',
    ogUrl: canonical,
    twitterCard: 'summary_large_image'
  })
  useHead({
    link: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: 'en-AE', href: canonical },
      ...(arabicPaths[input.path] ? [{ rel: 'alternate', hreflang: 'ar-AE', href: `${config.public.siteUrl}${arabicPaths[input.path]}` }] : [])
    ],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: input.title,
            url: canonical,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'AED' }
          },
          {
            '@type': 'FAQPage',
            mainEntity: input.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer }
            }))
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.public.siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Cost calculators', item: `${config.public.siteUrl}/tools/` },
              { '@type': 'ListItem', position: 3, name: input.title, item: canonical }
            ]
          }
        ]
      })
    }]
  })
}
