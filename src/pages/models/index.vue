<script setup lang="ts">
import type { ContentModel } from '~/types'
import { formatDateTime } from '~/utils/format'

const { adminRepository } = useCmsAdmin()
const { t } = useLocale()
const search = ref('')

const { data, refresh } = await useAsyncData('models:list', () => adminRepository.listModels())

const filteredItems = computed(() => {
  const items = data.value?.items || []
  const query = search.value.trim().toLowerCase()

  if (!query) {
    return items
  }

  return items.filter((item: ContentModel) =>
    [item.name, item.apiId, item.description].join(' ').toLowerCase().includes(query),
  )
})

async function removeModel(model: ContentModel) {
  if (process.client && !window.confirm(t('confirm.deleteModel', { name: model.name }))) {
    return
  }

  await adminRepository.deleteModel(model.id)
  await refresh()
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('models.index.eyebrow')"
      :title="t('models.index.title')"
      :description="t('models.index.description')"
    >
      <template #actions>
        <NuxtLink class="action-button" data-variant="solid" to="/models/new">
          <Icon name="lucide:plus" size="16" />
          {{ t('models.index.new') }}
        </NuxtLink>
      </template>
    </PageHeading>

    <section class="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('models.index.searchLabel') }}</span>
        <div class="relative">
          <Icon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/36" name="lucide:search" size="16" />
          <input v-model="search" class="form-input pl-10" :placeholder="t('models.index.searchPlaceholder')">
        </div>
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
      <div class="grid border-b border-black/12 bg-black/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black/48 md:grid-cols-[minmax(0,1.3fr)_160px_120px_180px_150px]">
        <span>{{ t('models.index.eyebrow') }}</span>
        <span>{{ t('modelForm.apiId') }}</span>
        <span>{{ t('common.fields') }}</span>
        <span>{{ t('common.status') }}</span>
        <span class="md:text-right">{{ t('common.updated') }}</span>
      </div>

      <div v-if="filteredItems.length" class="data-grid">
        <div
          v-for="model in filteredItems"
          :key="model.id"
          class="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.3fr)_160px_120px_180px_150px]"
        >
          <div class="min-w-0">
            <NuxtLink :to="`/models/${model.id}`" class="font-medium hover:underline">
              {{ model.name }}
            </NuxtLink>
            <p class="mt-1 truncate text-sm text-black/55">
              {{ model.description }}
            </p>
          </div>
          <div class="text-sm text-black/58">
            {{ model.apiId }}
          </div>
          <div class="text-sm text-black/58">
            {{ model.fields.length }}
          </div>
          <div>
            <span class="pill" :data-tone="model.status === 'active' ? 'success' : 'warning'">
              {{ t(`status.${model.status}`) }}
            </span>
          </div>
          <div class="flex items-center justify-between gap-3 md:justify-end">
            <span class="text-sm text-black/58">{{ formatDateTime(model.updatedAt) }}</span>
            <button class="text-sm font-medium text-red-700" type="button" @click="removeModel(model)">
              {{ t('common.delete') }}
            </button>
          </div>
        </div>
      </div>

      <EmptyState
        v-else
        :title="t('models.index.noResultsTitle')"
        :message="t('models.index.noResultsMessage')"
      />
    </section>
  </div>
</template>
