<script setup lang="ts">
import type { ProjectInvite, ProjectRole } from '~/types'
import { formatDateTime, toSlug } from '~/utils/format'

const { t } = useLocale()
const { adminRepository } = useCmsAdmin()
const {
  activeProject,
  pendingInvites,
  availableProjects,
  refreshSession,
  switchProject,
  acceptInvite,
} = useWorkspaceSession()

const projectForm = reactive({
  name: '',
  slug: '',
  description: '',
})

const inviteForm = reactive<{
  email: string
  role: ProjectRole
}>({
  email: '',
  role: 'editor',
})

const roleOptions: Array<{ label: string, value: ProjectRole }> = [
  { label: t('project.role.owner'), value: 'owner' },
  { label: t('project.role.admin'), value: 'admin' },
  { label: t('project.role.editor'), value: 'editor' },
  { label: t('project.role.viewer'), value: 'viewer' },
]

const { data, refresh, pending } = await useAsyncData('projects-page', async () => {
  const [projects, invites] = await Promise.all([
    adminRepository.listProjects(),
    adminRepository.listInvites(),
  ])

  return {
    projects: projects.items,
    invites: invites.items,
  }
})

watch(() => projectForm.name, (value) => {
  if (!projectForm.slug.trim()) {
    projectForm.slug = toSlug(value)
  }
})

async function createProject() {
  if (!projectForm.name.trim()) {
    return
  }

  await adminRepository.createProject({
    name: projectForm.name,
    slug: projectForm.slug,
    description: projectForm.description,
  })

  projectForm.name = ''
  projectForm.slug = ''
  projectForm.description = ''
  await refreshSession()
  await refresh()
}

async function inviteMember() {
  if (!inviteForm.email.trim()) {
    return
  }

  await adminRepository.createInvite({
    email: inviteForm.email,
    role: inviteForm.role,
  })

  inviteForm.email = ''
  inviteForm.role = 'editor'
  await refresh()
}

async function revokeInvite(invite: ProjectInvite) {
  if (process.client && !window.confirm(t('confirm.revokeInvite', { email: invite.email }))) {
    return
  }

  await adminRepository.revokeInvite(invite.id)
  await refresh()
}

async function activateProject(projectId: string) {
  await switchProject(projectId)
  await refresh()
}

async function joinInvite(invite: ProjectInvite) {
  await acceptInvite(invite.token)
  await refresh()
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading
      :eyebrow="t('project.eyebrow')"
      :title="t('project.title')"
      :description="t('project.description')"
    />

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
      <section class="space-y-6">
        <article class="soft-panel px-5 py-5">
          <div class="border-b border-black/10 pb-4">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
              {{ t('project.currentEyebrow') }}
            </p>
            <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
              {{ activeProject?.name || t('project.none') }}
            </h2>
            <p class="mt-2 text-sm leading-6 text-black/58">
              {{ activeProject?.description || t('project.currentDescriptionFallback') }}
            </p>
          </div>

          <div class="mt-6 grid gap-3">
            <button
              v-for="project in data?.projects || availableProjects"
              :key="project.id"
              class="flex items-center justify-between gap-4 border px-4 py-4 text-left transition"
              :class="project.id === activeProject?.id ? 'border-black bg-black text-white' : 'border-black/10 bg-white hover:border-black/35'"
              type="button"
              @click="activateProject(project.id)"
            >
              <div>
                <p class="font-medium">
                  {{ project.name }}
                </p>
                <p class="mt-1 text-sm" :class="project.id === activeProject?.id ? 'text-white/72' : 'text-black/55'">
                  {{ project.description || project.slug }}
                </p>
              </div>
              <span class="pill" :data-tone="project.id === activeProject?.id ? 'success' : undefined">
                {{ project.id === activeProject?.id ? t('project.active') : t('project.switch') }}
              </span>
            </button>
          </div>
        </article>

        <article class="soft-panel px-5 py-5">
          <div class="border-b border-black/10 pb-4">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
              {{ t('project.invitesEyebrow') }}
            </p>
            <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
              {{ t('project.invitesTitle') }}
            </h2>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('project.inviteEmail') }}</span>
              <input v-model="inviteForm.email" class="form-input" type="email" placeholder="teammate@company.com">
            </label>
            <label class="space-y-2 text-sm">
              <span class="font-medium">{{ t('project.inviteRole') }}</span>
              <select v-model="inviteForm.role" class="form-select">
                <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>
            <div class="flex items-end">
              <button class="action-button" data-variant="solid" type="button" @click="inviteMember">
                <Icon name="lucide:user-plus" size="16" />
                {{ t('project.inviteAction') }}
              </button>
            </div>
          </div>

          <div v-if="data?.invites.length" class="data-grid mt-6">
            <div
              v-for="invite in data.invites"
              :key="invite.id"
              class="grid gap-3 px-1 py-4 md:grid-cols-[minmax(0,1fr)_120px_180px_120px]"
            >
              <div>
                <p class="font-medium">{{ invite.email }}</p>
                <p class="mt-1 text-sm text-black/55">
                  {{ formatDateTime(invite.createdAt) }}
                </p>
              </div>
              <div>
                <span class="pill">
                  {{ t(`project.role.${invite.role}`) }}
                </span>
              </div>
              <div class="text-sm text-black/58">
                {{ t(`project.inviteStatus.${invite.status}`) }}
              </div>
              <div class="flex items-center justify-between gap-3 md:justify-end">
                <button class="text-sm font-medium text-red-700" type="button" @click="revokeInvite(invite)">
                  {{ t('project.revokeInvite') }}
                </button>
              </div>
            </div>
          </div>

          <EmptyState
            v-else
            :title="t('project.noInvitesTitle')"
            :message="t('project.noInvitesMessage')"
          />
        </article>
      </section>

      <aside class="space-y-6">
        <article class="hard-panel px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('project.createEyebrow') }}
          </p>
          <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
            {{ t('project.createTitle') }}
          </h2>
          <div class="mt-5 space-y-4">
            <label class="block space-y-2 text-sm">
              <span class="font-medium">{{ t('project.name') }}</span>
              <input v-model="projectForm.name" class="form-input" type="text">
            </label>
            <label class="block space-y-2 text-sm">
              <span class="font-medium">{{ t('project.slug') }}</span>
              <input v-model="projectForm.slug" class="form-input" type="text">
            </label>
            <label class="block space-y-2 text-sm">
              <span class="font-medium">{{ t('project.descriptionLabel') }}</span>
              <textarea v-model="projectForm.description" class="form-textarea" />
            </label>
            <button class="action-button w-full" data-variant="solid" type="button" @click="createProject">
              <Icon name="lucide:folder-plus" size="16" />
              {{ t('project.createAction') }}
            </button>
          </div>
        </article>

        <article class="hard-panel px-5 py-5">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">
            {{ t('project.pendingEyebrow') }}
          </p>
          <h2 class="mt-2 text-xl font-semibold tracking-[-0.04em]">
            {{ t('project.pendingTitle') }}
          </h2>
          <div v-if="pendingInvites.length" class="mt-4 space-y-3">
            <div
              v-for="invite in pendingInvites"
              :key="invite.id"
              class="border border-black/10 bg-white px-4 py-4"
            >
              <p class="font-medium">
                {{ (invite as ProjectInvite & { projectName?: string }).projectName || t('project.invitedWorkspace') }}
              </p>
              <p class="mt-2 text-sm leading-6 text-black/58">
                {{ invite.email }}
              </p>
              <div class="mt-4">
                <button class="action-button px-3 py-2 text-sm" data-variant="solid" type="button" @click="joinInvite(invite)">
                  <Icon name="lucide:check" size="16" />
                  {{ t('project.acceptInvite') }}
                </button>
              </div>
            </div>
          </div>
          <EmptyState
            v-else
            :title="t('project.noPendingTitle')"
            :message="t('project.noPendingMessage')"
          />
        </article>

        <div v-if="pending" class="text-sm text-black/50">
          {{ t('project.loading') }}
        </div>
      </aside>
    </div>
  </div>
</template>
