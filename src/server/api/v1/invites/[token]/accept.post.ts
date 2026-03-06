import { defineEventHandler, getRouterParam, setCookie } from 'h3'
import { getRequestScope } from '../../../_utils/request-context'
import { toMutationResponse } from '../../../../utils/api-response'
import { acceptInvite } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const token = getRouterParam(event, 'token') || ''
  const item = acceptInvite(token, getRequestScope(event))

  if (item.activeProjectId) {
    setCookie(event, 'conteful-project-id', item.activeProjectId, {
      sameSite: 'lax',
      path: '/',
    })
  }

  return toMutationResponse(item, 'Invite accepted.')
})
