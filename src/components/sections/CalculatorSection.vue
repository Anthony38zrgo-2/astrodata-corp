<script setup>
import { computed, ref } from "vue";
import { siteData } from "@/constants/company";
import { useWhatsApp } from "@/composables/useWhatsApp";

const calc = siteData.calculator;
const interpretations = siteData.interpretations;

const day = ref("");
const month = ref("");
const year = ref("");
const result = ref(null);

const canCalculate = computed(
  () => day.value !== "" && month.value !== "" && year.value !== "",
);

const reduceNumber = (number) => {
  while (number > 9 && number !== 11 && number !== 22 && number !== 33) {
    number = String(number)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return number;
};

const calculate = () => {
  const d = Number(day.value);
  const m = Number(month.value);
  const y = Number(year.value);

  if (day.value > 31 || month.value > 12 || year.value.length < 4) {
    result.value = { invalid: true };
    return;
  }

  const reducedDay = reduceNumber(d);
  const reducedMonth = reduceNumber(m);
  const reducedYear = reduceNumber(y);
  const total = reduceNumber(reducedDay + reducedMonth + reducedYear);

  result.value = { invalid: false, number: total };
};

const numberMeaning = computed(() => {
  if (!result.value || result.value.invalid) return "";
  return interpretations[String(result.value.number)];
});

const isMasterNumber = computed(
  () => result.value && !result.value.invalid && [11, 22, 33].includes(result.value.number),
);

const displayDate = computed(() => {
  if (result.value && result.value.invalid) return "";
  return `${day.value} · ${month.value} · ${year.value}`;
});

const reset = () => {
  day.value = "";
  month.value = "";
  year.value = "";
  result.value = null;
};

const { createWhatsAppUrl } = useWhatsApp();
const deepDiveMessage = computed(() =>
  createWhatsAppUrl(
    `Hola, calculé mi número ${result.value ? result.value.number : ""} (${
      displayDate.value
    }) y quisiera profundizar en mi lectura numerológica.`,
  ),
);
</script>

<template>
  <section id="calculadora" class="calculator-section" aria-labelledby="calculator-title">
    <div class="section-container">
      <header class="section-heading">
        <div>
          <p class="section-kicker">{{ calc.subtitle }}</p>
          <h2 id="calculator-title">{{ calc.title }}</h2>
        </div>
        <p>{{ calc.description }}</p>
      </header>

      <div class="calculator-grid">
        <div class="calculator-card">
          <form class="calculator-form" @submit.prevent="calculate">
            <div class="calculator-fields">
              <label>
                <span>{{ calc.dayLabel }}</span>
                <input
                  v-model="day"
                  type="number"
                  min="1"
                  max="31"
                  inputmode="numeric"
                  placeholder="22"
                  required
                />
              </label>
              <label>
                <span>{{ calc.monthLabel }}</span>
                <input
                  v-model="month"
                  type="number"
                  min="1"
                  max="12"
                  inputmode="numeric"
                  placeholder="05"
                  required
                />
              </label>
              <label>
                <span>{{ calc.yearLabel }}</span>
                <input
                  v-model="year"
                  type="number"
                  min="1900"
                  max="2100"
                  inputmode="numeric"
                  placeholder="1989"
                  required
                />
              </label>
            </div>
            <p class="calculator-example">{{ calc.example }}</p>
            <button
              type="submit"
              class="calculator-submit"
              :disabled="!canCalculate"
            >
              {{ calc.buttonLabel }}
            </button>
          </form>
        </div>

        <div class="calculator-result" :class="{ 'is-empty': !result }">
          <template v-if="!result">
            <span class="result-placeholder" aria-hidden="true">✦</span>
            <p>{{ calc.defaultMeaning }}</p>
          </template>

          <template v-else-if="result.invalid">
            <span class="result-placeholder result-warning" aria-hidden="true">!</span>
            <p>Revisa los valores ingresados. Día (1-31), mes (1-12) y año de 4 dígitos.</p>
          </template>

          <template v-else>
            <p class="result-label">{{ calc.numericLabel }}</p>
            <strong class="result-number">{{ result.number }}</strong>
            <p v-if="isMasterNumber" class="result-master">{{ calc.masterNote }}</p>
            <p class="result-date">{{ displayDate }}</p>
            <p class="result-meaning">{{ numberMeaning }}</p>
            <a
              class="result-cta"
              :href="deepDiveMessage"
              target="_blank"
              rel="noopener noreferrer"
            >
              Profundicemos juntos <span aria-hidden="true">↗</span>
            </a>
            <button class="result-reset" type="button" @click="reset">
              {{ calc.recalculateLabel }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
