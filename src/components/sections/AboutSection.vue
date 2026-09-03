<script setup>
import { siteData } from "@/constants/company";
import { useWhatsApp } from "@/composables/useWhatsApp";

const { philosophy, founder, virtualCare } = siteData.about;
const { createWhatsAppUrl } = useWhatsApp();
const appointmentWaUrl = createWhatsAppUrl(
  "Hola Mary, quisiera agendar una consulta con cita previa de Astrodatha.",
);

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
  <section id="filosofia" class="about-section" aria-label="Filosofía y Guía Astrodatha">
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

          <div class="motto-banner">
            <span class="motto-star" aria-hidden="true">★</span>
            <strong>{{ philosophy.motto }}</strong>
          </div>

          <!-- Desglose de fecha manuscrito (Día, Mes, Año) -->
          <div v-if="philosophy.birthBreakdown" class="birth-breakdown-panel">
            <p class="breakdown-subtitle">{{ philosophy.birthBreakdown.title }} · <small>{{ philosophy.birthBreakdown.exampleNote }}</small></p>
            <div class="breakdown-grid">
              <div
                v-for="item in philosophy.birthBreakdown.items"
                :key="item.unit"
                class="breakdown-item"
              >
                <span class="breakdown-unit">{{ item.unit }}</span>
                <strong class="breakdown-val">{{ item.example }}</strong>
                <span class="breakdown-title">{{ item.title }}</span>
                <small class="breakdown-detail">{{ item.detail }}</small>
              </div>
            </div>
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

      <article id="nosotros" class="founder-block">
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
          <p v-if="founder.role" class="founder-role">{{ founder.role }}</p>
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
          <p class="section-kicker">{{ virtualCare.subtitle || 'Atención personalizada' }}</p>
          <h2>{{ virtualCare.title }}</h2>
          <p>{{ virtualCare.description }}</p>
          <a
            :href="appointmentWaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-link"
          >
            {{ virtualCare.buttonLabel || 'Conversemos' }} <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
