<script setup lang="ts">
const { locale } = useLocale()
const { active, label, message, show, hide } = useReloadOverlay()
const { bootstrapSession, isAuthenticated } = useWorkspaceSession()

const nuxtApp = useNuxtApp()

await callOnce('workspace-session', () => bootstrapSession())

if (import.meta.client) {
  nuxtApp.hook('page:start', () => {
    show()
  })
  nuxtApp.hook('page:finish', () => {
    hide()
  })
  nuxtApp.hook('page:error', () => {
    hide()
  })
  nuxtApp.hook('app:error', () => {
    hide()
  })
}

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
  },
}))
</script>

<template>
  <div class="app-shell">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LocaleDock v-if="!isAuthenticated" />
    <ReloadScreen :active="active" :label="label" :message="message" />
  </div>
</template>
