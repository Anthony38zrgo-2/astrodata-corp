<script setup>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import ProductsSection from "@/components/sections/ProductsSection.vue";
import WhatsAppButton from "@/components/ui/WhatsAppButton.vue";
</script>

<template>
  <div class="page-shell">
    <AppHeader />
    <main class="site-main">
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <AppFooter />
    </main>
    <WhatsAppButton />
  </div>
</template>
