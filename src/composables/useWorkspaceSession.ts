import type { AuthSession } from '~/types'
import type { Ref } from 'vue'
import { createAdminRepository } from '~/repositories/adminRepository'

function normalizeSessionCookie(
  session: AuthSession | null,
  sessionIdCookie: Ref<string | null>,
  projectIdCookie: Ref<string | null>,
) {
  sessionIdCookie.value = session?.sessionId || null
  projectIdCookie.value = session?.activeProject?.id || null
}

export function useWorkspaceSession() {
  const session = useState<AuthSession | null>('conteful-session', () => null)
  const ready = useState('conteful-session-ready', () => false)
  const sessionIdCookie = useCookie<string | null>('conteful-session-id', {
    sameSite: 'lax',
  })
  const projectIdCookie = useCookie<string | null>('conteful-project-id', {
    sameSite: 'lax',
  })
  const adminRepository = createAdminRepository(() => projectIdCookie.value)
  const { run } = useReloadOverlay()

  const activeProject = computed(() => session.value?.activeProject || null)
  const availableProjects = computed(() => session.value?.projects || [])
  const pendingInvites = computed(() => session.value?.pendingInvites || [])
  const isAuthenticated = computed(() => Boolean(session.value?.sessionId))

  async function refreshSession() {
    try {
      const response = await adminRepository.getSession()
      session.value = response.item
      normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie)
      return response.item
    } catch {
      session.value = null
      normalizeSessionCookie(null, sessionIdCookie, projectIdCookie)
      return null
    } finally {
      ready.value = true
    }
  }

  async function bootstrapSession() {
    if (ready.value) {
      return session.value
    }

    return refreshSession()
  }

  async function login(email: string, password: string) {
    const response = await run(() => adminRepository.login({ email, password }))
    session.value = response.item
    ready.value = true
    normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie)
    await clearNuxtData()
    return response.item
  }

  async function logout() {
    await run(() => adminRepository.logout())
    session.value = null
    ready.value = true
    normalizeSessionCookie(null, sessionIdCookie, projectIdCookie)
    clearNuxtData()
    await navigateTo('/login')
  }

  async function switchProject(projectId: string) {
    const response = await run(() => adminRepository.switchProject(projectId))
    session.value = response.item
    ready.value = true
    normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie)
    clearNuxtData()
    await refreshNuxtData()
    await navigateTo('/', { replace: true })
    return response.item
  }

  async function acceptInvite(token: string) {
    const response = await run(() => adminRepository.acceptInvite(token))
    session.value = response.item
    ready.value = true
    normalizeSessionCookie(response.item, sessionIdCookie, projectIdCookie)
    clearNuxtData()
    await refreshNuxtData()
    return response.item
  }

  return {
    session,
    ready,
    activeProject,
    availableProjects,
    pendingInvites,
    isAuthenticated,
    bootstrapSession,
    refreshSession,
    login,
    logout,
    switchProject,
    acceptInvite,
  }
}
