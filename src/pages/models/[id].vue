<script setup lang="ts">
import type { ContentField } from '~/types'
import { formatDateTime } from '~/utils/format'

const route = useRoute()
const { adminRepository, modelStatusOptions } = useCmsAdmin()
const { t } = useLocale()

const { data, refresh } = await useAsyncData(`models:${route.params.id}`, async () => {
  const [model, models, entries] = await Promise.all([
    adminRepository.getModel(String(route.params.id)),
    adminRepository.listModels(),
    adminRepository.listEntries(String(route.params.id)),
  ])

  return {
    model: model.item,
    models: models.items,
    entries: entries.items,
  }
})

if (!data.value?.model) {
  throw createError({ statusCode: 404, statusMessage: t('error.modelNotFound') })
}

async function submit(payload: {
  name: string
  apiId: string
  description: string
  status: string
  fields: ContentField[]
}) {
  await adminRepository.updateModel(String(route.params.id), payload)
  await refresh()
}

async function removeModel() {
  if (process.client && !window.confirm(t('confirm.deleteModel', { name: data.value?.model.name || '' }))) {
    return
  }

  await adminRepository.deleteModel(String(route.params.id))
  await navigateTo('/models')
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('models.detail.eyebrow')"
      :title="data!.model.name"
      :description="data!.model.description || t('models.detail.descriptionFallback')"
    >
      <template #actions>
        <button class="action-button text-red-700" type="button" @click="removeModel">
          <Icon name="lucide:trash-2" size="16" />
          {{ t('models.detail.delete') }}
        </button>
      </template>
    </PageHeading>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]">
      <div class="space-y-6">
        <ModelForm
          :model="data!.model"
          :models="data!.models"
          :status-options="modelStatusOptions"
          :submit-label="t('modelForm.save')"
          @submit="submit"
        />
      </div>

      <aside class="space-y-6">
        <article class="hard-panel space-y-4 px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('models.detail.snapshot') }}
          </p>
          <div class="space-y-3 text-sm leading-6 text-black/62">
            <p><span class="font-medium text-black">{{ t('common.updated') }}</span><br>{{ formatDateTime(data!.model.updatedAt) }}</p>
            <p><span class="font-medium text-black">{{ t('models.detail.apiPath') }}</span><br><code>{{ `/api/v1/content/${data!.model.apiId}` }}</code></p>
            <p><span class="font-medium text-black">{{ t('models.detail.entriesUsing') }}</span><br>{{ data!.entries.length }}</p>
          </div>
        </article>

        <article class="hard-panel px-5 py-5">
          <div class="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
                {{ t('models.detail.relatedEntriesEyebrow') }}
              </p>
              <h2 class="mt-2 text-lg font-semibold tracking-[-0.04em]">
                {{ t('models.detail.relatedEntriesTitle') }}
              </h2>
            </div>
            <NuxtLink class="action-button px-3 py-2 text-sm" :to="`/entries/new?modelId=${data!.model.id}`">
              {{ t('models.detail.newEntry') }}
            </NuxtLink>
          </div>

          <div v-if="data!.entries.length" class="data-grid mt-4">
            <NuxtLink
              v-for="entry in data!.entries.slice(0, 6)"
              :key="entry.id"
              :to="`/entries/${entry.id}`"
              class="block px-1 py-4"
            >
              <p class="font-medium">{{ entry.title }}</p>
              <p class="mt-1 text-sm text-black/55">{{ entry.slug }}</p>
            </NuxtLink>
          </div>

          <EmptyState
            v-else
            :title="t('models.detail.noEntriesTitle')"
            :message="t('models.detail.noEntriesMessage')"
          />
        </article>
      </aside>
    </div>
  </div>
</template>
