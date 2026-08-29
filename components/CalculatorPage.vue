<script setup lang="ts">
import type { CalculatorDefinition } from '~/data/calculators'
import { calculators } from '~/data/calculators'
const props = defineProps<{ calculator: CalculatorDefinition }>()
useCalculatorSeo(props.calculator)

const relatedCalculators = computed(() =>
  Object.values(calculators).filter(item => item.key !== props.calculator.key)
)
</script>

<template>
  <article>
    <section class="hero calculator-hero">
      <div class="shell hero-inner hero-grid">
        <div class="hero-copy">
          <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/tools/">Cost calculators</NuxtLink><span>/</span><span>{{ calculator.title }}</span></nav>
          <p class="eyebrow">{{ calculator.eyebrow }}</p>
          <h1>{{ calculator.title }}</h1>
          <p class="lede">{{ calculator.intro }}</p>
          <a class="hero-site-link" href="https://royalmaskan.com/">Built by Royal Maskan engineers <span>↗</span></a>
        </div>
        <figure class="hero-photo"><img :src="calculator.image" :alt="calculator.imageAlt" width="1200" height="900" fetchpriority="high"><figcaption>Royal Maskan · Crafting Royal Living</figcaption></figure>
      </div>
    </section>
    <div class="shell content-stack">
      <CostCalculator :calculator="calculator" />
      <section class="seo-copy">
        <div>
          <p class="eyebrow">Know before you build</p>
          <h2>What this estimate means</h2>
          <p>The result is a transparent early-stage budget range based on project area and specification. Actual cost depends on drawings, structural and MEP requirements, finishes, approvals, access, programme and site conditions.</p>
          <p>For a dependable price, our engineers review the scope and resolve details before work starts—helping reduce rework, delays and surprises.</p>
        </div>
        <aside><strong>Next step</strong><p>Save your area and preferred level, then share them with our team for a project-specific consultation.</p></aside>
      </section>
      <SiteCtaBanner :project="calculator.title" />
      <section class="faq">
        <p class="eyebrow">Frequently asked questions</p>
        <h2>Cost planning questions</h2>
        <details v-for="faq in calculator.faqs" :key="faq.question">
          <summary>{{ faq.question }}</summary><p>{{ faq.answer }}</p>
        </details>
      </section>
      <section class="related">
        <h2>Explore our other cost calculators</h2>
        <div class="tool-grid">
          <NuxtLink v-for="item in relatedCalculators" :key="item.key" :to="item.path" class="tool-card">
            <img :src="item.image" :alt="item.imageAlt" loading="lazy" width="720" height="480"><div class="tool-card-body"><span>{{ item.eyebrow }}</span><strong>{{ item.title }}</strong><p>{{ item.description }}</p></div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </article>
</template>
