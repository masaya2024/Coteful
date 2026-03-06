import { defineEventHandler, getRouterParam, setCookie } from 'h3'
import { getRequestScope } from '../../../../../api/_utils/request-context'
import { toMutationResponse } from '../../../../../utils/api-response'
import { switchProject } from '../../../../../utils/content-store'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id') || ''
  const item = switchProject(id, getRequestScope(event))

  if (item.activeProjectId) {
    setCookie(event, 'conteful-project-id', item.activeProjectId, {
      sameSite: 'lax',
      path: '/',
    })
  }

  return toMutationResponse(item, 'Project switched.')
})
