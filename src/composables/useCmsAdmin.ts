import { createAdminRepository } from '~/repositories/adminRepository'
import { contentRepository } from '~/repositories/contentRepository'
import { fieldTypeOptions } from '~/utils/content'

export function useCmsAdmin() {
  const { t } = useLocale()
  const projectId = useCookie<string | null>('conteful-project-id', {
    sameSite: 'lax',
  })
  const adminRepository = createAdminRepository(() => projectId.value)

  return {
    adminRepository,
    contentRepository,
    fieldTypeOptions: fieldTypeOptions.map(option => ({
      ...option,
      label: t(`fieldType.${option.value}`),
    })),
    entryStatusOptions: [
      { label: t('status.draft'), value: 'draft' },
      { label: t('status.published'), value: 'published' },
    ],
    modelStatusOptions: [
      { label: t('status.active'), value: 'active' },
      { label: t('status.draft'), value: 'draft' },
    ],
    tokenKindOptions: [
      { label: t('token.delivery'), value: 'delivery' },
      { label: t('token.management'), value: 'management' },
    ],
  }
}
