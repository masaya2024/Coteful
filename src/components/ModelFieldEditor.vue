<script setup lang="ts">
import type { ContentField, ContentModel } from '~/types'
import { createFieldDraft, fieldTypeOptions, normalizeFieldForForm } from '~/utils/content'
import { toSlug } from '~/utils/format'
const { t } = useLocale()

const props = defineProps<{
  fields: ContentField[]
  models: ContentModel[]
}>()

const emit = defineEmits<{
  'update:fields': [fields: ContentField[]]
}>()

const fields = computed({
  get: () => props.fields.map(normalizeFieldForForm),
  set: value => emit('update:fields', value.map((field, index) => ({ ...field, order: index + 1 }))),
})

const localizedFieldTypeOptions = computed(() =>
  fieldTypeOptions.map(option => ({
    ...option,
    label: t(`fieldType.${option.value}`),
  })),
)

function patchField(id: string, patch: Partial<ContentField>) {
  fields.value = fields.value.map(field => (field.id === id ? { ...field, ...patch } : field))
}

function addField() {
  fields.value = [...fields.value, createFieldDraft(fields.value.length + 1)]
}

function removeField(id: string) {
  fields.value = fields.value.filter(field => field.id !== id)
}

function moveField(id: string, direction: -1 | 1) {
  const next = [...fields.value]
  const index = next.findIndex(field => field.id === id)
  const targetIndex = index + direction

  if (index < 0 || targetIndex < 0 || targetIndex >= next.length) {
    return
  }

  const [item] = next.splice(index, 1)
  next.splice(targetIndex, 0, item)
  fields.value = next
}

function syncKeys(field: ContentField) {
  if (!field.key) {
    patchField(field.id, { key: toSlug(field.name) })
    return
  }

  patchField(field.id, { apiKey: field.apiKey || field.key })
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">
          {{ t('modelField.title') }}
        </p>
        <p class="mt-2 text-sm text-black/55">
          {{ t('modelField.subtitle') }}
        </p>
      </div>
      <button type="button" class="action-button" @click="addField">
        <Icon name="lucide:plus" size="16" />
        {{ t('modelField.add') }}
      </button>
    </div>

    <div v-if="fields.length" class="space-y-4">
      <article
        v-for="(field, index) in fields"
        :key="field.id"
        class="soft-panel grid gap-4 border px-4 py-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold">
              {{ t('modelField.item', { index: index + 1 }) }}
            </p>
            <div class="flex items-center gap-2">
              <button type="button" class="action-button px-3 py-2 text-sm" @click="moveField(field.id, -1)">
                {{ t('modelField.moveUp') }}
              </button>
              <button type="button" class="action-button px-3 py-2 text-sm" @click="moveField(field.id, 1)">
                {{ t('modelField.moveDown') }}
              </button>
              <button type="button" class="action-button px-3 py-2 text-sm text-red-700" @click="removeField(field.id)">
                {{ t('modelField.remove') }}
              </button>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('modelField.label') }}</span>
              <input
                :value="field.name"
                class="form-input"
                :placeholder="t('modelField.label')"
                @input="patchField(field.id, { name: ($event.target as HTMLInputElement).value })"
                @blur="syncKeys(field)"
              >
            </label>

            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('modelField.type') }}</span>
              <select
                class="form-select"
                :value="field.type"
                @change="patchField(field.id, { type: ($event.target as HTMLSelectElement).value as ContentField['type'] })"
              >
                <option v-for="option in localizedFieldTypeOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('modelField.key') }}</span>
              <input
                :value="field.key"
                class="form-input"
                :placeholder="t('modelField.key')"
                @input="patchField(field.id, { key: toSlug(($event.target as HTMLInputElement).value) })"
              >
            </label>

            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('modelField.apiKey') }}</span>
              <input
                :value="field.apiKey || field.key"
                class="form-input"
                :placeholder="t('modelField.apiKey')"
                @input="patchField(field.id, { apiKey: toSlug(($event.target as HTMLInputElement).value) })"
              >
            </label>
          </div>

          <label class="space-y-2 text-sm">
            <span class="font-medium">{{ t('modelField.description') }}</span>
            <textarea
              :value="field.description"
              class="form-textarea min-h-[96px]"
              :placeholder="t('modelField.description')"
              @input="patchField(field.id, { description: ($event.target as HTMLTextAreaElement).value })"
            />
          </label>

          <label v-if="field.type === 'reference'" class="space-y-2 text-sm">
            <span class="font-medium">{{ t('modelField.referenceModel') }}</span>
            <select
              class="form-select"
              :value="field.referenceModelId || ''"
              @change="patchField(field.id, { referenceModelId: ($event.target as HTMLSelectElement).value })"
            >
              <option value="">
                {{ t('modelField.anyModel') }}
              </option>
              <option v-for="model in models" :key="model.id" :value="model.id">
                {{ model.name }}
              </option>
            </select>
          </label>
        </div>

        <div class="space-y-4">
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="flex items-center gap-3 border border-black/10 bg-white px-3 py-3 text-sm">
              <input
                :checked="field.required"
                type="checkbox"
                @change="patchField(field.id, { required: ($event.target as HTMLInputElement).checked })"
              >
              {{ t('modelField.required') }}
            </label>
            <label class="flex items-center gap-3 border border-black/10 bg-white px-3 py-3 text-sm">
              <input
                :checked="field.unique"
                type="checkbox"
                @change="patchField(field.id, { unique: ($event.target as HTMLInputElement).checked })"
              >
              {{ t('modelField.unique') }}
            </label>
            <label class="flex items-center gap-3 border border-black/10 bg-white px-3 py-3 text-sm">
              <input
                :checked="field.isTitle"
                type="checkbox"
                @change="patchField(field.id, { isTitle: ($event.target as HTMLInputElement).checked })"
              >
              {{ t('modelField.titleField') }}
            </label>
            <label class="flex items-center gap-3 border border-black/10 bg-white px-3 py-3 text-sm">
              <input
                :checked="field.showInList"
                type="checkbox"
                @change="patchField(field.id, { showInList: ($event.target as HTMLInputElement).checked })"
              >
              {{ t('modelField.showInList') }}
            </label>
          </div>

          <label class="space-y-2 text-sm">
            <span class="font-medium">{{ t('modelField.validation') }}</span>
            <input
              class="form-input"
              :value="field.validation.pattern || ''"
              placeholder="^[a-z0-9-]+$"
              @input="patchField(field.id, { validation: { ...field.validation, pattern: ($event.target as HTMLInputElement).value } })"
            >
          </label>

          <div class="soft-panel px-4 py-4 text-sm leading-6 text-black/58">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
              {{ t('modelField.outputPreview') }}
            </p>
            <p class="mt-3 font-mono text-xs text-black/74">
              {{ `{ "${field.apiKey || field.key || 'field'}": "${field.type}" }` }}
            </p>
            <p class="mt-3">
              {{ t('modelField.required') }}: {{ field.required ? t('common.yes') : t('common.no') }} ·
              {{ t('modelField.unique') }}: {{ field.unique ? t('common.yes') : t('common.no') }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <EmptyState
      v-else
      :title="t('modelField.noFieldsTitle')"
      :message="t('modelField.noFieldsMessage')"
    />
  </section>
</template>
