<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()
const { session, activeProject, availableProjects, pendingInvites, switchProject, logout } = useWorkspaceSession()
const switchingProject = ref(false)

const items = computed(() => [
  { label: t('nav.dashboard'), to: '/', icon: 'lucide:layout-dashboard' },
  { label: t('nav.projects'), to: '/projects', icon: 'lucide:folder-kanban' },
  { label: t('nav.models'), to: '/models', icon: 'lucide:blocks' },
  { label: t('nav.entries'), to: '/entries', icon: 'lucide:file-pen-line' },
  { label: t('nav.media'), to: '/media', icon: 'lucide:image' },
  { label: t('nav.api'), to: '/api-settings', icon: 'lucide:webhook' },
])

function isActive(path: string) {
  if (path === '/') {
    return route.path === path
  }

  return route.path.startsWith(path)
}

async function handleProjectChange(event: Event) {
  const nextProjectId = (event.target as HTMLSelectElement).value
  if (!nextProjectId || nextProjectId === activeProject.value?.id || switchingProject.value) {
    return
  }

  switchingProject.value = true

  try {
    await switchProject(nextProjectId)
  } finally {
    switchingProject.value = false
  }
}
</script>

<template>
  <aside class="hard-panel sidebar-scroll flex flex-col border-b border-black/10 bg-white/90 lg:fixed lg:inset-y-0 lg:left-0 lg:w-[320px] lg:border-r lg:border-b-0 lg:shadow-none">
    <div class="border-b border-black/15 px-5 py-5 md:px-6 md:py-6">
      <div class="flex items-center justify-between gap-4">
        <p class="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-black/45">
          Conteful
        </p>
        <span v-if="pendingInvites.length" class="pill" data-tone="warning">
          {{ pendingInvites.length }} {{ t('sidebar.pendingInvites') }}
        </span>
      </div>
      <div class="mt-4 space-y-2">
        <p class="text-xs uppercase tracking-[0.22em] text-black/38">
          {{ t('sidebar.currentProject') }}
        </p>
        <h1 class="text-2xl font-semibold tracking-[-0.04em]">
          {{ activeProject?.name || t('sidebar.noProject') }}
        </h1>
        <p class="max-w-xs text-sm leading-6 text-black/55">
          {{ activeProject?.description || t('sidebar.projectDescriptionFallback') }}
        </p>
      </div>
      <label class="mt-5 block space-y-2 text-sm">
        <span class="font-medium">{{ t('sidebar.switchProject') }}</span>
        <select
          class="form-select"
          :value="activeProject?.id"
          :disabled="switchingProject || availableProjects.length <= 1"
          @change="handleProjectChange"
        >
          <option v-for="project in availableProjects" :key="project.id" :value="project.id">
            {{ project.name }}
          </option>
        </select>
      </label>
    </div>

    <nav class="sidebar-scroll flex-1 min-h-0 overflow-y-auto px-3 py-4">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="grid-stagger mb-2 flex items-center justify-between border px-4 py-3 transition"
        :class="isActive(item.to) ? 'border-black bg-black text-white' : 'border-black/10 bg-white text-black hover:border-black/35'"
      >
        <span class="flex items-center gap-3 font-medium">
          <Icon :name="item.icon" size="18" />
          {{ item.label }}
        </span>
        <Icon name="lucide:chevron-right" size="16" :class="isActive(item.to) ? 'opacity-70' : 'opacity-35'" />
      </NuxtLink>
    </nav>

    <div class="border-t border-black/10 px-5 py-5 md:px-6">
      <div class="rounded-2xl border border-black/10 bg-black/[0.025] px-4 py-4">
        <p class="text-xs uppercase tracking-[0.2em] text-black/40">
          {{ t('sidebar.signedInAs') }}
        </p>
        <p class="mt-2 font-medium">
          {{ session?.user.name || t('sidebar.guestName') }}
        </p>
        <p class="mt-1 text-sm text-black/58">
          {{ session?.user.email || t('sidebar.guestEmail') }}
        </p>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <NuxtLink class="action-button px-3 py-2 text-sm" to="/projects">
          <Icon name="lucide:users" size="16" />
          {{ t('sidebar.manageProjects') }}
        </NuxtLink>
        <NuxtLink
          class="action-button px-3 py-2 text-sm"
          to="/support"
          :data-variant="route.path === '/support' ? 'solid' : undefined"
        >
          <Icon name="lucide:life-buoy" size="16" />
          {{ t('sidebar.contactSupport') }}
        </NuxtLink>
        <button class="action-button px-3 py-2 text-sm" type="button" @click="logout">
          <Icon name="lucide:log-out" size="16" />
          {{ t('auth.logout') }}
        </button>
      </div>

      <p class="mt-5 text-xs uppercase tracking-[0.2em] text-black/40">
        {{ t('sidebar.postureTitle') }}
      </p>
      <p class="mt-2 text-sm leading-6 text-black/58">
        {{ t('sidebar.postureBody') }}
      </p>
    </div>
  </aside>
</template>
