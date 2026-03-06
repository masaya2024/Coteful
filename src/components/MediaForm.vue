<script setup lang="ts">
import type { MediaItem } from '~/types'
import { stringToTags, tagsToString } from '~/utils/content'
const { t } = useLocale()

const props = defineProps<{
  media?: MediaItem | null
  submitLabel: string
}>()

const emit = defineEmits<{
  submit: [payload: {
    fileName: string
    url: string
    mimeType: string
    size: number
    alt: string
    description: string
    tags: string[]
  }]
}>()

const form = reactive({
  fileName: props.media?.fileName || '',
  url: props.media?.url || '',
  mimeType: props.media?.mimeType || 'image/jpeg',
  size: props.media?.size || 240000,
  alt: props.media?.alt || '',
  description: props.media?.description || '',
  tags: tagsToString(props.media?.tags),
})

watch(
  () => props.media,
  media => {
    if (!media) {
      return
    }

    form.fileName = media.fileName
    form.url = media.url
    form.mimeType = media.mimeType
    form.size = media.size
    form.alt = media.alt
    form.description = media.description
    form.tags = tagsToString(media.tags)
  },
  { immediate: true },
)

function onSubmit() {
  emit('submit', {
    fileName: form.fileName,
    url: form.url,
    mimeType: form.mimeType,
    size: form.size,
    alt: form.alt,
    description: form.description,
    tags: stringToTags(form.tags),
  })
}
</script>

<template>
  <form class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_360px]" @submit.prevent="onSubmit">
    <div class="space-y-6">
      <section class="grid gap-4 md:grid-cols-2">
        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('mediaForm.fileName') }}</span>
          <input v-model="form.fileName" class="form-input" placeholder="hero-banner.jpg">
        </label>

        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('mediaForm.url') }}</span>
          <input v-model="form.url" class="form-input" placeholder="https://images.example.com/hero-banner.jpg">
        </label>
      </section>

      <section class="grid gap-4 md:grid-cols-2">
        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('mediaForm.mime') }}</span>
          <input v-model="form.mimeType" class="form-input" placeholder="image/jpeg">
        </label>

        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('mediaForm.size') }}</span>
          <input v-model.number="form.size" class="form-input" type="number" min="0">
        </label>
      </section>

      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('mediaForm.alt') }}</span>
        <input v-model="form.alt" class="form-input" placeholder="Editorial hero image">
      </label>

      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('mediaForm.description') }}</span>
        <textarea
          v-model="form.description"
          class="form-textarea"
          :placeholder="t('mediaForm.description')"
        />
      </label>

      <label class="space-y-2 text-sm">
        <span class="font-medium">{{ t('mediaForm.tags') }}</span>
        <input v-model="form.tags" class="form-input" placeholder="campaign, homepage, spring">
      </label>
    </div>

    <aside class="space-y-5">
      <div class="hard-panel space-y-4 px-5 py-5">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
          {{ t('mediaForm.uploadMode') }}
        </p>
        <p class="text-sm leading-6 text-black/64">
          {{ t('mediaForm.uploadModeBody') }}
        </p>
        <div class="space-y-2 text-sm leading-6 text-black/64">
          <p><span class="font-medium text-black">{{ t('mediaForm.resolvedUrl') }}</span><br><code>{{ form.url || 'https://mock.cdn.local/media-item' }}</code></p>
          <p><span class="font-medium text-black">{{ t('mediaForm.tags') }}</span><br>{{ form.tags || t('mediaForm.noTags') }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <button class="action-button" type="button" @click="navigateTo('/media')">
          {{ t('mediaForm.cancel') }}
        </button>
        <button class="action-button" data-variant="solid" type="submit">
          <Icon name="lucide:save" size="16" />
          {{ submitLabel }}
        </button>
      </div>
    </aside>
  </form>
</template>
