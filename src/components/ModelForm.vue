<script setup lang="ts">
import type { ContentField, ContentModel } from '~/types'
import { createFieldDraft, normalizeFieldForForm } from '~/utils/content'
import { toSlug } from '~/utils/format'
const { t } = useLocale()

const props = defineProps<{
  model?: ContentModel | null
  models: ContentModel[]
  statusOptions: Array<{ label: string; value: string }>
  submitLabel: string
}>()

const emit = defineEmits<{
  submit: [payload: {
    name: string
    apiId: string
    description: string
    status: string
    fields: ContentField[]
  }]
}>()

const form = reactive({
  name: '',
  apiId: '',
  description: '',
  status: 'active',
  fields: [createFieldDraft(1)] as ContentField[],
})

watch(
  () => props.model,
  model => {
    if (!model) {
      return
    }

    form.name = model.name
    form.apiId = model.apiId
    form.description = model.description || ''
    form.status = model.status
    form.fields = model.fields.map(normalizeFieldForForm)
  },
  { immediate: true },
)

watch(
  () => form.name,
  value => {
    if (!props.model) {
      form.apiId = toSlug(value)
    }
  },
)

function onSubmit() {
  emit('submit', {
    name: form.name,
    apiId: form.apiId,
    description: form.description,
    status: form.status,
    fields: form.fields.map((field, index) => ({
      ...field,
      order: index + 1,
      apiKey: field.apiKey || field.key,
    })),
  })
}
</script>

<template>
  <form class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]" @submit.prevent="onSubmit">
    <div class="space-y-6">
      <section class="grid gap-4 md:grid-cols-2">
        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('modelForm.name') }}</span>
          <input v-model="form.name" class="form-input" :placeholder="t('modelForm.name')">
        </label>

        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('modelForm.apiId') }}</span>
          <input v-model="form.apiId" class="form-input" placeholder="article">
        </label>
      </section>

      <section class="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('modelForm.description') }}</span>
          <textarea
            v-model="form.description"
            class="form-textarea min-h-[110px]"
            :placeholder="t('modelForm.description')"
          />
        </label>

        <label class="space-y-2 text-sm">
          <span class="font-medium">{{ t('modelForm.status') }}</span>
          <select v-model="form.status" class="form-select">
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
      </section>

      <ModelFieldEditor v-model:fields="form.fields" :models="models" />
    </div>

    <aside class="space-y-5">
      <div class="hard-panel space-y-4 px-5 py-5">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
          {{ t('modelForm.summary') }}
        </p>
        <div class="space-y-3 text-sm leading-6 text-black/64">
          <p><span class="font-medium text-black">{{ t('modelForm.apiPath') }}</span><br><code>{{ `/api/v1/content/${form.apiId || 'model-api-id'}` }}</code></p>
          <p><span class="font-medium text-black">{{ t('common.fields') }}</span><br>{{ form.fields.length }}</p>
          <p><span class="font-medium text-black">{{ t('modelForm.visibleColumns') }}</span><br>{{ form.fields.filter(field => field.showInList).length }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <button class="action-button" type="button" @click="navigateTo('/models')">
          {{ t('modelForm.cancel') }}
        </button>
        <button class="action-button" data-variant="solid" type="submit">
          <Icon name="lucide:save" size="16" />
          {{ submitLabel }}
        </button>
      </div>
    </aside>
  </form>
</template>
