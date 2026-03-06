<script setup lang="ts">
import type { ContentEntry, ContentModel, MediaItem } from '~/types'
import { mediaLabel, referenceEntriesForField } from '~/utils/content'
const { t } = useLocale()

const props = defineProps<{
  model: ContentModel
  mediaItems: MediaItem[]
  entries: ContentEntry[]
}>()

const entryFields = defineModel<Record<string, unknown>>({ required: true })

function updateField(key: string, value: unknown) {
  entryFields.value = {
    ...entryFields.value,
    [key]: value,
  }
}

function asJsonText(value: unknown) {
  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value ?? {}, null, 2)
}
</script>

<template>
  <div class="space-y-5">
    <div
      v-for="field in model.fields"
      :key="field.id"
      class="space-y-2 text-sm"
    >
      <label class="flex items-center justify-between">
        <span class="font-medium">{{ field.name }}</span>
        <span class="text-xs uppercase tracking-[0.15em] text-black/38">{{ t(`fieldType.${field.type}`) }}</span>
      </label>

      <input
        v-if="field.type === 'text'"
        :value="String(entryFields[field.key] ?? '')"
        class="form-input"
        :placeholder="field.description || field.name"
        @input="updateField(field.key, ($event.target as HTMLInputElement).value)"
      >

      <textarea
        v-else-if="field.type === 'textarea' || field.type === 'richText'"
        :value="String(entryFields[field.key] ?? '')"
        class="form-textarea"
        :placeholder="field.description || field.name"
        @input="updateField(field.key, ($event.target as HTMLTextAreaElement).value)"
      />

      <input
        v-else-if="field.type === 'number'"
        :value="Number(entryFields[field.key] ?? 0)"
        class="form-input"
        type="number"
        @input="updateField(field.key, Number(($event.target as HTMLInputElement).value))"
      >

      <input
        v-else-if="field.type === 'date'"
        :value="String(entryFields[field.key] ?? '')"
        class="form-input"
        type="datetime-local"
        @input="updateField(field.key, ($event.target as HTMLInputElement).value)"
      >

      <textarea
        v-else-if="field.type === 'json'"
        :value="asJsonText(entryFields[field.key])"
        class="form-textarea"
        placeholder="{ }"
        @input="updateField(field.key, ($event.target as HTMLTextAreaElement).value)"
      />

      <select
        v-else-if="field.type === 'media'"
        class="form-select"
        :value="String(entryFields[field.key] ?? '')"
        @change="updateField(field.key, ($event.target as HTMLSelectElement).value)"
      >
        <option value="">
          {{ t('entryField.selectMedia') }}
        </option>
        <option v-for="media in mediaItems" :key="media.id" :value="media.id">
          {{ mediaLabel(media) }}
        </option>
      </select>

      <select
        v-else-if="field.type === 'reference'"
        class="form-select"
        :value="String(entryFields[field.key] ?? '')"
        @change="updateField(field.key, ($event.target as HTMLSelectElement).value)"
      >
        <option value="">
          {{ t('entryField.selectEntry') }}
        </option>
        <option
          v-for="entry in referenceEntriesForField(field, entries)"
          :key="entry.id"
          :value="entry.id"
        >
          {{ entry.title }}
        </option>
      </select>

      <label v-else-if="field.type === 'boolean'" class="flex items-center gap-3 border border-black/10 bg-white px-4 py-3">
        <input
          :checked="Boolean(entryFields[field.key])"
          type="checkbox"
          @change="updateField(field.key, ($event.target as HTMLInputElement).checked)"
        >
        <span>{{ field.description || t('entryField.enable') }}</span>
      </label>

      <input
        v-else
        :value="String(entryFields[field.key] ?? '')"
        class="form-input"
        @input="updateField(field.key, ($event.target as HTMLInputElement).value)"
      >

      <p v-if="field.description" class="text-xs leading-5 text-black/50">
        {{ field.description }}
      </p>
    </div>
  </div>
</template>
