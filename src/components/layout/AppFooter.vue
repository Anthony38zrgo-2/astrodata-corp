<script setup>
import { siteData } from "@/constants/company";
import { useWhatsApp } from "@/composables/useWhatsApp";

const { whatsappUrl } = useWhatsApp();
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <a class="footer-brand" href="#inicio">
          <strong>{{ siteData.brand.name }}</strong>
          <small>{{ siteData.brand.tagline }}</small>
        </a>
        <p>Lectura personalizada con tu hora y fecha de nacimiento para descodificar tu propósito y sanar tu linaje.</p>
        <nav class="footer-nav" aria-label="Navegación del pie de página">
          <a v-for="item in siteData.navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <div class="footer-contact">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-wa-channel"
            aria-label="Atención exclusiva por WhatsApp"
          >
            Atención y Citas por WhatsApp: {{ siteData.footer.phoneDisplay || siteData.footer.phone }} ↗
          </a>
        </div>
        <p>{{ siteData.footer.copyright }}</p>
      </div>
    </div>
  </footer>
</template>
