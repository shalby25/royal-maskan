<script setup lang="ts">
import { calculators } from '~/data/calculators'

const config = useRuntimeConfig()
const title = 'UAE Construction & Renovation Cost Calculators'
const description = 'Free UAE villa construction, renovation and Abu Dhabi fit-out cost calculators from Al Maskan Al Malaky engineers.'
useSeoMeta({ title, description, ogTitle: title, ogDescription: description })
useHead({ link: [
  { rel: 'canonical', href: `${config.public.siteUrl}/tools/` },
  { rel: 'alternate', hreflang: 'en-AE', href: `${config.public.siteUrl}/tools/` },
  { rel: 'alternate', hreflang: 'ar-AE', href: `${config.public.siteUrl}/ar/حاسبات-تكلفة-البناء/` },
  { rel: 'alternate', hreflang: 'x-default', href: `${config.public.siteUrl}/tools/` }
] })
</script>

<template>
  <div>
    <section class="hero"><div class="shell hero-inner"><p class="eyebrow">Free construction planning tools</p><h1>UAE construction cost calculators</h1><p class="lede">Start with a clear, instant budget range for your villa or commercial interior project.</p></div></section>
    <section class="shell tools-section">
      <div class="tool-grid">
        <NuxtLink v-for="item in calculators" :key="item.key" :to="item.path" class="tool-card"><img :src="item.image" :alt="item.imageAlt" loading="lazy" width="720" height="480"><div class="tool-card-body"><span>{{ item.eyebrow }}</span><strong>{{ item.title }}</strong><p>{{ item.description }}</p><b>Open calculator →</b></div></NuxtLink>
      </div>
      <SiteCtaBanner />
    </section>
  </div>
</template>
