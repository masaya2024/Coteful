<script setup lang="ts">
import type { ApiResponseMeta, ApiToken, ProjectWebhook, ProjectWebhookEvent } from '~/types'
import { formatDateTime } from '~/utils/format'

const { adminRepository, contentRepository, tokenKindOptions } = useCmsAdmin()
const { t } = useLocale()
const { activeProject } = useWorkspaceSession()

const { data, refresh } = await useAsyncData('api-settings', async () => {
  const [tokens, models, webhooks] = await Promise.all([
    adminRepository.listTokens(),
    adminRepository.listModels(),
    adminRepository.listWebhooks(),
  ])

  return {
    tokens: tokens.items,
    models: models.items,
    webhooks: webhooks.items,
  }
})

const selectedModelApiId = ref(data.value?.models[0]?.apiId || '')
const deliverySearchInput = ref('')
const committedDeliverySearch = ref('')

watch(
  () => data.value?.models,
  (models) => {
    if (!models?.length) {
      selectedModelApiId.value = ''
      deliverySearchInput.value = ''
      committedDeliverySearch.value = ''
      return
    }

    const currentExists = models.some(model => model.apiId === selectedModelApiId.value)
    if (!currentExists) {
      selectedModelApiId.value = models[0].apiId
      deliverySearchInput.value = ''
      committedDeliverySearch.value = ''
    }
  },
  { immediate: true },
)

const selectedModel = computed(() => {
  return data.value?.models.find(model => model.apiId === selectedModelApiId.value) || null
})

const emptyDeliveryResponse = (): { items: never[]; total: number; meta: ApiResponseMeta } => ({
  items: [],
  total: 0,
  meta: {
    timestamp: new Date().toISOString(),
    version: 'v1',
    filters: {},
  },
})

const {
  data: deliveryPreview,
  pending: deliveryPending,
  refresh: refreshDeliveryPreview,
  error: deliveryError,
} = await useAsyncData('api-settings:delivery-preview', async () => {
  if (!selectedModelApiId.value) {
    return emptyDeliveryResponse()
  }

  return contentRepository.listContent(selectedModelApiId.value, {
    q: committedDeliverySearch.value || undefined,
    projectId: selectedModel.value?.projectId || activeProject.value?.id || undefined,
  })
})

watch(selectedModelApiId, async (nextValue, previousValue) => {
  if (!nextValue || nextValue === previousValue) {
    return
  }

  deliverySearchInput.value = ''
  committedDeliverySearch.value = ''
  await refreshDeliveryPreview()
})

const deliveryEndpoint = computed(() => {
  if (!selectedModel.value) {
    return '/api/v1/content/{modelApiId}?projectId={projectId}'
  }

  const params = new URLSearchParams()
  params.set('projectId', selectedModel.value?.projectId || activeProject.value?.id || '{projectId}')

  if (committedDeliverySearch.value) {
    params.set('q', committedDeliverySearch.value)
  }

  return `/api/v1/content/${selectedModel.value.apiId}?${params.toString()}`
})

const deliveryResponseSample = computed(() => {
  const response = deliveryPreview.value || emptyDeliveryResponse()

  return JSON.stringify({
    items: response.items.slice(0, 2),
    total: response.total,
    meta: response.meta,
  }, null, 2)
})

const deliveryErrorMessage = computed(() => {
  return deliveryError.value?.statusMessage || deliveryError.value?.message || ''
})

async function applyDeliveryPreview() {
  committedDeliverySearch.value = deliverySearchInput.value.trim()
  await refreshDeliveryPreview()
}

const tokenForm = reactive({
  name: '',
  type: 'delivery',
})

const endpointExamples = computed(() => {
  const firstModel = data.value?.models[0]
  if (!firstModel) {
    return [
      '/api/v1/admin/models',
      '/api/v1/admin/entries',
      '/api/v1/admin/media',
      '/api/v1/admin/webhooks',
      '/api/v1/content/{modelApiId}?projectId={projectId}',
    ]
  }

  return [
    '/api/v1/admin/models',
    '/api/v1/admin/entries',
    '/api/v1/admin/media',
    '/api/v1/admin/webhooks',
    `/api/v1/content/${firstModel.apiId}?projectId=${activeProject.value?.id || '{projectId}'}`,
    `/api/v1/content/${firstModel.apiId}/{entryId}?projectId=${activeProject.value?.id || '{projectId}'}`,
  ]
})

const webhookForm = reactive<{
  name: string
  url: string
  events: ProjectWebhookEvent[]
}>({
  name: '',
  url: 'https://example.com/webhooks/conteful',
  events: ['entry.published'],
})

const webhookEventOptions: Array<{ label: string, value: ProjectWebhookEvent }> = [
  { label: t('webhook.event.entryPublished'), value: 'entry.published' },
  { label: t('webhook.event.entryUpdated'), value: 'entry.updated' },
  { label: t('webhook.event.entryDeleted'), value: 'entry.deleted' },
  { label: t('webhook.event.mediaUpdated'), value: 'media.updated' },
  { label: t('webhook.event.modelUpdated'), value: 'model.updated' },
]

async function createToken() {
  if (!tokenForm.name.trim()) {
    return
  }

  await adminRepository.createToken({
    name: tokenForm.name,
    type: tokenForm.type,
  })

  tokenForm.name = ''
  tokenForm.type = 'delivery'
  await refresh()
}

async function invalidateToken(token: ApiToken) {
  if (process.client && !window.confirm(t('confirm.invalidateToken', { name: token.name }))) {
    return
  }

  await adminRepository.invalidateToken(token.id)
  await refresh()
}

async function createWebhook() {
  if (!webhookForm.name.trim() || !webhookForm.url.trim() || !webhookForm.events.length) {
    return
  }

  await adminRepository.createWebhook({
    name: webhookForm.name,
    url: webhookForm.url,
    events: [...webhookForm.events],
  })

  webhookForm.name = ''
  webhookForm.url = 'https://example.com/webhooks/conteful'
  webhookForm.events = ['entry.published']
  await refresh()
}

async function testWebhook(webhook: ProjectWebhook) {
  await adminRepository.testWebhook(webhook.id)
  await refresh()
}

async function deleteWebhook(webhook: ProjectWebhook) {
  if (process.client && !window.confirm(t('confirm.deleteWebhook', { name: webhook.name }))) {
    return
  }

  await adminRepository.deleteWebhook(webhook.id)
  await refresh()
}

function toggleWebhookEvent(eventName: ProjectWebhookEvent) {
  if (webhookForm.events.includes(eventName)) {
    webhookForm.events = webhookForm.events.filter(item => item !== eventName)
    return
  }

  webhookForm.events = [...webhookForm.events, eventName]
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('api.eyebrow')"
      :title="t('api.title')"
      :description="t('api.description')"
    />

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
      <section class="space-y-6">
        <article class="soft-panel px-5 py-5">
          <div class="border-b border-black/10 pb-4">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
              {{ t('api.previewEyebrow') }}
            </p>
            <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
              {{ t('api.previewTitle') }}
            </h2>
          </div>

          <div v-if="data?.models.length" class="mt-5 space-y-5">
            <div class="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)_auto]">
              <label class="space-y-2 text-sm">
                <span class="font-medium">{{ t('api.previewModelLabel') }}</span>
                <select v-model="selectedModelApiId" class="form-select">
                  <option v-for="model in data.models" :key="model.id" :value="model.apiId">
                    {{ model.name }}
                  </option>
                </select>
              </label>

              <label class="space-y-2 text-sm">
                <span class="font-medium">{{ t('api.previewSearchLabel') }}</span>
                <div class="relative">
                  <Icon class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/36" name="lucide:search" size="16" />
                  <input
                    v-model="deliverySearchInput"
                    class="form-input pl-10"
                    :placeholder="t('api.previewSearchPlaceholder')"
                    @keydown.enter.prevent="applyDeliveryPreview"
                  >
                </div>
              </label>

              <div class="flex items-end">
                <button class="action-button" type="button" @click="applyDeliveryPreview">
                  <Icon name="lucide:refresh-cw" size="16" />
                  {{ t('api.previewAction') }}
                </button>
              </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_180px_180px]">
              <div class="border border-black/10 bg-white px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                  {{ t('api.previewEndpoint') }}
                </p>
                <p class="mt-3 break-all font-mono text-xs leading-6 text-black/70">
                  {{ deliveryEndpoint }}
                </p>
              </div>

              <div class="border border-black/10 bg-white px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                  {{ t('api.previewPublishedCount') }}
                </p>
                <p class="mt-3 text-2xl font-semibold tracking-[-0.05em]">
                  {{ deliveryPreview?.total || 0 }}
                </p>
              </div>

              <div class="border border-black/10 bg-white px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                  {{ t('api.previewProjectScope') }}
                </p>
                <p class="mt-3 text-sm leading-6 text-black/64">
                  {{ activeProject?.name || '-' }}
                </p>
              </div>
            </div>

            <div class="border-t border-black/10 pt-5">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
                  {{ t('api.previewListTitle') }}
                </p>
                <span class="text-xs uppercase tracking-[0.18em] text-black/35">
                  {{ deliveryPreview?.total || 0 }} {{ t('common.total') }}
                </span>
              </div>

              <div v-if="deliveryPreview?.items.length" class="data-grid mt-4">
                <NuxtLink
                  v-for="item in deliveryPreview.items.slice(0, 6)"
                  :key="item.id"
                  :to="`/entries/${item.id}`"
                  class="grid gap-3 px-1 py-4 md:grid-cols-[minmax(0,1fr)_140px_170px]"
                >
                  <div>
                    <p class="font-medium">{{ item.title }}</p>
                    <p class="mt-1 text-sm text-black/55">{{ item.slug }}</p>
                  </div>
                  <div>
                    <span class="pill" :data-tone="item.status === 'published' ? 'success' : 'warning'">
                      {{ t(`status.${item.status}`) }}
                    </span>
                  </div>
                  <div class="text-sm text-black/58 md:text-right">
                    {{ formatDateTime(item.updatedAt) }}
                  </div>
                </NuxtLink>
              </div>

              <EmptyState
                v-else-if="!deliveryPending && !deliveryErrorMessage"
                :title="t('api.previewNoEntriesTitle')"
                :message="t('api.previewNoEntriesMessage')"
              />

              <div v-if="deliveryPending" class="mt-4 text-sm text-black/50">
                {{ t('api.previewLoading') }}
              </div>

              <div
                v-if="deliveryErrorMessage"
                class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {{ deliveryErrorMessage }}
              </div>
            </div>
          </div>

          <EmptyState
            v-else
            :title="t('api.previewNoModelsTitle')"
            :message="t('api.previewNoModelsMessage')"
          />
        </article>

        <article class="soft-panel px-5 py-5">
          <div class="border-b border-black/10 pb-4">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
              {{ t('api.tokenManagement') }}
            </p>
            <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
              {{ t('api.tokenTitle') }}
            </h2>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('api.tokenName') }}</span>
              <input v-model="tokenForm.name" class="form-input" placeholder="Frontend preview">
            </label>
            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('api.kind') }}</span>
              <select v-model="tokenForm.type" class="form-select">
                <option v-for="option in tokenKindOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
            <div class="flex items-end">
              <button class="action-button" data-variant="solid" type="button" @click="createToken">
                <Icon name="lucide:plus" size="16" />
                {{ t('common.generate') }}
              </button>
            </div>
          </div>

          <div v-if="data?.tokens.length" class="data-grid mt-6">
            <div
              v-for="token in data.tokens"
              :key="token.id"
              class="grid gap-3 px-1 py-4 md:grid-cols-[minmax(0,1fr)_150px_220px_120px]"
            >
              <div>
                <p class="font-medium">{{ token.name }}</p>
                <p class="mt-1 font-mono text-xs text-black/55">{{ token.token }}</p>
              </div>
              <div>
                <span class="pill" :data-tone="token.status === 'active' ? 'success' : 'warning'">
                  {{ t(`token.${token.type}`) }}
                </span>
              </div>
              <div class="text-sm text-black/58">
                {{ formatDateTime(token.createdAt) }}
              </div>
              <div class="flex items-center justify-between gap-3 md:justify-end">
                <span class="text-xs uppercase tracking-[0.18em] text-black/35">{{ t(`status.${token.status}`) }}</span>
                <button class="text-sm font-medium text-red-700" type="button" @click="invalidateToken(token)">
                  {{ t('common.invalidate') }}
                </button>
              </div>
            </div>
          </div>

          <EmptyState
            v-else
            :title="t('api.noTokensTitle')"
            :message="t('api.noTokensMessage')"
          />
        </article>

        <article class="soft-panel px-5 py-5">
          <div class="border-b border-black/10 pb-4">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
              {{ t('webhook.eyebrow') }}
            </p>
            <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
              {{ t('webhook.title') }}
            </h2>
          </div>

          <div class="mt-5 space-y-4">
            <label class="block space-y-2 text-sm">
              <span class="font-medium">{{ t('webhook.name') }}</span>
              <input v-model="webhookForm.name" class="form-input" placeholder="Preview publish hook">
            </label>
            <label class="block space-y-2 text-sm">
              <span class="font-medium">{{ t('webhook.url') }}</span>
              <input v-model="webhookForm.url" class="form-input" type="url">
            </label>
            <div class="space-y-2 text-sm">
              <span class="font-medium">{{ t('webhook.events') }}</span>
              <div class="grid gap-2 md:grid-cols-2">
                <button
                  v-for="option in webhookEventOptions"
                  :key="option.value"
                  class="flex items-center justify-between border px-4 py-3 text-left transition"
                  :class="webhookForm.events.includes(option.value) ? 'border-black bg-black text-white' : 'border-black/10 bg-white hover:border-black/35'"
                  type="button"
                  @click="toggleWebhookEvent(option.value)"
                >
                  <span>{{ option.label }}</span>
                  <Icon :name="webhookForm.events.includes(option.value) ? 'lucide:check' : 'lucide:plus'" size="16" />
                </button>
              </div>
            </div>
            <button class="action-button" data-variant="solid" type="button" @click="createWebhook">
              <Icon name="lucide:webhook" size="16" />
              {{ t('webhook.create') }}
            </button>
          </div>

          <div v-if="data?.webhooks.length" class="data-grid mt-6">
            <div
              v-for="webhook in data.webhooks"
              :key="webhook.id"
              class="grid gap-3 px-1 py-4 md:grid-cols-[minmax(0,1fr)_160px_180px_150px]"
            >
              <div>
                <p class="font-medium">{{ webhook.name }}</p>
                <p class="mt-1 text-sm text-black/55">{{ webhook.url }}</p>
                <p class="mt-2 text-xs uppercase tracking-[0.18em] text-black/38">
                  {{ webhook.events.join(' · ') }}
                </p>
              </div>
              <div>
                <span class="pill" :data-tone="webhook.status === 'active' ? 'success' : 'warning'">
                  {{ t(`webhook.status.${webhook.status}`) }}
                </span>
              </div>
              <div class="text-sm text-black/58">
                {{ webhook.lastDeliveredAt ? formatDateTime(webhook.lastDeliveredAt) : t('webhook.neverDelivered') }}
              </div>
              <div class="flex items-center justify-between gap-3 md:justify-end">
                <button class="text-sm font-medium text-black" type="button" @click="testWebhook(webhook)">
                  {{ t('webhook.test') }}
                </button>
                <button class="text-sm font-medium text-red-700" type="button" @click="deleteWebhook(webhook)">
                  {{ t('common.delete') }}
                </button>
              </div>
            </div>
          </div>

          <EmptyState
            v-else
            :title="t('webhook.noHooksTitle')"
            :message="t('webhook.noHooksMessage')"
          />
        </article>
      </section>

      <aside class="space-y-6">
        <article class="hard-panel px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('api.baseUrl') }}
          </p>
          <p class="mt-3 font-mono text-sm">http://localhost:3000/api/v1</p>
          <p class="mt-3 text-sm leading-6 text-black/58">
            {{ t('api.activeProject', { name: activeProject?.name || '-' }) }}
          </p>
        </article>

        <article class="hard-panel px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('api.endpoints') }}
          </p>
          <div class="data-grid mt-4">
            <div v-for="endpoint in endpointExamples" :key="endpoint" class="px-1 py-3 font-mono text-xs text-black/70">
              {{ endpoint }}
            </div>
          </div>
        </article>

        <article class="hard-panel px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('api.previewResponseTitle') }}
          </p>
          <pre class="mt-4 overflow-x-auto border border-black/10 bg-white p-4 text-xs leading-6 text-black/68">{{ deliveryResponseSample }}</pre>
        </article>
      </aside>
    </div>
  </div>
</template>
