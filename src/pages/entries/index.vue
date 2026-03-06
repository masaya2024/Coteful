<script setup lang="ts">
import type { ContentEntry } from '~/types'
import { formatDateTime } from '~/utils/format'

const { adminRepository } = useCmsAdmin()
const { t } = useLocale()
const search = ref('')
const selectedModelId = ref('')

const { data, refresh } = await useAsyncData('entries:list', async () => {
  const [entries, models] = await Promise.all([
    adminRepository.listEntries(),
    adminRepository.listModels(),
  ])

  return {
    entries: entries.items,
    models: models.items,
  }
})

const modelMap = computed(() =>
  Object.fromEntries((data.value?.models || []).map(model => [model.id, model])),
)

const filteredEntries = computed(() => {
  const query = search.value.trim().toLowerCase()
  return (data.value?.entries || []).filter((entry: ContentEntry) => {
    const matchesModel = !selectedModelId.value || entry.modelId === selectedModelId.value
    const matchesSearch = !query || [entry.title, entry.slug, modelMap.value[entry.modelId]?.name].join(' ').toLowerCase().includes(query)
    return matchesModel && matchesSearch
  })
})

async function removeEntry(entry: ContentEntry) {
  if (process.client && !window.confirm(t('confirm.deleteEntry', { name: entry.title }))) {
    return
  }

  await adminRepository.deleteEntry(entry.id)
  await refresh()
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('entries.index.eyebrow')"
      :title="t('entries.index.title')"
      :description="t('entries.index.description')"
    >
      <template #actions>
        <NuxtLink class="action-button" data-variant="solid" to="/entries/new">
          <Icon name="lucide:plus" size="16" />
          {{ t('entries.index.new') }}
        </NuxtLink>
      </template>
    </PageHeading>

    <section class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px_200px]">
      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('entries.index.searchLabel') }}</span>
        <div class="relative">
          <Icon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/36" name="lucide:search" size="16" />
          <input v-model="search" class="form-input pl-10" :placeholder="t('entries.index.searchPlaceholder')">
        </div>
      </label>

      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('entryForm.model') }}</span>
        <select v-model="selectedModelId" class="form-select">
          <option value="">
            {{ t('common.allModels') }}
          </option>
          <option v-for="model in data?.models || []" :key="model.id" :value="model.id">
            {{ model.name }}
          </option>
        </select>
      </label>

      <div class="soft-panel flex items-end justify-between px-4 py-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            {{ t('common.total') }}
          </p>
          <p class="mt-2 text-2xl font-semibold tracking-[-0.05em]">
            {{ filteredEntries.length }}
          </p>
        </div>
        <button class="action-button px-3 py-2 text-sm" type="button" @click="refresh()">
          {{ t('common.refresh') }}
        </button>
      </div>
    </section>

    <section class="soft-panel overflow-hidden">
      <div class="grid border-b border-black/12 bg-black/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/48 md:grid-cols-[minmax(0,1.2fr)_180px_160px_170px_120px]">
        <span>{{ t('entries.index.eyebrow') }}</span>
        <span>{{ t('entryForm.model') }}</span>
        <span>{{ t('common.status') }}</span>
        <span>{{ t('common.updated') }}</span>
        <span class="md:text-right">{{ t('common.edit') }}</span>
      </div>

      <div v-if="filteredEntries.length" class="data-grid">
        <div
          v-for="entry in filteredEntries"
          :key="entry.id"
          class="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.2fr)_180px_160px_170px_120px]"
        >
          <div>
            <NuxtLink :to="`/entries/${entry.id}`" class="font-medium hover:underline">
              {{ entry.title }}
            </NuxtLink>
            <p class="mt-1 text-sm text-black/55">{{ entry.slug }}</p>
          </div>
          <div class="text-sm text-black/58">
            {{ modelMap[entry.modelId]?.name || entry.modelId }}
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="pill" :data-tone="entry.status === 'published' ? 'success' : 'warning'">
              {{ t(`status.${entry.status}`) }}
            </span>
            <span v-if="entry.publishedAt" class="text-xs text-black/48">{{ t('status.published') }}</span>
          </div>
          <div class="text-sm text-black/58">
            {{ formatDateTime(entry.updatedAt) }}
          </div>
          <div class="flex items-center justify-between gap-3 md:justify-end">
            <NuxtLink :to="`/entries/${entry.id}`" class="text-sm font-medium">
              {{ t('common.edit') }}
            </NuxtLink>
            <button class="text-sm font-medium text-red-700" type="button" @click="removeEntry(entry)">
              {{ t('common.delete') }}
            </button>
          </div>
        </div>
      </div>

      <EmptyState
        v-else
        :title="t('entries.index.noResultsTitle')"
        :message="t('entries.index.noResultsMessage')"
      />
    </section>
  </div>
</template>
