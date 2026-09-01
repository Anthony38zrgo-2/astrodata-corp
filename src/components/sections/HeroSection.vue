<script setup>
import { siteData } from "@/constants/company";
import { useWhatsApp } from "@/composables/useWhatsApp";

const imageModules = import.meta.glob(
  ["../../assets/images/*.{jpg,jpeg,svg}", "!../../assets/images/logo.jpeg"],
  {
    eager: true,
    import: "default",
  },
);
const heroImage =
  imageModules[`../../assets/images/${siteData.home.hero.image}`];
const { whatsappUrl } = useWhatsApp();
</script>

<template>
  <section id="inicio" class="hero" aria-labelledby="hero-title">
    <div class="hero-inner">
      <div class="hero-content">
        <h1 id="hero-title">{{ siteData.home.hero.headline }}</h1>
        <p class="hero-description">{{ siteData.home.hero.description }}</p>
        <div class="hero-actions">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="button-primary"
          >
            {{ siteData.home.hero.primaryCta }}
            <span aria-hidden="true">↗</span>
          </a>
          <a href="#nosotros" class="button-secondary">
            {{ siteData.home.hero.secondaryCta }}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <ul class="hero-highlights" aria-label="Características de la atención">
          <li v-for="item in siteData.home.hero.highlights" :key="item">
            <span aria-hidden="true">✓</span>{{ item }}
          </li>
        </ul>
      </div>
      <figure class="hero-image-wrap">
        <img
          :src="heroImage"
          :alt="siteData.home.hero.imageAlt"
          fetchpriority="high"
        />
        <figcaption>
          <span class="status-dot" aria-hidden="true"></span>
          Lectura clara y personalizada
        </figcaption>
      </figure>
    </div>
    <div class="hero-stats" aria-label="Astrodata en cifras">
      <div v-for="stat in siteData.home.stats" :key="stat.label" class="hero-stat">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>
