<script setup lang="ts">
import { formatBytes, formatDateTime } from '~/utils/format'

const route = useRoute()
const { adminRepository } = useCmsAdmin()
const { t } = useLocale()

const { data, refresh } = await useAsyncData(`media:${route.params.id}`, () => adminRepository.getMedia(String(route.params.id)))

if (!data.value?.item) {
  throw createError({ statusCode: 404, statusMessage: t('error.mediaNotFound') })
}

async function submit(payload: {
  fileName: string
  url: string
  mimeType: string
  size: number
  alt: string
  description: string
  tags: string[]
}) {
  await adminRepository.updateMedia(String(route.params.id), payload)
  await refresh()
}

async function removeMedia() {
  if (process.client && !window.confirm(t('confirm.deleteMedia', { name: data.value?.item.fileName || '' }))) {
    return
  }

  await adminRepository.deleteMedia(String(route.params.id))
  await navigateTo('/media')
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('media.detail.eyebrow')"
      :title="data!.item.fileName"
      :description="`${t('media.detail.updatedPrefix')} ${formatDateTime(data!.item.updatedAt)}`"
    >
      <template #actions>
        <button class="action-button text-red-700" type="button" @click="removeMedia">
          <Icon name="lucide:trash-2" size="16" />
          {{ t('media.detail.delete') }}
        </button>
      </template>
    </PageHeading>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]">
      <MediaForm :media="data!.item" :submit-label="t('mediaForm.save')" @submit="submit" />

      <aside class="space-y-6">
        <article class="hard-panel space-y-4 px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('media.detail.snapshot') }}
          </p>
          <div class="space-y-3 text-sm leading-6 text-black/62">
            <p><span class="font-medium text-black">{{ t('media.detail.mime') }}</span><br>{{ data!.item.mimeType }}</p>
            <p><span class="font-medium text-black">{{ t('media.detail.size') }}</span><br>{{ formatBytes(data!.item.size) }}</p>
            <p><span class="font-medium text-black">{{ t('media.detail.url') }}</span><br><code>{{ data!.item.url }}</code></p>
            <p><span class="font-medium text-black">{{ t('media.detail.created') }}</span><br>{{ formatDateTime(data!.item.createdAt) }}</p>
          </div>
        </article>
      </aside>
    </div>
  </div>
</template>
