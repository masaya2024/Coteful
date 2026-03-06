<script setup lang="ts">
import type { MediaItem } from '~/types'
import { formatBytes, formatDateTime } from '~/utils/format'

const { adminRepository } = useCmsAdmin()
const { t } = useLocale()
const search = ref('')
const selectedTag = ref('')

const { data, refresh } = await useAsyncData('media:list', () => adminRepository.listMedia())

const availableTags = computed(() => {
  return Array.from(new Set((data.value?.items || []).flatMap(item => item.tags || []))).sort((left, right) =>
    left.localeCompare(right),
  )
})

const filteredItems = computed(() => {
  const items = data.value?.items || []
  const query = search.value.trim().toLowerCase()

  return items.filter((item: MediaItem) => {
    const matchesQuery = !query
      || [item.fileName, item.mimeType, item.alt, item.tags?.join(' ')].join(' ').toLowerCase().includes(query)
    const matchesTag = !selectedTag.value || item.tags?.includes(selectedTag.value)
    return matchesQuery && matchesTag
  })
})

async function removeMedia(item: MediaItem) {
  if (process.client && !window.confirm(t('confirm.deleteMedia', { name: item.fileName }))) {
    return
  }

  await adminRepository.deleteMedia(item.id)
  await refresh()
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('media.index.eyebrow')"
      :title="t('media.index.title')"
      :description="t('media.index.description')"
    >
      <template #actions>
        <NuxtLink class="action-button" data-variant="solid" to="/media/new">
          <Icon name="lucide:plus" size="16" />
          {{ t('media.index.new') }}
        </NuxtLink>
      </template>
    </PageHeading>

    <section class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px_220px]">
      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('media.index.searchLabel') }}</span>
        <div class="relative">
          <Icon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/36" name="lucide:search" size="16" />
          <input v-model="search" class="form-input pl-10" :placeholder="t('media.index.searchPlaceholder')">
        </div>
      </label>

      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('media.index.tagFilterLabel') }}</span>
        <select v-model="selectedTag" class="form-select">
          <option value="">
            {{ t('media.index.allTags') }}
          </option>
          <option v-for="tag in availableTags" :key="tag" :value="tag">
            {{ tag }}
          </option>
        </select>
      </label>

      <div class="soft-panel flex items-end justify-between px-4 py-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            {{ t('common.total') }}
          </p>
          <p class="mt-2 text-2xl font-semibold tracking-[-0.05em]">
            {{ filteredItems.length }}
          </p>
        </div>
        <button class="action-button px-3 py-2 text-sm" type="button" @click="refresh()">
          {{ t('common.refresh') }}
        </button>
      </div>
    </section>

    <section class="soft-panel overflow-hidden">
      <div class="grid border-b border-black/12 bg-black/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/48 md:grid-cols-[72px_minmax(0,1.2fr)_180px_120px_170px_120px]">
        <span>{{ t('media.index.thumb') }}</span>
        <span>{{ t('media.index.columnMedia') }}</span>
        <span>{{ t('media.detail.mime') }}</span>
        <span>{{ t('media.detail.size') }}</span>
        <span>{{ t('common.updated') }}</span>
        <span class="md:text-right">{{ t('common.edit') }}</span>
      </div>

      <div v-if="filteredItems.length" class="data-grid">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="grid gap-3 px-5 py-4 md:grid-cols-[72px_minmax(0,1.2fr)_180px_120px_170px_120px]"
        >
          <div class="flex h-12 w-12 items-center justify-center border border-black/10 bg-black/[0.03] text-xs uppercase tracking-[0.16em] text-black/40">
            IMG
          </div>
          <div class="min-w-0">
            <NuxtLink :to="`/media/${item.id}`" class="font-medium hover:underline">
              {{ item.fileName }}
            </NuxtLink>
            <p class="mt-1 truncate text-sm text-black/55">
              {{ item.alt || item.description }}
            </p>
          </div>
          <div class="text-sm text-black/58">
            {{ item.mimeType }}
          </div>
          <div class="text-sm text-black/58">
            {{ formatBytes(item.size) }}
          </div>
          <div class="text-sm text-black/58">
            {{ formatDateTime(item.updatedAt) }}
          </div>
          <div class="flex items-center justify-between gap-3 md:justify-end">
            <NuxtLink :to="`/media/${item.id}`" class="text-sm font-medium">
              {{ t('common.edit') }}
            </NuxtLink>
            <button class="text-sm font-medium text-red-700" type="button" @click="removeMedia(item)">
              {{ t('common.delete') }}
            </button>
          </div>
        </div>
      </div>

      <EmptyState
        v-else
        :title="t('media.index.noResultsTitle')"
        :message="t('media.index.noResultsMessage')"
      />
    </section>
  </div>
</template>
