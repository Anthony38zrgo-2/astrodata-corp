<script setup>
import { ref } from "vue";
import { siteData } from "@/constants/company";

const menuOpen = ref(false);
const imageModules = import.meta.glob("../../assets/images/*.{webp,svg}", {
  eager: true,
  import: "default",
});
const logoImage = imageModules[`../../assets/images/${siteData.brand.headerLogo}`];
</script>

<template>
  <header class="site-header" :class="{ 'is-open': menuOpen }">
    <div class="header-inner">
      <a class="brand-lockup" href="#inicio" :aria-label="siteData.brand.logoAlt" @click="menuOpen = false">
        <img
          class="brand-logo"
          :src="logoImage"
          alt=""
          width="640"
          height="640"
        />
        <span class="brand-copy">
          <strong>{{ siteData.brand.name }}</strong>
          <small>{{ siteData.brand.tagline }}</small>
        </span>
      </a>

      <nav id="main-navigation" class="side-nav" aria-label="Navegación principal">
        <a
          v-for="item in siteData.navigation"
          :key="item.href"
          :href="item.href"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>

      <a
        class="header-cta"
        href="#calculadora"
        @click="menuOpen = false"
      >
        Calcular mi número
      </a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="main-navigation"
        aria-label="Abrir o cerrar menú"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>
