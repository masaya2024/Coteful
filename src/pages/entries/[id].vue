<script setup lang="ts">
import type { ContentEntry, ContentModel, MediaItem } from '~/types'
import { formatDateTime } from '~/utils/format'

const route = useRoute()
const { adminRepository, entryStatusOptions } = useCmsAdmin()
const { t } = useLocale()

const { data, refresh } = await useAsyncData(`entries:${route.params.id}`, async () => {
  const [entry, models, entries, media] = await Promise.all([
    adminRepository.getEntry(String(route.params.id)),
    adminRepository.listModels(),
    adminRepository.listEntries(),
    adminRepository.listMedia(),
  ])

  return {
    entry: entry.item,
    models: models.items,
    entries: entries.items,
    media: media.items,
  }
})

if (!data.value?.entry) {
  throw createError({ statusCode: 404, statusMessage: t('error.entryNotFound') })
}

async function submit(payload: {
  modelId: string
  title: string
  slug: string
  status: string
  fields: Record<string, unknown>
}) {
  await adminRepository.updateEntry(String(route.params.id), payload)
  await refresh()
}

async function removeEntry() {
  if (process.client && !window.confirm(t('confirm.deleteEntry', { name: data.value?.entry.title || '' }))) {
    return
  }

  await adminRepository.deleteEntry(String(route.params.id))
  await navigateTo('/entries')
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('entries.detail.eyebrow')"
      :title="data!.entry.title"
      :description="`${t('entries.detail.updatedPrefix')} ${formatDateTime(data!.entry.updatedAt)}`"
    >
      <template #actions>
        <button class="action-button text-red-700" type="button" @click="removeEntry">
          <Icon name="lucide:trash-2" size="16" />
          {{ t('entries.detail.delete') }}
        </button>
      </template>
    </PageHeading>

    <EntryForm
      :entry="data!.entry"
      :models="(data!.models || []) as ContentModel[]"
      :entries="(data!.entries || []).filter(entry => entry.id !== data!.entry.id) as ContentEntry[]"
      :media-items="(data!.media || []) as MediaItem[]"
      :status-options="entryStatusOptions"
      :submit-label="t('entryForm.save')"
      @submit="submit"
    />
  </div>
</template>
