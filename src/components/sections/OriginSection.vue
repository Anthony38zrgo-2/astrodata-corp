<script setup>
import { siteData } from "@/constants/company";

const imageModules = import.meta.glob([
  "../../assets/images/*.{jpg,jpeg,svg}",
  "!../../assets/images/logo.jpeg",
], {
  eager: true,
  import: "default",
});
const getImage = (imageName) => imageModules[`../../assets/images/${imageName}`];
</script>

<template>
  <section id="recursos" class="resources-section" aria-labelledby="resources-title">
    <div class="section-container">
      <header class="resource-heading">
        <p class="section-kicker">Astrodata, numerología práctica</p>
        <h2 id="resources-title">{{ siteData.resources.title }}</h2>
      </header>
      <div class="resource-grid">
        <article
          v-for="(resource, index) in siteData.resources.items"
          :key="resource.id"
          class="resource-card"
          :class="[
            `resource-${resource.visualSize}`,
            `resource-${resource.id}`,
            `resource-tone-${index + 1}`,
          ]"
        >
          <img :src="getImage(resource.image)" :alt="resource.imageAlt" loading="lazy" />
          <div class="resource-overlay"></div>
          <div class="resource-content">
            <span>Número 0{{ index + 1 }}</span>
            <h3>{{ resource.title }}</h3>
            <a href="#contacto">{{ resource.buttonLabel }} <i aria-hidden="true">↗</i></a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
