import type {
  ContentEntry,
  ContentEntryStatus,
  ContentField,
  ContentFieldType,
  ContentModel,
  JsonValue,
  MediaItem,
} from '~/types'
import { toSlug } from '~/utils/format'

let draftCounter = 0

export const fieldTypeOptions: Array<{ label: string, value: ContentFieldType }> = [
  { label: 'Text', value: 'text' },
  { label: 'Textarea', value: 'textarea' },
  { label: 'Rich Text', value: 'richText' },
  { label: 'Number', value: 'number' },
  { label: 'Boolean', value: 'boolean' },
  { label: 'Date', value: 'date' },
  { label: 'JSON', value: 'json' },
  { label: 'Media', value: 'media' },
  { label: 'Reference', value: 'reference' },
]

export const entryStatusOptions: Array<{ label: string, value: ContentEntryStatus }> = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
]

export function fieldTypeLabel(value: ContentFieldType) {
  return fieldTypeOptions.find(option => option.value === value)?.label ?? value
}

export function createFieldDraft(order: number): ContentField {
  return {
    id: `field-draft-${order}-${draftCounter++}`,
    name: '',
    key: '',
    apiKey: '',
    type: 'text',
    required: false,
    unique: false,
    isTitle: order === 1,
    showInList: order <= 2,
    validation: {},
    order,
    referenceModelId: null,
    description: '',
  }
}

export function createModelDraft(): ContentModel {
  const now = new Date().toISOString()
  const fields = [createFieldDraft(1), createFieldDraft(2)]

  return {
    id: '',
    name: '',
    apiId: '',
    description: '',
    status: 'active',
    titleFieldKey: fields[0].key || null,
    slugFieldKey: null,
    listFieldKeys: [],
    fields,
    createdAt: now,
    updatedAt: now,
  }
}

export function ensureModelDraft(model?: ContentModel | null): ContentModel {
  if (!model) {
    return createModelDraft()
  }

  return {
    ...model,
    titleFieldKey: model.titleFieldKey || null,
    slugFieldKey: model.slugFieldKey || null,
    listFieldKeys: [...model.listFieldKeys],
    fields: [...model.fields]
      .sort((left, right) => left.order - right.order)
      .map(field => ({
        ...field,
        apiKey: field.apiKey || field.key,
        validation: field.validation || {},
        description: field.description || '',
        referenceModelId: field.referenceModelId || field.validation.referenceModelId || null,
      })),
  }
}

export function normalizeFieldForForm(field: ContentField): ContentField {
  return {
    ...field,
    apiKey: field.apiKey || field.key,
    validation: field.validation || {},
    description: field.description || '',
    referenceModelId: field.referenceModelId || field.validation.referenceModelId || null,
  }
}

export function defaultFieldValue(type: ContentFieldType): JsonValue {
  switch (type) {
    case 'number':
      return 0
    case 'boolean':
      return false
    case 'json':
      return '{}'
    default:
      return ''
  }
}

export function buildEntryFields(model?: ContentModel | null, current?: Record<string, JsonValue>) {
  const result: Record<string, JsonValue> = {}

  for (const field of model?.fields ?? []) {
    result[field.key] = current?.[field.key] ?? defaultFieldValue(field.type)
  }

  return result
}

export function createEntryFieldDefaults(model?: ContentModel | null) {
  return buildEntryFields(model)
}

export function createEntryDraft(model?: ContentModel | null): ContentEntry {
  const now = new Date().toISOString()

  return {
    id: '',
    modelId: model?.id ?? '',
    title: '',
    slug: '',
    status: 'draft',
    fields: buildEntryFields(model),
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
  }
}

export function ensureEntryDraft(entry: ContentEntry | null | undefined, model?: ContentModel | null): ContentEntry {
  if (!entry) {
    return createEntryDraft(model)
  }

  return {
    ...entry,
    fields: buildEntryFields(model, entry.fields),
  }
}

export function createMediaDraft(): MediaItem {
  const now = new Date().toISOString()

  return {
    id: '',
    fileName: '',
    url: '',
    mimeType: '',
    size: 0,
    alt: '',
    description: '',
    tags: [],
    linkedEntryCount: 0,
    createdAt: now,
    updatedAt: now,
  }
}

export function titleField(model?: ContentModel | null) {
  return (
    model?.fields.find(field => field.key === model.titleFieldKey)
    || model?.fields.find(field => field.isTitle)
    || model?.fields[0]
    || null
  )
}

export function deriveEntryTitle(
  model: ContentModel | null | undefined,
  entryFields: Record<string, JsonValue>,
  fallback: string,
) {
  const targetField = titleField(model)
  if (!targetField) {
    return fallback
  }

  const value = entryFields[targetField.key]
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

export function syncEntryTitle(model: ContentModel | null | undefined, entryFields: Record<string, unknown>) {
  return deriveEntryTitle(model, entryFields as Record<string, JsonValue>, '')
}

export function deriveEntrySlug(title: string, currentSlug: string) {
  return currentSlug.length > 0 ? currentSlug : toSlug(title)
}

export function syncEntrySlug(input: string) {
  return toSlug(input)
}

export function parseJsonField(value: string): JsonValue {
  try {
    return JSON.parse(value) as JsonValue
  }
  catch {
    return value
  }
}

export function mediaLabel(media: MediaItem) {
  return `${media.fileName} · ${media.mimeType}`
}

export function referenceEntriesForField(field: ContentField, entries: ContentEntry[]) {
  const referenceModelId = field.referenceModelId || field.validation.referenceModelId
  if (!referenceModelId) {
    return entries
  }

  return entries.filter(entry => entry.modelId === referenceModelId)
}

export function stringToTags(value: string) {
  return value
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
}

export function tagsToString(tags?: string[]) {
  return tags?.join(', ') || ''
}
