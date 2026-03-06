<script setup lang="ts">
import type { ContentEntry, ContentModel, MediaItem } from '~/types'

const route = useRoute()
const { adminRepository, entryStatusOptions } = useCmsAdmin()
const { t } = useLocale()

const initialModelId = computed(() => {
  const target = route.query.modelId
  return typeof target === 'string' ? target : ''
})

const { data } = await useAsyncData('entries:new:deps', async () => {
  const [models, entries, media] = await Promise.all([
    adminRepository.listModels(),
    adminRepository.listEntries(),
    adminRepository.listMedia(),
  ])

  return {
    models: models.items,
    entries: entries.items,
    media: media.items,
  }
})

async function submit(payload: {
  modelId: string
  title: string
  slug: string
  status: string
  fields: Record<string, unknown>
}) {
  const response = await adminRepository.createEntry(payload)
  await navigateTo(`/entries/${response.item.id}`)
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('entries.new.eyebrow')"
      :title="t('entries.new.title')"
      :description="t('entries.new.description')"
    />

    <EntryForm
      :models="(data?.models || []) as ContentModel[]"
      :entries="(data?.entries || []) as ContentEntry[]"
      :media-items="(data?.media || []) as MediaItem[]"
      :status-options="entryStatusOptions"
      :initial-model-id="initialModelId"
      :submit-label="t('entryForm.create')"
      @submit="submit"
    />
  </div>
</template>
