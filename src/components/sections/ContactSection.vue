<script setup>
import { ref } from "vue";
import { siteData } from "@/constants/company";

const isHuman = ref(false);
const submitted = ref(false);
const submitForm = () => {
  if (isHuman.value) submitted.value = true;
};
</script>

<template>
  <section id="contacto" class="contact-section" aria-labelledby="contact-title">
    <div class="section-container contact-container">
      <div class="contact-intro">
        <p class="section-kicker">Demos el primer paso</p>
        <h2 id="contact-title">{{ siteData.contact.title }}</h2>
        <p>{{ siteData.contact.description }}</p>
        <div class="contact-details">
          <a :href="`tel:${siteData.footer.phone}`"><span>Teléfono</span>{{ siteData.footer.phone }}</a>
          <a :href="`mailto:${siteData.footer.email}`"><span>Correo</span>{{ siteData.footer.email }}</a>
        </div>
        <p class="privacy-note"><span aria-hidden="true">✓</span> Tu información será tratada con confidencialidad.</p>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-heading">
          <span>Cuéntanos cómo contactarte</span>
          <p>Completa tus datos y te responderemos lo antes posible.</p>
        </div>
        <label v-for="field in siteData.contact.fields" :key="field.name">
          <span>{{ field.label }}</span>
          <input
            :name="field.name"
            :type="field.type"
            :required="field.required"
            :autocomplete="field.type === 'email' ? 'email' : 'name'"
          />
        </label>
        <label class="human-check">
          <input v-model="isHuman" type="checkbox" required />
          <span class="check-box" aria-hidden="true">✓</span>
          {{ siteData.contact.captchaLabel }}
        </label>
        <button type="submit">{{ siteData.contact.submitLabel }} <span aria-hidden="true">↗</span></button>
        <p v-if="submitted" class="form-success" role="status">Gracias. Hemos recibido tus datos.</p>
      </form>

      <p class="contact-slogan">{{ siteData.home.hero.headline }}</p>
    </div>
  </section>
</template>
