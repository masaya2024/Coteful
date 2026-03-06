import { createAdminRepository } from '~/repositories/adminRepository'
import { contentRepository } from '~/repositories/contentRepository'

export function useAdminRepository() {
  const projectId = useCookie<string | null>('conteful-project-id', {
    sameSite: 'lax',
  })
  const adminRepository = createAdminRepository(() => projectId.value)

  return {
    adminRepository,
    contentRepository,
  }
}
