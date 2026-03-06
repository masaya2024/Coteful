<script setup lang="ts">
defineProps<{
  items: Array<{
    label: string
    value: string | number
    caption: string
  }>
}>()
</script>

<template>
  <section class="grid gap-4 md:grid-cols-3">
    <article
      v-for="item in items"
      :key="item.label"
      class="grid-stagger soft-panel space-y-4 px-5 py-5"
    >
      <p class="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-black/42">
        {{ item.label }}
      </p>
      <p class="metric-value">
        {{ item.value }}
      </p>
      <p class="text-sm leading-6 text-black/55">
        {{ item.caption }}
      </p>
    </article>
  </section>
</template>
