<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()
</script>

<template>
  <div class="soft-panel border-dashed px-6 py-10 text-center">
    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-black/40">
      Empty
    </p>
    <h2 class="mt-3 text-xl font-semibold tracking-[-0.04em]">
      {{ title }}
    </h2>
    <p class="mt-3 text-sm leading-6 text-black/56">
      {{ message }}
    </p>
  </div>
</template>
