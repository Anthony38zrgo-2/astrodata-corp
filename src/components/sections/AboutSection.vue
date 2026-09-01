<script setup>
import { siteData } from "@/constants/company";

const { philosophy, founder, virtualCare } = siteData.about;
const imageModules = import.meta.glob(
  ["../../assets/images/*.{jpg,jpeg,svg}", "!../../assets/images/logo.jpeg"],
  {
    eager: true,
    import: "default",
  },
);
const getImage = (imageName) =>
  imageModules[`../../assets/images/${imageName}`];
</script>

<template>
  <section id="nosotros" class="about-section" aria-label="Sobre VIP_CLUB">
    <div class="section-container">
      <article class="philosophy-block">
        <div class="copy-panel">
          <p class="section-kicker">{{ philosophy.subtitle }}</p>
          <h2>{{ philosophy.title }}</h2>
          <div class="prose-copy">
            <p v-for="paragraph in philosophy.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
          <div class="care-note">
            <span aria-hidden="true">✦</span> Comprenderte también es cuidarte.
          </div>
        </div>
        <figure class="calm-visual">
          <img
            :src="getImage(philosophy.image)"
            :alt="philosophy.imageAlt"
            loading="lazy"
          />
        </figure>
      </article>

      <article class="founder-block">
        <figure class="founder-portrait">
          <img
            :src="getImage(founder.image)"
            :alt="founder.imageAlt"
            loading="lazy"
          />
        </figure>
        <div class="founder-copy">
          <p class="section-kicker">{{ founder.subtitle }}</p>
          <h2>{{ founder.title }}</h2>
          <h3>{{ founder.name }}</h3>
          <div class="prose-copy founder-prose">
            <p v-for="paragraph in founder.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </article>

      <article class="virtual-block">
        <figure class="calm-visual calm-visual-dark">
          <img
            :src="getImage(virtualCare.image)"
            :alt="virtualCare.imageAlt"
            loading="lazy"
          />
        </figure>
        <div class="virtual-copy">
          <h2>{{ virtualCare.title }}</h2>
          <p>{{ virtualCare.description }}</p>
          <a href="#contacto" class="text-link"
            >Conversemos <span aria-hidden="true">→</span></a
          >
        </div>
      </article>
    </div>
  </section>
</template>
