<script setup lang="ts">
import { formatBytes, formatDateTime } from '~/utils/format'

const { adminRepository } = useCmsAdmin()
const { t } = useLocale()
const { activeProject } = useWorkspaceSession()
const { run } = useReloadOverlay()

const { data, pending, refresh } = await useAsyncData('dashboard', () => adminRepository.getDashboard())

const metrics = computed(() => [
  {
    label: t('dashboard.metricModels'),
    value: data.value?.counts.models ?? 0,
    caption: t('dashboard.metricModelsCaption'),
  },
  {
    label: t('dashboard.metricEntries'),
    value: data.value?.counts.entries ?? 0,
    caption: t('dashboard.metricEntriesCaption'),
  },
  {
    label: t('dashboard.metricMedia'),
    value: data.value?.counts.media ?? 0,
    caption: t('dashboard.metricMediaCaption'),
  },
])

const quickLinks = computed(() => [
  {
    label: t('dashboard.quickActionModel'),
    to: '/models/new',
    note: t('dashboard.quickActionModelNote'),
  },
  {
    label: t('dashboard.quickActionEntry'),
    to: '/entries/new',
    note: t('dashboard.quickActionEntryNote'),
  },
  {
    label: t('dashboard.quickActionMedia'),
    to: '/media/new',
    note: t('dashboard.quickActionMediaNote'),
  },
])

async function refreshDashboard() {
  await run(() => refresh())
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('dashboard.eyebrow')"
      :title="t('dashboard.title')"
      :description="activeProject?.name ? `${t('dashboard.description')} (${activeProject.name})` : t('dashboard.description')"
    >
      <template #actions>
        <button class="action-button" type="button" @click="refreshDashboard()">
          <Icon name="lucide:arrow-up-right" size="16" />
          {{ t('common.refreshSnapshot') }}
        </button>
      </template>
    </PageHeading>

    <MetricStrip :items="metrics" />

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
      <section class="space-y-6">
        <article class="soft-panel px-5 py-5">
          <div class="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
                {{ t('dashboard.recentModelsEyebrow') }}
              </p>
              <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
                {{ t('dashboard.recentModelsTitle') }}
              </h2>
            </div>
            <NuxtLink class="action-button px-3 py-2 text-sm" to="/models">
              {{ t('actions.openModels') }}
            </NuxtLink>
          </div>

          <div v-if="data?.recentModels.length" class="data-grid mt-4">
            <NuxtLink
              v-for="model in data.recentModels"
              :key="model.id"
              :to="`/models/${model.id}`"
              class="grid gap-2 px-1 py-4 md:grid-cols-[minmax(0,1fr)_160px_120px]"
            >
              <div>
                <p class="font-medium">{{ model.name }}</p>
                <p class="mt-1 text-sm text-black/55">{{ model.description }}</p>
              </div>
              <div class="text-sm text-black/55">
                <p class="font-medium text-black">{{ model.apiId }}</p>
                <p>{{ model.fields.length }} {{ t('common.fields') }}</p>
              </div>
              <div class="text-sm text-black/55 md:text-right">
                <span class="pill" :data-tone="model.status === 'active' ? 'success' : 'warning'">
                  {{ t(`status.${model.status}`) }}
                </span>
                <p class="mt-2">{{ formatDateTime(model.updatedAt) }}</p>
              </div>
            </NuxtLink>
          </div>

          <EmptyState
            v-else
            :title="t('dashboard.noModelsTitle')"
            :message="t('dashboard.noModelsMessage')"
          />
        </article>

        <article class="soft-panel px-5 py-5">
          <div class="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
                {{ t('dashboard.recentEntriesEyebrow') }}
              </p>
              <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
                {{ t('dashboard.recentEntriesTitle') }}
              </h2>
            </div>
            <NuxtLink class="action-button px-3 py-2 text-sm" to="/entries">
              {{ t('actions.openEntries') }}
            </NuxtLink>
          </div>

          <div v-if="data?.recentEntries.length" class="data-grid mt-4">
            <NuxtLink
              v-for="entry in data.recentEntries"
              :key="entry.id"
              :to="`/entries/${entry.id}`"
              class="grid gap-2 px-1 py-4 md:grid-cols-[minmax(0,1fr)_120px_160px]"
            >
              <div>
                <p class="font-medium">{{ entry.title }}</p>
                <p class="mt-1 text-sm text-black/55">{{ entry.slug }}</p>
              </div>
              <div>
                <span class="pill" :data-tone="entry.status === 'published' ? 'success' : 'warning'">
                  {{ t(`status.${entry.status}`) }}
                </span>
              </div>
              <div class="text-sm text-black/55 md:text-right">
                {{ formatDateTime(entry.updatedAt) }}
              </div>
            </NuxtLink>
          </div>

          <EmptyState
            v-else
            :title="t('dashboard.noEntriesTitle')"
            :message="t('dashboard.noEntriesMessage')"
          />
        </article>
      </section>

      <aside class="space-y-6">
        <article class="hard-panel px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('dashboard.quickActions') }}
          </p>
          <div class="mt-4 space-y-3">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="block border border-black/12 bg-white px-4 py-4 transition hover:border-black/35"
            >
              <p class="font-medium">{{ link.label }}</p>
              <p class="mt-2 text-sm leading-6 text-black/55">{{ link.note }}</p>
            </NuxtLink>
          </div>
        </article>

        <article class="hard-panel px-5 py-5">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
              {{ t('dashboard.latestMediaEyebrow') }}
            </p>
            <NuxtLink to="/media" class="text-sm font-medium underline decoration-black/20 underline-offset-4">
              {{ t('actions.viewAll') }}
            </NuxtLink>
          </div>

          <div v-if="data?.recentMedia.length" class="data-grid mt-4">
            <NuxtLink
              v-for="item in data.recentMedia"
              :key="item.id"
              :to="`/media/${item.id}`"
              class="grid gap-2 px-1 py-4"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="font-medium">{{ item.fileName }}</p>
                  <p class="mt-1 text-sm text-black/55">{{ item.mimeType }} · {{ formatBytes(item.size) }}</p>
                </div>
                <span class="pill">{{ item.tags?.[0] || t('nav.media') }}</span>
              </div>
            </NuxtLink>
          </div>

          <EmptyState
            v-else
            :title="t('dashboard.noMediaTitle')"
            :message="t('dashboard.noMediaMessage')"
          />
        </article>
      </aside>
    </div>

    <div v-if="pending" class="text-sm text-black/50">
      {{ t('common.loadingDashboard') }}
    </div>
  </div>
</template>
