<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()
const isArabic = computed(() => route.path.startsWith('/ar/'))
const switchUrl = computed(() => {
  let path = route.path
  try { path = decodeURIComponent(path).normalize('NFC') } catch { /* keep the original path */ }

  if (isArabic.value) {
    if (path.includes('بناء-فيلا-في-الإمارات')) return '/tools/uae-villa-construction-cost-calculator/'
    if (path.includes('تجديد-وترميم-فيلا')) return '/tools/villa-renovation-cost-calculator/'
    if (path.includes('تشطيب-مكتب-في-أبوظبي')) return '/tools/abu-dhabi-fit-out-cost-calculator/'
    return '/tools/'
  }

  if (path.includes('uae-villa-construction-cost-calculator')) return '/ar/حاسبة-تكلفة-بناء-فيلا-في-الإمارات/'
  if (path.includes('villa-renovation-cost-calculator')) return '/ar/حاسبة-تكلفة-تجديد-وترميم-فيلا/'
  if (path.includes('abu-dhabi-fit-out-cost-calculator')) return '/ar/حاسبة-تكلفة-تشطيب-مكتب-في-أبوظبي/'
  return '/ar/حاسبات-تكلفة-البناء/'
})
</script>

<template>
  <div :dir="isArabic ? 'rtl' : 'ltr'">
    <header class="site-header">
      <div class="shell nav">
        <a class="brand" href="https://royalmaskan.com/" aria-label="Al Maskan Al Malaky home">
          <img class="brand-logo" src="/tools/images/royal-maskan/royal-maskan-logo.png" alt="Royal Maskan - المسكن الملكي" width="190" height="51">
        </a>
        <nav aria-label="Main navigation">
          <a :href="isArabic ? '/ar/حاسبات-تكلفة-البناء/' : '/tools/'">{{ isArabic ? 'حاسبات التكلفة' : 'Cost calculators' }}</a>
          <a class="language-switch" :href="switchUrl" :hreflang="isArabic ? 'en' : 'ar'" :lang="isArabic ? 'en' : 'ar'">{{ isArabic ? 'English' : 'العربية' }}</a>
          <a class="header-site-cta" href="https://royalmaskan.com/">{{ isArabic ? 'اكتشف المسكن الملكي' : 'Explore Royal Maskan' }} <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
    <main><slot /></main>
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div><strong>{{ isArabic ? 'المسكن الملكي' : 'Al Maskan Al Malaky' }}</strong><p>{{ isArabic ? 'تشييد الفلل الفاخرة والتشطيبات الراقية في جميع أنحاء الإمارات.' : 'Premium villa construction and high-end interior finishing across the UAE.' }}</p><p class="footer-proof">{{ isArabic ? 'تخطيط هندسي · تنفيذ تسليم مفتاح · نخدم جميع الإمارات' : 'Engineering-led planning · Turnkey execution · UAE-wide service' }}</p></div>
        <div class="footer-cta"><span>{{ isArabic ? 'هل أنت مستعد للانتقال من التقدير إلى التنفيذ؟' : 'Ready to move beyond the estimate?' }}</span><h2>{{ isArabic ? 'لنحوّل أرقامك إلى مساحة استثنائية.' : 'Let’s turn your numbers into a remarkable space.' }}</h2><a href="https://royalmaskan.com/">{{ isArabic ? 'زيارة موقع المسكن الملكي' : 'Visit Royal Maskan' }} <span aria-hidden="true">↗</span></a></div>
      </div>
    </footer>
  </div>
</template>
