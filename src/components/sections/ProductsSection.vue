<script setup>
import services from "@/data/products.json";
import { siteData } from "@/constants/company";
import { useWhatsApp } from "@/composables/useWhatsApp";

const imageModules = import.meta.glob([
  "../../assets/images/*.{jpg,jpeg,svg}",
  "!../../assets/images/logo.jpeg",
], {
  eager: true,
  import: "default",
});
const getImage = (imageName) => imageModules[`../../assets/images/${imageName}`];
const { createWhatsAppUrl } = useWhatsApp();
const getServiceMessage = (service) =>
  `Hola Mary, quisiera recibir información y agendar la ${service.title} (${service.price}) de Astrodatha.`;
</script>

<template>
  <section id="servicios" class="services-section" aria-labelledby="services-title">
    <div class="section-container">
      <header class="section-heading">
        <div>
          <p class="section-kicker">{{ services.header.subtitle }}</p>
          <h2 id="services-title">{{ services.header.title }}</h2>
        </div>
        <p>Sesiones individuales y personalizadas con tu hora y fecha de nacimiento.</p>
      </header>

      <div class="services-grid">
        <article
          v-for="(service, index) in services.items"
          :key="service.id"
          class="service-card"
          :class="[`service-${service.visualVariant}`, `service-${service.id}`]"
        >
          <figure class="service-visual">
            <img :src="getImage(service.image)" :alt="service.imageAlt" loading="lazy" />
            <span class="service-number" aria-hidden="true">0{{ index + 1 }}</span>
          </figure>
          <div class="service-body">
            <div class="service-meta" v-if="service.badge">
              <span class="service-badge">{{ service.badge }}</span>
            </div>
            <h3>{{ service.title }}</h3>
            <p v-if="service.tagline" class="service-tagline"><em>{{ service.tagline }}</em></p>
            <p>{{ service.description }}</p>
            <div class="service-price" aria-label="Precio del servicio">
              <span class="price">{{ service.price }}</span>
              <span v-if="service.priceNote" class="unit">{{ service.priceNote }} · {{ service.priceUnit }}</span>
              <span v-else class="unit">{{ service.priceUnit }}</span>
            </div>
            <a
              class="service-whatsapp"
              :href="createWhatsAppUrl(getServiceMessage(service))"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${siteData.whatsapp.serviceButtonLabel} sobre ${service.title} por WhatsApp`"
            >
              {{ siteData.whatsapp.serviceButtonLabel }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
