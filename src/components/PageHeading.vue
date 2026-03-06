<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description: string
}>()
</script>

<template>
  <header class="grid gap-4 border-b border-black/10 pb-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
    <div>
      <p v-if="eyebrow" class="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-black/45">
        {{ eyebrow }}
      </p>
      <h1 class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-black">
        {{ title }}
      </h1>
      <p class="mt-3 max-w-3xl text-sm leading-6 text-black/58">
        {{ description }}
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <slot name="actions" />
    </div>
  </header>
</template>
