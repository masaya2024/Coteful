<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const { t } = useLocale()
const sessionId = useCookie<string | null>('conteful-session-id', {
  sameSite: 'lax',
})
const showPublicHeader = computed(() => !sessionId.value)

const statusCode = computed(() => props.error?.statusCode || props.error?.status || 500)
const isBadRequest = computed(() => statusCode.value === 400)
const title = computed(() => {
  if (isBadRequest.value) {
    return t('error.badRequestTitle')
  }

  return props.error?.statusMessage || t('error.genericTitle')
})
const description = computed(() => {
  if (isBadRequest.value) {
    return t('error.badRequestMessage')
  }

  return props.error?.message || t('error.genericMessage')
})

function backToTop() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="page-shell min-h-screen">
    <PublicHeader v-if="showPublicHeader" />
    <div class="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
      <div class="reload-card w-full max-w-2xl px-8 py-12 text-center md:px-12">
        <p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-black/42">
          Conteful
        </p>
        <p class="error-code mt-6 font-semibold text-black">
          {{ statusCode }}
        </p>
        <h1 class="mt-5 text-3xl font-semibold tracking-[-0.05em] text-black">
          {{ title }}
        </h1>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/58">
          {{ description }}
        </p>
        <div class="mt-8 flex justify-center">
          <button class="action-button min-w-44" data-variant="solid" type="button" @click="backToTop">
            {{ t('error.backToTop') }}
          </button>
        </div>
      </div>
    </div>
    <LocaleDock v-if="showPublicHeader" />
  </div>
</template>
