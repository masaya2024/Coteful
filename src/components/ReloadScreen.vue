<script setup lang="ts">
const props = defineProps<{
  active: boolean
  label?: string
  message?: string
}>()

const { t } = useLocale()

const resolvedLabel = computed(() => props.label || t('reload.title'))
const resolvedMessage = computed(() => props.message || t('reload.message'))
</script>

<template>
  <Transition name="fade">
    <div v-if="active" class="reload-overlay px-4">
      <div class="reload-card px-8 py-9 text-center">
        <p class="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/42">
          Conteful
        </p>
        <div class="mt-6 flex justify-center">
          <div class="wave-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <h2 class="mt-6 text-2xl font-semibold tracking-[-0.05em]">
          {{ resolvedLabel }}
        </h2>
        <p class="mt-3 text-sm leading-6 text-black/58">
          {{ resolvedMessage }}
        </p>
      </div>
    </div>
  </Transition>
</template>
