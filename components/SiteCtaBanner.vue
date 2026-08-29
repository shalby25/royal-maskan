<script setup lang="ts">
defineProps<{ project?: string }>()
const isArabic = computed(() => useRoute().path.startsWith('/ar/'))
const bannerImage = `linear-gradient(90deg,#081624f2 0%,#0b1f33df 46%,#0b1f3355 100%),url("${useSitePath('/tools/images/royal-maskan/royal-maskan-cta.jpg')}")`
</script>

<template>
  <section class="site-cta-banner" :style="{ backgroundImage: bannerImage }" aria-label="Start your project with Royal Maskan">
    <div class="cta-decoration" aria-hidden="true">RM</div>
    <div class="cta-copy">
      <p>{{ isArabic ? 'من التقدير الأولي إلى التنفيذ الاستثنائي' : 'From early estimate to exceptional execution' }}</p>
      <h2>{{ isArabic ? 'مشروعك يستحق أكثر من مجرد رقم تقريبي.' : `Your ${project ? project.toLowerCase() : 'project'} deserves more than a rough number.` }}</h2>
      <span>{{ isArabic ? 'تعرّف على الفريق الهندسي المتخصص في بناء الفلل والتجديد والتشطيبات الراقية في الإمارات.' : 'Meet the engineering team behind premium villas, renovations and fit-outs across the UAE.' }}</span>
    </div>
    <a href="https://royalmaskan.com/">{{ isArabic ? 'اكتشف المسكن الملكي' : 'Discover Royal Maskan' }} <span aria-hidden="true">↗</span></a>
  </section>
</template>
