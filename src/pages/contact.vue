<script setup lang="ts">
definePageMeta({
  layout: 'public',
})

const { t } = useLocale()
const { isAuthenticated } = useWorkspaceSession()
</script>

<template>
  <div class="grid gap-6 lg:grid-cols-[minmax(0,1.02fr)_460px] lg:p-6">
    <section class="hard-panel px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
      <p class="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-black/45">
        {{ t('contact.publicEyebrow') }}
      </p>
      <h1 class="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-black md:text-5xl">
        {{ t('contact.publicTitle') }}
      </h1>
      <p class="mt-4 max-w-2xl text-sm leading-7 text-black/58">
        {{ t('contact.publicDescription') }}
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <NuxtLink class="action-button" data-variant="solid" :to="isAuthenticated ? '/support' : '/login'">
          <Icon :name="isAuthenticated ? 'lucide:life-buoy' : 'lucide:log-in'" size="16" />
          {{ isAuthenticated ? t('contact.memberShortcut') : t('public.login') }}
        </NuxtLink>
      </div>

      <div class="mt-10 rounded-3xl border border-black/10 bg-white/78 px-5 py-5">
        <p class="text-xs uppercase tracking-[0.2em] text-black/38">
          {{ t('contact.responseTitle') }}
        </p>
        <p class="mt-3 text-sm leading-7 text-black/58">
          {{ t('contact.responseBodyPublic') }}
        </p>
      </div>
    </section>

    <InquiryComposer mode="public" />
  </div>
</template>
