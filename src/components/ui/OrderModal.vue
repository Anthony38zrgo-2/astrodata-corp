<script setup>
defineProps({
  item: { type: Object, required: true },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div class="info-modal-backdrop" @click.self="emit('close')">
      <section class="info-modal" role="dialog" aria-modal="true" :aria-labelledby="`modal-${item.id}`">
        <button type="button" aria-label="Cerrar" @click="emit('close')">×</button>
        <p>VIP_CLUB</p>
        <h2 :id="`modal-${item.id}`">{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </section>
    </div>
  </Teleport>
</template>
