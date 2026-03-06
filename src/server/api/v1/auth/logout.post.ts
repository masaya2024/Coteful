import { defineEventHandler, deleteCookie } from 'h3'
import { getRequestScope } from '../../_utils/request-context'
import { toMutationResponse } from '../../../utils/api-response'
import { logout } from '../../../utils/content-store'

export default defineEventHandler((event) => {
  const item = logout(getRequestScope(event))
  deleteCookie(event, 'conteful-session-id', { path: '/' })
  deleteCookie(event, 'conteful-project-id', { path: '/' })

  return toMutationResponse(item, 'Logged out.')
})
