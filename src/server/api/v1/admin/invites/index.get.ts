import { defineEventHandler, getQuery } from 'h3'
import type { ProjectInviteStatus } from '../../../../../types'
import { getRequestScope } from '../../../../api/_utils/request-context'
import { toListResponse } from '../../../../utils/api-response'
import { listInvites } from '../../../../utils/content-store'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const status = typeof query.status === 'string' ? (query.status as ProjectInviteStatus) : undefined
  const email = typeof query.email === 'string' ? query.email : undefined
  const projectId = typeof query.projectId === 'string' ? query.projectId : undefined
  const scope = getRequestScope(event)

  return toListResponse(listInvites({ status, email, projectId }, scope), {
    status,
    email,
    projectId: projectId || scope.projectId,
  })
})
