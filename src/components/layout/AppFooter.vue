<script setup>
import { siteData } from "@/constants/company";
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <a class="footer-brand" href="#inicio">
          <strong>{{ siteData.brand.name }}</strong>
          <small>{{ siteData.brand.tagline }}</small>
        </a>
        <p>Un club privado de experiencias exclusivas y acompañamiento a tu medida.</p>
        <nav class="footer-nav" aria-label="Navegación del pie de página">
          <a v-for="item in siteData.navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <nav class="social-links" aria-label="Redes sociales">
          <a
            v-for="network in siteData.footer.socialNetworks"
            :key="network.platform"
            :href="network.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="network.platform"
          >{{ network.platform.slice(0, 2) }}</a>
        </nav>
        <div class="footer-contact">
          <a :href="`tel:${siteData.footer.phone}`">{{ siteData.footer.phone }}</a>
          <a :href="`mailto:${siteData.footer.email}`">{{ siteData.footer.email }}</a>
        </div>
        <p>{{ siteData.footer.copyright }}</p>
      </div>
    </div>
  </footer>
</template>
