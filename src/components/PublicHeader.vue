<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()

const topHref = '/login'
const contactHref = '/contact'

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <header class="public-header px-4 py-4 md:px-6 lg:px-8">
    <div class="hard-panel public-header-bar mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-3 md:px-4">
      <div class="flex items-center gap-2">
        <NuxtLink
          :to="topHref"
          class="action-button px-4 py-2 text-sm"
          :data-variant="isActive('/login') ? 'solid' : undefined"
        >
          {{ t('public.top') }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink
          to="/login"
          class="action-button px-4 py-2 text-sm"
          :data-variant="isActive('/login') ? 'solid' : undefined"
        >
          {{ t('public.login') }}
        </NuxtLink>
        <NuxtLink
          :to="contactHref"
          class="action-button px-4 py-2 text-sm"
          :data-variant="isActive('/contact') ? 'solid' : undefined"
        >
          {{ t('public.contact') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
