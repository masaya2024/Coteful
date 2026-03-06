<script setup lang="ts">
import type { ContentEntry, ContentModel, MediaItem } from '~/types'
import { createEntryFieldDefaults, syncEntrySlug, syncEntryTitle } from '~/utils/content'
const { t } = useLocale()

const props = defineProps<{
  entry?: ContentEntry | null
  models: ContentModel[]
  mediaItems: MediaItem[]
  entries: ContentEntry[]
  submitLabel: string
  statusOptions: Array<{ label: string; value: string }>
  initialModelId?: string
}>()

const emit = defineEmits<{
  submit: [payload: {
    modelId: string
    title: string
    slug: string
    status: string
    fields: Record<string, unknown>
  }]
}>()

const selectedModelId = ref(props.entry?.modelId || props.initialModelId || props.models[0]?.id || '')
const model = computed(() => props.models.find(item => item.id === selectedModelId.value) || null)

const form = reactive({
  title: props.entry?.title || '',
  slug: props.entry?.slug || '',
  status: props.entry?.status || 'draft',
  fields: (props.entry?.fields ? structuredClone(props.entry.fields) : createEntryFieldDefaults(model.value)) as Record<string, unknown>,
})

watch(
  () => props.entry,
  entry => {
    if (!entry) {
      return
    }

    selectedModelId.value = entry.modelId
    form.title = entry.title
    form.slug = entry.slug
    form.status = entry.status
    form.fields = structuredClone(entry.fields)
  },
  { immediate: true },
)

watch(model, nextModel => {
  if (!nextModel) {
    return
  }

  const nextFields = createEntryFieldDefaults(nextModel)
  for (const field of nextModel.fields) {
    if (field.key in form.fields) {
      nextFields[field.key] = form.fields[field.key]
    }
  }
  form.fields = nextFields
}, { immediate: true })

watch(
  () => form.fields,
  value => {
    if (props.entry) {
      return
    }

    const nextTitle = syncEntryTitle(model.value, value)
    if (nextTitle) {
      form.title = nextTitle
      form.slug = syncEntrySlug(nextTitle)
    }
  },
  { deep: true },
)

function onSubmit() {
  emit('submit', {
    modelId: selectedModelId.value,
    title: form.title,
    slug: form.slug,
    status: form.status,
    fields: form.fields,
  })
}
</script>

<template>
  <form class="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_360px]" @submit.prevent="onSubmit">
    <div class="space-y-6">
      <section class="grid gap-4 md:grid-cols-[260px_minmax(0,1fr)]">
        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('entryForm.model') }}</span>
          <select v-model="selectedModelId" class="form-select" :disabled="Boolean(entry)">
            <option v-for="item in models" :key="item.id" :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </label>

        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('entryForm.title') }}</span>
          <input v-model="form.title" class="form-input" :placeholder="t('entryForm.title')">
        </label>
      </section>

      <section class="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('entryForm.slug') }}</span>
          <input v-model="form.slug" class="form-input" placeholder="entry-slug">
        </label>

        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('entryForm.status') }}</span>
          <select v-model="form.status" class="form-select">
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
      </section>

      <section v-if="model" class="soft-panel px-5 py-5">
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">
              {{ t('entryForm.dynamicFields') }}
            </p>
            <h2 class="mt-3 text-xl font-semibold tracking-[-0.04em]">
              {{ model.name }}
            </h2>
          </div>
          <span class="pill">{{ model.apiId }}</span>
        </div>

        <EntryFieldRenderer v-model="form.fields" :model="model" :media-items="mediaItems" :entries="entries" />
      </section>
    </div>

    <aside class="space-y-5">
      <div class="hard-panel space-y-4 px-5 py-5">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
          {{ t('entryForm.publishPreview') }}
        </p>
        <div class="space-y-3 text-sm leading-6 text-black/64">
          <p><span class="font-medium text-black">{{ t('entryForm.deliveryPath') }}</span><br><code>{{ `/api/v1/content/${model?.apiId || 'model-api-id'}/${entry?.id || 'entry-id'}` }}</code></p>
          <p><span class="font-medium text-black">{{ t('entryForm.status') }}</span><br>{{ t(`status.${form.status}`) }}</p>
          <p><span class="font-medium text-black">{{ t('common.fields') }}</span><br>{{ Object.keys(form.fields).length }} {{ t('entryForm.boundFields') }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <button class="action-button" type="button" @click="navigateTo('/entries')">
          {{ t('entryForm.cancel') }}
        </button>
        <button class="action-button" data-variant="solid" type="submit">
          <Icon name="lucide:save" size="16" />
          {{ submitLabel }}
        </button>
      </div>
    </aside>
  </form>
</template>
